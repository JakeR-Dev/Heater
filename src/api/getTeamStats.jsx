import { buildSeasonYears } from "../helpers/buildSeasonYears";

// get the current stats for a specific team
export async function getTeamStats(clubId) {
  // build the season years (ex: 20252026)
  const seasonSegment = buildSeasonYears();

  // gameTypeId 2 = regular season
  const url = `/nhl-api/v1/club-stats/${clubId}/${seasonSegment}/2`;
  const response = await fetch(url, { method: 'GET' });

  if (!response.ok) {
    throw new Error(`Request failed: ${response.status}`);
  }

  try {
    const data = await response.json();
    return data?.skaters;
  } catch (error) {
    console.error('getTeamStats fetch error:', error);
  }
}