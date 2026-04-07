import { teamList } from '../data/teamList'

export const SearchForm = () => {
  return (
    <form className="text-center">
      <label htmlFor="teams">Choose a Team:</label>
      <select name="teams" id="teams">
        {teamList.map(team => (
          <option key={team.id} value={team.id}>{team.name}</option>
        ))}
      </select>
    </form>
  )
}