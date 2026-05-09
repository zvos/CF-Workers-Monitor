import template from './public/template.html';
import style from './public/style.css';
import clientScript from './public/client.js';

const corsHeaders = {
	'Access-Control-Allow-Origin': '*',
	'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
	'Access-Control-Allow-Headers': 'Content-Type',
};

const cache = {
	data: null,
	lastUpdated: 0,
	ttl: 1 * 60 * 1000,
};

async function fetchWithRetry(url, options = {}, maxRetries = 3, delay = 1000) {
	for (let i = 0; i < maxRetries; i++) {
		try {
			const response = await fetch(url, options);
			if (response.ok) return response;
			if (response.status >= 500) {
				throw new Error(`Server error: ${response.status}`);
			}
			return response;
		} catch (error) {
			if (i === maxRetries - 1) throw error;
			await new Promise((resolve) =>
				setTimeout(resolve, delay * (i + 1))
			);
		}
	}
}

async function handleRequest(request, env) {
	const url = new URL(request.url);

	if (request.method === 'OPTIONS') {
		return new Response(null, { headers: corsHeaders });
	}

	// API 请求
	if (url.searchParams.toString() !== '') {
		return handleAPIRequest(request, env);
	}

	// 主页：拼接 HTML
	const html = template
		.replace('{{STYLE}}', style)
		.replace('{{SCRIPT}}', clientScript);

	return new Response(html, {
		headers: {
			'Content-Type': 'text/html; charset=utf-8',
			...corsHeaders,
		},
	});
}

async function handleAPIRequest(request, env) {
	try {
		const url = new URL(request.url);
		const isOptimized = url.searchParams.get('optimized') === 'true';
		const now = Date.now();

		if (isOptimized && cache.data && now - cache.lastUpdated < cache.ttl) {
			return jsonResponse(cache.data);
		}

		let EDGE;
		try {
			EDGE = JSON.parse(env.EDGE || '[]');
		} catch (e) {
			return jsonResponse({ error: '环境变量 EDGE 格式错误' }, 500);
		}
		if (EDGE.length === 0) {
			return jsonResponse({ error: '没有配置账户信息' }, 400);
		}

		const accountIndex = parseInt(url.searchParams.get('accountIndex')) || 0;
		const getAllAccounts = url.searchParams.get('all') === 'true';

		let result;
		if (getAllAccounts) {
			result = await getAllAccountsDataOptimized(EDGE);
			if (isOptimized) {
				cache.data = result;
				cache.lastUpdated = now;
			}
		} else {
			if (accountIndex >= EDGE.length) {
				return jsonResponse({ error: '账户索引超出范围' }, 400);
			}
			result = await getAccountData(EDGE[accountIndex], accountIndex);
		}

		return jsonResponse(result);
	} catch (error) {
		console.error('Error:', error);
		return jsonResponse({ error: error.message }, 500);
	}
}

async function getAccountData(account, accountIndex) {
	const { token, accountId, total = 100000 } = account;
	if (!token || !accountId) {
		throw new Error(`账户 ${accountIndex} 缺少 token 或 accountId`);
	}

	const now = new Date();
	now.setUTCHours(0, 0, 0, 0);
	const startDate = now.toISOString();
	const endDate = new Date().toISOString();

	const { pagesSum = 0, workersSum = 0 } = await getSum(
		token,
		accountId,
		startDate,
		endDate
	);

	const remaining = total - pagesSum - workersSum;
	const percent = (remaining / total) * 100;

	return {
		accountIndex,
		accountName: account.name || `Account ${accountIndex}`,
		pagesSum,
		workersSum,
		total,
		remaining,
		percent: Math.round(percent),
		date: new Date().toISOString().split('T')[0],
		formatted: {
			pagesSum: formatNumber(pagesSum),
			workersSum: formatNumber(workersSum),
			remaining: remaining.toLocaleString(),
			total: formatNumber(total),
		},
	};
}

