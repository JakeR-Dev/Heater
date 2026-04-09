import { getPointsPerGamePlayers } from "../api/getPointsPerGamePlayers";

export const MostImpactful = ({results}) => {
  if (!results) return;

  const pointsPerGamePlayers = getPointsPerGamePlayers(results);

  return (
    <div className="container text-center mt-15">
      {pointsPerGamePlayers?.length > 1 && (
        <>
          {/* points per game weighted leaderboard */}
          <h3>Most Impactful</h3>
          <h5 className="mb-5 text-silver">Points Per Game Weighted</h5>
          <div className="players grid grid-cols-2 md:grid-cols-3 gap-3 mb-6">
            {pointsPerGamePlayers.map(player => {
              const playerName = player?.firstName?.default + ' ' + player?.lastName?.default;
              const playerPosition = player?.positionCode + (player?.positionCode == 'L' || player?.positionCode == 'R' ? 'W' : '');
              return (
                <div className="player p-4 border border-white rounded" key={player?.playerId}>
                  <img src={player?.headshot} alt={playerName} width="120" height="120" className="mb-2 bg-white rounded-[50%] block ml-auto mr-auto" loading="lazy" />
                  <h4 className="mb-2">{playerName} &middot; {playerPosition}</h4>
                  <div className="player-stats grid grid-cols-2 md:grid-cols-3 gap-2 text-left">
                    <p>Total Points: <b className="block">{player?.points}</b></p>
                    <p>Assists: <b className="block">{player?.assists}</b></p>
                    <p>Goals: <b className="block">{player?.goals}</b></p>
                    <p>Plus-Minus: <b className="block">{player?.plusMinus > 0 ? '+' : ''}{player?.plusMinus}</b></p>
                    <p>Games Played: <b className="block">{player?.gamesPlayed}</b></p>
                    <p>Avg TOI: <b className="block">{Number((player?.avgTimeOnIcePerGame || 0).toFixed(2))}</b></p>
                    <hr className="text-silver col-span-full mt-2 mb-2" />
                    <p className="col-span-full">Weighted Points: <i className="block text-sm text-silver">(total points with plus-minus)</i> <b className="block">{player?.weightedPoints}</b></p>
                    <p className="col-span-full">Weighted Points Per Game: <i className="block text-sm text-silver">(weighted points divided by games played)</i> <b className="block">{player?.weightedPointsPerGame}</b></p>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  )
}