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
    <div className="p-6 md:p-0 md:h-screen md:overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-[300px_minmax(0,1fr)] gap-4 md:h-full">
        <div className="title p-0 md:p-8 md:sticky md:top-0 md:self-stretch bg-charcoal">
          <Title />
          <SearchForm setResults={setResults} setShowLeagueLeaders={setShowLeagueLeaders} />
        </div>
        <div className="results py-8 md:mt-0 md:overflow-y-auto">
          <MostImpactful results={results} showLeagueLeaders={showLeagueLeaders} />
          <MostReliable results={results} showLeagueLeaders={showLeagueLeaders} />
          <Snipers results={results} showLeagueLeaders={showLeagueLeaders} />
        </div>
      </div>
    </div>
  )
}

export default App