async function getAllAccountsDataOptimized(accounts) {
	const CONCURRENT_LIMIT = 6;
	const results = [];

	const accountPromises = accounts.map((account, index) =>
		getAccountDataWithRetry(account, index)
	);

	for (let i = 0; i < accountPromises.length; i += CONCURRENT_LIMIT) {
		const batch = accountPromises.slice(i, i + CONCURRENT_LIMIT);
		const batchResults = await Promise.allSettled(batch);

		batchResults.forEach((result, batchIndex) => {
			const accountIndex = i + batchIndex;
			if (result.status === 'fulfilled') {
				results.push(result.value);
			} else {
				results.push({
					accountIndex,
					accountName: accounts[accountIndex]?.name || `Account ${accountIndex}`,
					error: result.reason.message,
					pagesSum: 0,
					workersSum: 0,
					total: accounts[accountIndex]?.total || 100000,
					remaining: 0,
					percent: 0,
				});
			}
		});

		if (i + CONCURRENT_LIMIT < accountPromises.length) {
			await new Promise((resolve) => setTimeout(resolve, 100));
		}
	}

	const totals = results.reduce(
		(acc, curr) => {
			if (!curr.error) {
				acc.pagesSum += curr.pagesSum;
				acc.workersSum += curr.workersSum;
				acc.total += curr.total;
				acc.remaining += curr.remaining;
			}
			return acc;
		},
		{ pagesSum: 0, workersSum: 0, total: 0, remaining: 0 }
	);

	const overallPercent = totals.total > 0 ? (totals.remaining / totals.total) * 100 : 0;

	return {
		accounts: results,
		totals: {
			...totals,
			percent: Math.round(overallPercent),
			formatted: {
				pagesSum: formatNumber(totals.pagesSum),
				workersSum: formatNumber(totals.workersSum),
				remaining: totals.remaining.toLocaleString(),
				total: formatNumber(totals.total),
			},
		},
		timestamp: new Date().toISOString(),
	};
}

async function getAccountDataWithRetry(account, accountIndex, maxRetries = 2) {
	for (let attempt = 1; attempt <= maxRetries; attempt++) {
		try {
			return await getAccountData(account, accountIndex);
		} catch (error) {
			if (attempt === maxRetries) throw error;
			await new Promise((resolve) => setTimeout(resolve, 1000 * attempt));
		}
	}
}

async function getSum(token, accountId, startDate, endDate) {
	const query = {
		query: `query getBillingMetrics($accountId: string!, $filter: AccountWorkersInvocationsAdaptiveFilter_InputObject) {
      viewer {
        accounts(filter: {accountTag: $accountId}) {
          pagesFunctionsInvocationsAdaptiveGroups(limit: 1000, filter: $filter) {
            sum {
              requests
            }
          }
          workersInvocationsAdaptive(limit: 10000, filter: $filter) {
            sum {
              requests
            }
          }
        }
      }
    }`,
		variables: {
			accountId,
			filter: { datetime_geq: startDate, datetime_leq: endDate },
		},
	};

	const response = await fetchWithRetry(
		'https://api.cloudflare.com/client/v4/graphql',
		{
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify(query),
		},
		2,
		1000
	);

	if (!response.ok) {
		throw new Error(`API 请求失败: ${response.status}`);
	}

	const data = await response.json();
	if (data.errors) {
		throw new Error(`GraphQL 错误: ${JSON.stringify(data.errors)}`);
	}

	const accounts = data?.data?.viewer?.accounts;
	if (!accounts || accounts.length === 0) {
		throw new Error('未找到账户数据');
	}

	const accountData = accounts[0];
	const pagesGroups = accountData.pagesFunctionsInvocationsAdaptiveGroups || [];
	const workersData = accountData.workersInvocationsAdaptive || [];

	const pagesSum = pagesGroups.reduce((sum, group) => sum + (group?.sum?.requests || 0), 0);
	const workersSum = workersData.reduce((sum, item) => sum + (item?.sum?.requests || 0), 0);

	return { pagesSum, workersSum };
}

function formatNumber(num) {
	if (num < 1000) return num.toString();
	const suffixes = ['', 'k', 'm', 'b', 't'];
	let suffixIndex = 0;
	let formattedNum = num;
	while (formattedNum >= 1000 && suffixIndex < suffixes.length - 1) {
		formattedNum /= 1000;
		suffixIndex++;
	}
	return formattedNum.toFixed(1) + suffixes[suffixIndex];
}

function jsonResponse(data, status = 200) {
	return new Response(JSON.stringify(data, null, 2), {
		status,
		headers: {
			'Content-Type': 'application/json',
			...corsHeaders,
		},
	});
}

export default {
	async fetch(request, env, ctx) {
		return handleRequest(request, env);
	},
};
