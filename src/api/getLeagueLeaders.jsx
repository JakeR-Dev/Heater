import { buildSeasonYears } from "../helpers/buildSeasonYears";

// get the current stats for league-wide leaders
export async function getLeagueLeaders(category) {
  // build the season years (ex: 20252026)
  const seasonSegment = buildSeasonYears();

  // build the url params
  const params = new URLSearchParams({ limit: '20' });
  if (category) {
    params.set('categories', category);
  }

  // return specific categories, limit to 20 players
  const url = `/nhl-api/v1/skater-stats-leaders/${seasonSegment}/2?${params.toString()}`;
  const response = await fetch(url, { method: 'GET' });

  if (!response.ok) {
    throw new Error(`Request failed: ${response.status}`);
  }

  try {
    const data = await response.json();

    // leaders payload is keyed by category name, e.g. { points: [...] }
    if (category && Array.isArray(data?.[category])) {
      return data[category];
    }

    return data ?? [];
  } catch (error) {
    console.error('getLeagueLeaders fetch error:', error);
    return [];
  }
}