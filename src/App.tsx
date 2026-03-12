import { useEffect, useMemo, useState } from 'react'
import CalculatorPanel from './components/CalculatorPanel'
import CncCodeExplorer from './components/CncCodeExplorer'
import ProcessPlanner from './components/ProcessPlanner'
import ThemeToggle from './components/ThemeToggle'
import { materialData, processChecklist, skills, toolbox } from './data/content'

type Theme = 'light' | 'dark'

const getInitialTheme = (): Theme => {
  const savedTheme = window.localStorage.getItem('cnc-theme')
  if (savedTheme === 'light' || savedTheme === 'dark') {
    return savedTheme
  }

  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

function App() {
  const [theme, setTheme] = useState<Theme>(getInitialTheme)

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    window.localStorage.setItem('cnc-theme', theme)
  }, [theme])

  const levelCount = useMemo(
    () =>
      skills.reduce(
        (acc, skill) => {
          acc[skill.level] += 1
          return acc
        },
        {
          Foundational: 0,
          Core: 0,
          Advanced: 0,
        },
      ),
    [],
  )

  return (
    <div className="app-shell">
      <header className="hero-section">
        <div className="top-bar">
          <p className="brand">MillOps CNC Hub</p>
          <ThemeToggle
            theme={theme}
            onToggle={() => setTheme((current) => (current === 'dark' ? 'light' : 'dark'))}
          />
        </div>
        <div className="hero-content">
          <div>
            <p className="eyebrow">CNC Milling Toolkit</p>
            <h1>Everything you need to run smarter CNC mill jobs.</h1>
            <p className="hero-copy">
              Practical calculators, setup guides, process checklists, and machining skills in one
              modern mobile-ready workspace.
            </p>
            <div className="hero-actions">
              <a href="#calculators" className="button primary">
                Open calculators
              </a>
              <a href="#process-planner" className="button secondary">
                Advanced planner
              </a>
              <a href="#skills" className="button secondary">
                Build skills
              </a>
            </div>
          </div>
          <div className="card hero-metrics">
            <h2>Learning Coverage</h2>
            <ul>
              <li>
                <strong>{levelCount.Foundational}</strong>
                <span>Foundational modules</span>
              </li>
              <li>
                <strong>{levelCount.Core}</strong>
                <span>Core process modules</span>
              </li>
              <li>
                <strong>{levelCount.Advanced}</strong>
                <span>Advanced recovery modules</span>
              </li>
            </ul>
          </div>
        </div>
      </header>

      <main className="content-grid">
        <CalculatorPanel />
        <ProcessPlanner />
        <CncCodeExplorer />

        <section className="card" id="skills" aria-labelledby="skills-title">
          <div className="section-header">
            <h2 id="skills-title">Skills for CNC Milling</h2>
            <p>Progression from machine setup fundamentals to advanced problem-solving routines.</p>
          </div>
          <div className="skill-grid">
            {skills.map((skill) => (
              <article key={skill.title} className="skill-card">
                <div className="chip">{skill.level}</div>
                <h3>{skill.title}</h3>
                <p>{skill.description}</p>
                <ul>
                  {skill.checklist.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section className="card" id="tools" aria-labelledby="tools-title">
          <div className="section-header">
            <h2 id="tools-title">Machine Shop Toolbox</h2>
            <p>Reference tools for setup, programming, tool management, and quality troubleshooting.</p>
          </div>
          <div className="tool-grid">
            {toolbox.map((tool) => (
              <article key={tool.name} className="tool-card">
                <p className="chip chip-muted">{tool.category}</p>
                <h3>{tool.name}</h3>
                <p>{tool.summary}</p>
                <p className="tip">
                  <span>Quick tip:</span> {tool.quickTip}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="card split-grid" aria-labelledby="reference-title">
          <article>
            <div className="section-header">
              <h2 id="reference-title">Material Surface Speed Reference</h2>
              <p>Starter SFM ranges for common materials and carbide tooling combinations.</p>
            </div>
            <div className="table-wrap">
              <table>
                <thead>
                  <tr>
                    <th>Material</th>
                    <th>Tooling</th>
                    <th>SFM Range</th>
                    <th>Coolant</th>
                    <th>Unit Power</th>
                  </tr>
                </thead>
                <tbody>
                  {materialData.map((row) => (
                    <tr key={row.material}>
                      <td>{row.material}</td>
                      <td>{row.tooling}</td>
                      <td>{row.sfmRange}</td>
                      <td>{row.coolant}</td>
                      <td>{row.unitPowerHpPerIn3Min} hp/in³/min</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </article>
          <article>
            <div className="section-header">
              <h2>First Article Checklist</h2>
              <p>Use this process each time to reduce setup mistakes and protect spindle time.</p>
            </div>
            <ol className="checklist">
              {processChecklist.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ol>
          </article>
        </section>
      </main>

      <footer className="footer">
        <p>Built for CNC milling teams that care about speed, quality, and repeatability.</p>
      </footer>
    </div>
  )
}

export default App
