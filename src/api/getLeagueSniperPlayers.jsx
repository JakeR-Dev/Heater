import { getPlayerStats } from "./getPlayerStats";

export async function getLeagueSniperPlayers(players) {
  if (!players?.length) return [];

  // pull each player's detailed season stats and merge into leaderboard rows
  players = await Promise.all(
    players.map(async (player) => {
      const playerId = player?.playerId ?? player?.id;
      const playerStats = await getPlayerStats(playerId);

      return {
        ...player,
        ...(playerStats || {}),
      };
    })
  );

  // keep only players with at least 20 points, and 20 games played,
  // then rank by shooting percentage
  let snipers = [...players]
    .filter((player) => (Number(player?.points) || 0) >= 20)
    .filter((player) => (Number(player?.gamesPlayed) || 0) >= 20)
    .sort((a, b) => {
      const aPoints = Number(a?.shootingPctg) || 0;
      const bPoints = Number(b?.shootingPctg) || 0;
      return bPoints - aPoints;
    });

  // get top 3 players
  snipers = snipers.slice(0, 3);

  return snipers;
}