import Medusa from '@medusajs/js-sdk';

export const backendUrl = __BACKEND_URL__ ?? '/';
export const publishableApiKey =
  __PUBLISHABLE_API_KEY__ ?? '';

const token =
  window.localStorage.getItem('medusa_auth_token') || '';

export const sdk = new Medusa({
  baseUrl: backendUrl,
  publishableKey: publishableApiKey,
});

// useful when you want to call the BE from the console and try things out quickly
if (typeof window !== 'undefined') {
  (window as any).__sdk = sdk;
}

export const fetchQuery = async (
  url: string,
  {
    method,
    body,
    query,
  }: {
    method: 'GET' | 'POST';
    body?: object;
    query?: { [key: string]: string | number };
  }
) => {
  const params = Object.entries(query || {}).reduce(
    (acc, [key, value], index) => {
      if (value && value !== undefined) {
        const queryLength = Object.values(
          query || {}
        ).filter((i) => i && i !== undefined).length;
        acc += `${key}=${value}${index + 1 < queryLength ? '&' : ''}`;
      }
      return acc;
    },
    ''
  );
  return await fetch(
    `${backendUrl}${url}${params && `?${params}`}`,
    {
      method: method,
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
        'x-publishable-api-key': publishableApiKey,
      },
      body: body ? JSON.stringify(body) : null,
    }
  )
    .then((res) => res.json())
    .catch(() => null);
};
