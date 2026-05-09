export const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

export const cache = {
  data: null,
  lastUpdated: 0,
  ttl: 1 * 60 * 1000, // 1 分钟
};

export async function fetchWithRetry(url, options = {}, maxRetries = 3, delay = 1000) {
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
      await new Promise((resolve) => setTimeout(resolve, delay * (i + 1)));
    }
  }
}

export function formatNumber(num) {
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

export function jsonResponse(data, status = 200) {
  return new Response(JSON.stringify(data, null, 2), {
    status,
    headers: {
      'Content-Type': 'application/json',
      ...corsHeaders,
    },
  });
}
