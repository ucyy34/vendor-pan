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

export const query = (
  url: string,
  params: { method: 'GET' | 'POST'; body?: any }
) => {
  return fetch(`${backendUrl}${url}`, {
    method: params.method,
    headers: {
      authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      'x-publishable-api-key': publishableApiKey,
    },
    body: params.body ? JSON.stringify(params.body) : null,
  });
};
