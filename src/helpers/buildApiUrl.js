const DEV_API_BASE = '/nhl-api';
const PROD_API_BASE = '/api';

export function buildApiUrl(path) {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  const base = import.meta.env.DEV ? DEV_API_BASE : PROD_API_BASE;
  return `${base}${normalizedPath}`;
}
