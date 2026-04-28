import { useEffect, useState } from "react";
import { getPointsPerGamePlayers } from "../api/getPointsPerGamePlayers";
import { getLeaguePointsPerGamePlayers } from "../api/getLeaguePointsPerGamePlayers";

export const MostImpactful = ({ results, showLeagueLeaders }) => {
  const [pointsPerGamePlayers, setPointsPerGamePlayers] = useState([]);

  // test to see if we're showing league leaders or team stats,
  // and if league leaders, then get the stats for the league leaders
  // must be async because pulling a league leader player's stats requires an additional api call per player
  useEffect(() => {
    if (!results) {
      setPointsPerGamePlayers([]);
      return;
    }

    if (showLeagueLeaders === true) {
      getLeaguePointsPerGamePlayers(results.points)
        .then((data) => setPointsPerGamePlayers(data ?? []))
        .catch((error) => {
          console.error('MostImpactful league stats fetch error:', error);
          setPointsPerGamePlayers([]);
        });
      return;
    }

    setPointsPerGamePlayers(getPointsPerGamePlayers(results));
  }, [results, showLeagueLeaders]);

  if (!results) return;

  return (
    <div className="container text-center">
      {pointsPerGamePlayers?.length > 1 && (
        <>
          {/* points per game weighted leaderboard */}
          <h3>Most Impactful</h3>
          <h5 className="mb-5 text-silver">Points Per Game Weighted</h5>
          <div className="players grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-3 mb-6">
            {pointsPerGamePlayers.map(player => {
              const playerName = player?.firstName?.default + ' ' + player?.lastName?.default;
              const playerHeadshot = player?.headshot;
              const playerPositionCode = player?.positionCode ?? player?.position;
              const playerPosition = playerPositionCode + (playerPositionCode === 'L' || playerPositionCode === 'R' ? 'W' : '');
              const playerID = player?.playerId ?? player?.id;
              const playerPoints = player?.points ?? player?.value;
              const playerAssists = player?.assists;
              const playerGoals = player?.goals;
              const playerPlusMinus = player?.plusMinus;
              const playerGamesPlayed = player?.gamesPlayed;
              const playerAvgTOI = player?.avgTimeOnIcePerGame;
              const playerWeightedPoints = player?.weightedPoints;
              const playerWeightedPointsPerGame = player?.weightedPointsPerGame;

              return (
                <div className="player p-4 border border-white rounded" key={playerID}>
                  <img src={playerHeadshot} alt={playerName} width="120" height="120" className="mb-2 bg-white rounded-[50%] block ml-auto mr-auto" loading="lazy" />
                  <h4 className="mb-2">{playerName} &middot; {playerPosition}</h4>
                  <div className="player-stats grid grid-cols-2 md:grid-cols-3 gap-2 text-left">
                    <p>Total Points: <b className="block">{playerPoints}</b></p>
                    <p>Assists: <b className="block">{playerAssists}</b></p>
                    <p>Goals: <b className="block">{playerGoals}</b></p>
                    <p>Plus-Minus: <b className="block">{playerPlusMinus > 0 ? '+' : ''}{playerPlusMinus}</b></p>
                    <p>Games Played: <b className="block">{playerGamesPlayed}</b></p>
                    { playerAvgTOI && (
                      <p>Avg TOI: <b className="block">{Number(((playerAvgTOI || 0)/60).toFixed(2))}</b></p>
                    )}
                    <hr className="text-silver col-span-full mt-2 mb-2" />
                    <p className="col-span-full">Weighted Points: <i className="block text-sm text-silver">(total points with plus-minus)</i> <b className="block">{playerWeightedPoints}</b></p>
                    <p className="col-span-full">Weighted Points Per Game: <i className="block text-sm text-silver">(weighted points divided by games played)</i> <b className="block">{playerWeightedPointsPerGame}</b></p>
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