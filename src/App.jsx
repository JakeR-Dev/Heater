import { useState, useEffect } from 'react';
import { Title } from './components/Title'
import { SearchForm } from './components/SearchForm'
import { MostImpactful } from './components/MostImpactful'
import { MostReliable } from './components/MostReliable'
import { Snipers } from './components/Snipers'
import { getLeagueLeaders } from './api/getLeagueLeaders';
import './App.css'

function App() {
  const [results, setResults] = useState([]);
  const [showLeagueLeaders, setShowLeagueLeaders] = useState(true)

  // on mount, set results to league-wide leaders
  useEffect(() => {
    const loadLeagueLeaders = async () => {
      try {
        const data = await getLeagueLeaders()
        setResults(data ?? [])
      } catch (error) {
        console.error('Initial league spotlight fetch error:', error)
        setResults([])
      }
    }
    loadLeagueLeaders()
  }, [])

  return (
    <div className="p-6 lg:p-0 lg:h-screen lg:overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-[300px_minmax(0,1fr)] gap-4 md:h-full">
        <div className="title p-4 lg:p-8 lg:sticky lg:top-0 lg:self-stretch bg-charcoal">
          <Title />
          <SearchForm setResults={setResults} setShowLeagueLeaders={setShowLeagueLeaders} />
        </div>
        <div className="results py-8 lg:mt-0 lg:overflow-y-auto">
          <MostImpactful results={results} showLeagueLeaders={showLeagueLeaders} />
          <MostReliable results={results} showLeagueLeaders={showLeagueLeaders} />
          <Snipers results={results} showLeagueLeaders={showLeagueLeaders} />
        </div>
      </div>
    </div>
  )
}

export default App
