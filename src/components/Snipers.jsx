import { useEffect, useState } from "react";
import { getSniperPlayers } from "../api/getSniperPlayers";
import { getLeagueSniperPlayers } from "../api/getLeagueSniperPlayers";

export const Snipers = ({ results, showLeagueLeaders }) => {
  const [sniperPlayers, setSniperPlayers] = useState([]);

  const shootingPctgFormatter = new Intl.NumberFormat("en-US", {
    style: "percent",
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  });


  // test to see if we're showing league leaders or team stats,
  // and if league leaders, then get the stats for the league leaders
  // must be async because pulling a league leader player's stats requires an additional api call per player
  useEffect(() => {
    if (!results) {
      setSniperPlayers([]);
      return;
    }

    if (showLeagueLeaders === true) {
      getLeagueSniperPlayers(results.goals)
        .then((data) => setSniperPlayers(data ?? []))
        .catch((error) => {
          console.error('Sniper league stats fetch error:', error);
          setSniperPlayers([]);
        });
      return;
    }

    setSniperPlayers(getSniperPlayers(results));
  }, [results, showLeagueLeaders]);

  if (!results) return;

  return (
    <div className="container text-center mt-15">
      {sniperPlayers?.length > 1 && (
        <>
          {/* snipers - shooting percentage leaderboard */}
          <h3>Snipers</h3>
          <h5 className="mb-5 text-silver">Highest Shooting Percentage This Season</h5>
          <div className="players grid grid-cols-2 md:grid-cols-3 gap-3 mb-6">
            {sniperPlayers.map(player => {
              const playerId = player?.playerId ?? player?.id;
              const playerName = player?.firstName?.default + ' ' + player?.lastName?.default;
              const playerPosition = (player?.positionCode ?? player?.position) + (player?.positionCode == 'L' || player?.positionCode == 'R' ? 'W' : '');
              const playerHeadshot = player?.headshot;
              const playerPoints = player?.points;
              const playerAssists = player?.assists;
              const playerGoals = player?.goals;
              const playerPlusMinus = player?.plusMinus;
              const playerGamesPlayed = player?.gamesPlayed;
              const playerAvgTimeOnIcePerGame = player?.avgTimeOnIcePerGame;
              const playerShootingPctg = player?.shootingPctg;
              
              return (
                <div className="player p-4 border border-white rounded" key={playerId}>
                  <img src={playerHeadshot} alt={playerName} width="120" height="120" className="mb-2 bg-white rounded-[50%] block ml-auto mr-auto" loading="lazy" />
                  <h4 className="mb-2">{playerName} &middot; {playerPosition}</h4>
                  <div className="player-stats grid grid-cols-2 md:grid-cols-3 gap-2 text-left">
                    <p>Total Points: <b className="block">{playerPoints}</b></p>
                    <p>Assists: <b className="block">{playerAssists}</b></p>
                    <p>Goals: <b className="block">{playerGoals}</b></p>
                    <p>Plus-Minus: <b className="block">{playerPlusMinus > 0 ? '+' : ''}{playerPlusMinus}</b></p>
                    <p>Games Played: <b className="block">{playerGamesPlayed}</b></p>
                    { playerAvgTimeOnIcePerGame && (
                      <p>Avg TOI: <b className="block">{Number(((playerAvgTimeOnIcePerGame || 0)/60).toFixed(2))}</b></p>
                    )}
                    <hr className="text-silver col-span-full mt-2 mb-2" />
                    <p className="col-span-full">Shooting percentage: <i className="block text-sm text-silver">(must have more than 20 pts, 20 games played)</i> <b className="block">{shootingPctgFormatter.format(Number(playerShootingPctg) || 0)}</b></p>
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