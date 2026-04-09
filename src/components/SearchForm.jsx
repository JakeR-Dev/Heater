import { teamList } from '../data/teamList'
import { getTeamStats } from '../api/getTeamStats'

export const SearchForm = ({ setResults }) => {
  return (
    <form className="text-center">
      <select name="teams" id="teams" onChange={(e) => getTeamStats(e.target.value).then(setResults)}>
        <option key="select" value="">Select a team</option>
        {teamList.map(team => (
          <option key={team.id} value={team.id}>{team.name}</option>
        ))}
      </select>
    </form>
  )
}