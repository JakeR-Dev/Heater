import { getSniperPlayers } from "../api/getSniperPlayers";

export const Snipers = ({results}) => {
  const sniperPlayers = getSniperPlayers(results);
  const shootingPctgFormatter = new Intl.NumberFormat("en-US", {
    style: "percent",
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  });

  return (
    <div className="container text-center mt-15">
      {sniperPlayers?.length ? (
        <>
          {/* snipers - shooting percentage leaderboard */}
          <h3>Snipers</h3>
          <h5 className="mb-5 text-silver">Highest Shooting Percentage This Season</h5>
          <div className="players grid grid-cols-2 md:grid-cols-3 gap-3 mb-6">
            {sniperPlayers.map(player => {
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
                    <p className="col-span-full">Shooting percentage: <i className="block text-sm text-silver">(must have more than 20 pts, 20 games played)</i> <b className="block">{shootingPctgFormatter.format(Number(player?.shootingPctg) || 0)}</b></p>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      ) : (
        <h5>Select a team to begin.</h5>
      )}
    </div>
  )
}