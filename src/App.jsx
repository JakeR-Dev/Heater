import { useState } from 'react';
import { Title } from './components/Title'
import { SearchForm } from './components/SearchForm'
import { SearchResults } from './components/SearchResults'
import './App.css'

function App() {
  const [results, setResults] = useState([]);

  return (
    <div className="container pt-6 pb-6">
      <Title />
      <SearchForm setResults={setResults} />
      <SearchResults results={results} />
    </div>
  )
}

export default App
