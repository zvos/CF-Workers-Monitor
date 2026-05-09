import { fetchWithRetry, formatNumber } from './utils.js';

export async function getSum(token, accountId, startDate, endDate) {
  const query = {
    query: `query getBillingMetrics($accountId: string!, $filter: AccountWorkersInvocationsAdaptiveFilter_InputObject) {
      viewer {
        accounts(filter: {accountTag: $accountId}) {
          pagesFunctionsInvocationsAdaptiveGroups(limit: 1000, filter: $filter) {
            sum { requests }
          }
          workersInvocationsAdaptive(limit: 10000, filter: $filter) {
            sum { requests }
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

  if (!response.ok) throw new Error(`API 请求失败: ${response.status}`);
  const data = await response.json();
  if (data.errors) throw new Error(`GraphQL 错误: ${JSON.stringify(data.errors)}`);

  const accounts = data?.data?.viewer?.accounts;
  if (!accounts || accounts.length === 0) throw new Error('未找到账户数据');

  const accountData = accounts[0];
  const pagesGroups = accountData.pagesFunctionsInvocationsAdaptiveGroups || [];
  const workersData = accountData.workersInvocationsAdaptive || [];

  const pagesSum = pagesGroups.reduce((sum, g) => sum + (g?.sum?.requests || 0), 0);
  const workersSum = workersData.reduce((sum, i) => sum + (i?.sum?.requests || 0), 0);

  return { pagesSum, workersSum };
}

export async function getAccountData(account, accountIndex) {
  const { token, accountId, total = 100000 } = account;
  if (!token || !accountId) {
    throw new Error(`账户 ${accountIndex} 缺少 token 或 accountId`);
  }
  const now = new Date();
  now.setUTCHours(0, 0, 0, 0);
  const startDate = now.toISOString();
  const endDate = new Date().toISOString();

  const { pagesSum = 0, workersSum = 0 } = await getSum(token, accountId, startDate, endDate);
  const remaining = total - pagesSum - workersSum;
  const percent = Math.round((remaining / total) * 100);

  return {
    accountIndex,
    accountName: account.name || `Account ${accountIndex}`,
    pagesSum,
    workersSum,
    total,
    remaining,
    percent,
    date: new Date().toISOString().split('T')[0],
    formatted: {
      pagesSum: formatNumber(pagesSum),
      workersSum: formatNumber(workersSum),
      remaining: remaining.toLocaleString(),
      total: formatNumber(total),
    },
  };
}

export async function getAllAccountsDataOptimized(accounts) {
  const CONCURRENT_LIMIT = 6;
  const results = [];

  const accountPromises = accounts.map((account, index) =>
    getAccountDataWithRetry(account, index, 2)
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

async function getAccountDataWithRetry(account, accountIndex, maxRetries) {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await getAccountData(account, accountIndex);
    } catch (error) {
      if (attempt === maxRetries) throw error;
      await new Promise((resolve) => setTimeout(resolve, 1000 * attempt));
    }
  }
}
