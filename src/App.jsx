import { useState } from 'react';
import { Title } from './components/Title'
import { SearchForm } from './components/SearchForm'
import { MostImpactful } from './components/MostImpactful'
import { MostReliable } from './components/MostReliable'
import { Snipers } from './components/Snipers'
import './App.css'

function App() {
  const [results, setResults] = useState([]);

  return (
    <div className="container pt-6 pb-6">
      <Title />
      <SearchForm setResults={setResults} />
      <MostImpactful results={results} />
      <MostReliable results={results} />
      <Snipers results={results} />
    </div>
  )
}

export default App
