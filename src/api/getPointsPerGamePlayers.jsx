export function getPointsPerGamePlayers(players) {
  if (!players?.length) return [];

  // get top 7 players by points (goals + assists) descending
  let playersByPoints = [...players].sort((a, b) => {
    const aPoints = (a?.goals || 0) + (a?.assists || 0);
    const bPoints = (b?.goals || 0) + (b?.assists || 0);
    return bPoints - aPoints;
  });
  playersByPoints = playersByPoints.slice(0, 7);

  // out of the top 7, assign weightedPoints based on plus-minus
  // subtract or add plus-minus from total points to get weightedPoints
  playersByPoints = playersByPoints.map((player) => ({
    ...player,
    weightedPoints: player?.points + (player?.plusMinus || 0)
  }));
  
  // out of the top 7, weight the players based on gamesPlayed
  // get the weighted points per game by dividing weightedPoints by gamesPlayed
  playersByPoints = playersByPoints.map(player => ({
    ...player,
    weightedPointsPerGame: Number((player?.weightedPoints / (player?.gamesPlayed || 1)).toFixed(3))
  }));

  // sort the top players by weightedPointsPerGame
  playersByPoints = playersByPoints.sort((a, b) => b.weightedPointsPerGame - a.weightedPointsPerGame);

  // return top 3 players
  return playersByPoints.slice(0, 3);
}