export const SearchResults = ({ results }) => {
  return (
    <div className="container text-center mt-15">
      {results?.length ? (
        <div className="players grid grid-cols-2 md:grid-cols-3 gap-3">
          {results.map(player => {
            const playerName = player?.firstName?.default + ' ' + player?.lastName?.default;
            const playerPosition = player?.positionCode + (player?.positionCode == 'L' || player?.positionCode == 'R' ? 'W' : '');
            return (
              <div className="player p-4 border border-white rounded" key={player?.playerId}>
                <img src={player?.headshot} alt={playerName} width="120" height="120" className="mb-2 bg-white rounded-[50%] block ml-auto mr-auto" loading="lazy" />
                <h3>{playerName} &middot; {playerPosition}</h3>
                <p>Total Points: {player?.points}</p>
                <p>Assists: {player?.assists}</p>
                <p>Goals: {player?.goals}</p>
              </div>
            );
          })}
        </div>
      ) : (
        <h5>Choose a team to begin.</h5>
      )}
    </div>
  )
}