import { useState } from 'react'
import { Layout } from './components/Layout'
import { Home } from './pages/Home'
import { Calculators } from './pages/Calculators'
import { Skills } from './pages/Skills'
import { Tools } from './pages/Tools'

type Page = 'home' | 'calculators' | 'skills' | 'tools'

function App() {
  const [page, setPage] = useState<Page>('home')

  return (
    <Layout currentPage={page} onNavigate={setPage}>
      {page === 'home' && <Home onNavigate={setPage} />}
      {page === 'calculators' && <Calculators />}
      {page === 'skills' && <Skills />}
      {page === 'tools' && <Tools />}
    </Layout>
  )
}

export default App
