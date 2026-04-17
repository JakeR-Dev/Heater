import { getPlayerStats } from "./getPlayerStats";

export async function getLeagueMostReliablePlayers(players) {
  if (!players?.length) return [];

  const minutesFormatter = new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  // get top 7 players by games played descending
  let playersByAvgTOI = [...players].sort((a, b) => {
    return (b?.value || 0) - (a?.value || 0);
  });
  playersByAvgTOI = playersByAvgTOI.slice(0, 7);

  // pull each player's detailed season stats and merge into leaderboard rows
  playersByAvgTOI = await Promise.all(
    playersByAvgTOI.map(async (player) => {
      const playerId = player?.playerId ?? player?.id;
      const playerStats = await getPlayerStats(playerId);

      return {
        ...player,
        ...(playerStats || {}),
      };
    })
  );

  // multiply avg time on ice per game * number games played
  let playersByGamesPlayed = playersByAvgTOI.map((player) => {
    // convert seconds into minutes and keep as numeric value for sorting
    const totalMinutesPlayed = Number(
      ((player?.value || 0) * (player?.gamesPlayed || 0)) / 60
    );

    return {
      ...player,
      totalMinutesPlayed,
      totalMinutesPlayedDisplay: minutesFormatter.format(totalMinutesPlayed),
    };
  });

  // sort the players based on totalMinutesPlayed
  playersByGamesPlayed = playersByGamesPlayed.sort((a, b) => b.totalMinutesPlayed - a.totalMinutesPlayed);
  
  return playersByGamesPlayed.slice(0, 3);
}