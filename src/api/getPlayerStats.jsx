import { buildApiUrl } from "../helpers/buildApiUrl";

// get the current stats for a specific team
export async function getPlayerStats(playerId) {
  const url = buildApiUrl(`/v1/player/${playerId}/landing`);
  const response = await fetch(url, { method: 'GET' });

  if (!response.ok) {
    throw new Error(`Request failed: ${response.status}`);
  }

  try {
    const data = await response.json();

    // console.log('data: ', data?.featuredStats?.regularSeason?.subSeason);
    return data?.featuredStats?.regularSeason?.subSeason;
  } catch (error) {
    console.error('getTeamStats fetch error:', error);
  }
}