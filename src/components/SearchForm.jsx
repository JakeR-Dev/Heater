import { teamList } from '../data/teamList'
import { getTeamStats } from '../api/getTeamStats'

export const SearchForm = ({ setResults }) => {
  return (
    <form className="text-center">
      <label htmlFor="teams">Choose a Team:</label>
      <select name="teams" id="teams" onChange={(e) => getTeamStats(e.target.value).then(setResults)}>
        {teamList.map(team => (
          <option key={team.id} value={team.id}>{team.name}</option>
        ))}
      </select>
    </form>
  )
}