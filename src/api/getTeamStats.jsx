// get the current stats for a specific team
export async function getTeamStats(clubId) {
  // build the season years (ex: 20252026)
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1;
  const seasonStartYear = month >= 7 ? year : year - 1;
  const seasonSegment = `${seasonStartYear}${seasonStartYear + 1}`;

  // gameTypeId 2 = regular season
  const url = `/nhl-api/v1/club-stats/${clubId}/${seasonSegment}/2`;
  const response = await fetch(url, { method: 'GET' });

  if (!response.ok) {
    throw new Error(`Request failed: ${response.status}`);
  }

  try {
    const data = await response.json();
    return getBestPlayers(data?.skaters);
  } catch (error) {
    console.error('getTeamStats fetch error:', error);
  }
}

export function getBestPlayers(players) {
  if (!players?.length) return [];

  // sort players by points (goals + assists) descending
  const sortedPlayers = [...players].sort((a, b) => {
    const aPoints = (a?.goals || 0) + (a?.assists || 0);
    const bPoints = (b?.goals || 0) + (b?.assists || 0);
    return bPoints - aPoints;
  });

  // console.log('sortedPlayers: ', sortedPlayers);

  // return top 3 players
  return sortedPlayers.slice(0, 3);
}