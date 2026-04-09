export function getMostReliablePlayers(players) {
  if (!players?.length) return [];

  const minutesFormatter = new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  // get top 7 players by games played descending
  let playersByGamesPlayed = [...players].sort((a, b) => {
    return (b?.gamesPlayed || 0) - (a?.gamesPlayed || 0);
  });
  playersByGamesPlayed = playersByGamesPlayed.slice(0, 7);

  // multiply avg time on ice per game * number games played
  playersByGamesPlayed = playersByGamesPlayed.map((player) => {
    // convert seconds into minutes and keep as numeric value for sorting
    const totalMinutesPlayed = Number(
      ((player?.avgTimeOnIcePerGame || 0) * (player?.gamesPlayed || 0)) / 60
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