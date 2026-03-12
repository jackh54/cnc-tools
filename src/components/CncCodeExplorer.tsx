import { useMemo, useState } from 'react'
import { codeReference } from '../data/content'

const CncCodeExplorer = () => {
  const [query, setQuery] = useState('')
  const [group, setGroup] = useState<'All' | 'Motion' | 'Compensation' | 'Cycles' | 'Machine'>('All')

  const filteredCodes = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()

    return codeReference.filter((item) => {
      const groupMatch = group === 'All' || item.group === group
      const queryMatch =
        normalizedQuery.length === 0 ||
        item.code.toLowerCase().includes(normalizedQuery) ||
        item.description.toLowerCase().includes(normalizedQuery) ||
        item.usage.toLowerCase().includes(normalizedQuery)

      return groupMatch && queryMatch
    })
  }, [group, query])

  return (
    <section className="card" id="code-reference" aria-labelledby="code-reference-title">
      <div className="section-header">
        <h2 id="code-reference-title">G/M Code Explorer</h2>
        <p>Search common milling codes quickly during setup, prove-out, and restart planning.</p>
      </div>

      <div className="reference-controls">
        <label>
          Search by code or behavior
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Ex: G43, tapping, coolant"
          />
        </label>
        <label>
          Group
          <select value={group} onChange={(event) => setGroup(event.target.value as typeof group)}>
            <option value="All">All groups</option>
            <option value="Motion">Motion</option>
            <option value="Compensation">Compensation</option>
            <option value="Cycles">Cycles</option>
            <option value="Machine">Machine</option>
          </select>
        </label>
      </div>

      <div className="code-grid">
        {filteredCodes.map((item) => (
          <article key={item.code} className="code-card">
            <p className="code-title">
              <span>{item.code}</span>
              <span className="chip chip-muted">{item.group}</span>
            </p>
            <p>{item.description}</p>
            <p className="tip">
              <span>Usage:</span> {item.usage}
            </p>
          </article>
        ))}
      </div>
    </section>
  )
}

export default CncCodeExplorer
