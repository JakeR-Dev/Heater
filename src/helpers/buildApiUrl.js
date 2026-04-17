const DEV_API_BASE = '/nhl-api';
const PROD_API_BASE = (import.meta.env.VITE_API_BASE_URL || 'https://api-web.nhle.com').replace(/\/$/, '');

// Use Vite proxy in dev; in production use an env-configured proxy URL when available.
export function buildApiUrl(path) {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  const base = import.meta.env.DEV ? DEV_API_BASE : PROD_API_BASE;
  return `${base}${normalizedPath}`;
}
