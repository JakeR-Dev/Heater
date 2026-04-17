import { useEffect, useState } from "react";
import { getMostReliablePlayers } from "../api/getMostReliablePlayers";
import { getLeagueMostReliablePlayers } from "../api/getLeagueMostReliablePlayers";

export const MostReliable = ({ results, showLeagueLeaders }) => {
  const [mostReliablePlayers, setMostReliablePlayers] = useState([]);

  // test to see if we're showing league leaders or team stats,
  // and if league leaders, then get the stats for the league leaders
  // must be async because pulling a league leader player's stats requires an additional api call per player
  useEffect(() => {
    if (!results) {
      setMostReliablePlayers([]);
      return;
    }

    if (showLeagueLeaders === true) {
      getLeagueMostReliablePlayers(results.toi)
        .then((data) => setMostReliablePlayers(data ?? []))
        .catch((error) => {
          console.error('MostReliable league stats fetch error:', error);
          setMostReliablePlayers([]);
        });
      return;
    }

    setMostReliablePlayers(getMostReliablePlayers(results));
  }, [results, showLeagueLeaders]);

  if (!results) return;

  return (
    <div className="container text-center mt-15">
      {mostReliablePlayers?.length > 1 && (
        <>
          {/* most time played leaderboard */}
          <h3>Most Reliable</h3>
          <h5 className="mb-5 text-silver">Most Time Played This Season</h5>
          <div className="players grid grid-cols-2 md:grid-cols-3 gap-3 mb-6">
            {mostReliablePlayers.map(player => {
              const playerName = player?.firstName?.default + ' ' + player?.lastName?.default;
              const playerHeadshot = player?.headshot;
              const playerPosition = (player?.positionCode ?? player?.position) + (player?.positionCode == 'L' || player?.positionCode == 'R' ? 'W' : '');
              const playerID = player?.playerId ?? player?.id;
              const playerPoints = player?.points;
              const playerAssists = player?.assists;
              const playerGoals = player?.goals;
              const playerPlusMinus = player?.plusMinus;
              const playerGamesPlayed = player?.gamesPlayed;
              const playerAvgTimeOnIcePerGame = player?.avgTimeOnIcePerGame || player?.value;
              const playerTotalMinutesPlayed = player?.totalMinutesPlayed;
              const playerTotalMinutesPlayedDisplay = player?.totalMinutesPlayedDisplay;

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
                    <p>Avg TOI: <b className="block">{Number(((playerAvgTimeOnIcePerGame || 0)/60).toFixed(2))}</b></p>
                    <hr className="text-silver col-span-full mt-2 mb-2" />
                    <p className="col-span-full">Total Minutes Played: <i className="block text-sm text-silver">(avg time per game * games played)</i> <b className="block">{playerTotalMinutesPlayedDisplay || Number(playerTotalMinutesPlayed || 0).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</b></p>
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