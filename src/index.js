import { HTML_PAGE } from './template.js';
import { corsHeaders, cache, jsonResponse } from './utils.js';
import { getAccountData, getAllAccountsDataOptimized } from './api.js';

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }

    // 带参数视为 API 请求，否则返回页面
    if (url.searchParams.toString() !== '') {
      return handleAPIRequest(request, env);
    }

    return new Response(HTML_PAGE, {
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        ...corsHeaders,
      },
    });
  },
};

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
