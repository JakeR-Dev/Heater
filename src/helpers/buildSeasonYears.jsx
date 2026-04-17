// build the season years (ex: 20252026)
export function buildSeasonYears() {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1;
  const seasonStartYear = month >= 7 ? year : year - 1;
  const seasonSegment = `${seasonStartYear}${seasonStartYear + 1}`;

  return seasonSegment;
}