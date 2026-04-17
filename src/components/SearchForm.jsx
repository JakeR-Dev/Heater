import { teamList } from '../data/teamList'
import { getTeamStats } from '../api/getTeamStats'
import { getLeagueLeaders } from '../api/getLeagueLeaders'

export const SearchForm = ({ setResults, setShowLeagueLeaders }) => {
  const handleSearchFormChange = async (e) => {
    const { value } = e.target
    let data = []

    try {
      if (value === 'all') {
        setShowLeagueLeaders(true);
        data = await getLeagueLeaders();
      } else {
        setShowLeagueLeaders(false);
        data = await getTeamStats(value);
      }

      setResults(data ?? [])
    } catch (error) {
      console.error('Search form fetch error:', error)
      setResults([])
    }
  }


  return (
    <form className="text-center">
      <select name="teams" id="teams" onChange={handleSearchFormChange} defaultValue="all">
        <option key="select" value="all">All</option>
        {teamList.map(team => (
          <option key={team.id} value={team.id}>{team.name}</option>
        ))}
      </select>
    </form>
  )
}