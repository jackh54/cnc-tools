import { useState, useMemo } from 'react'

export function ChipLoadCalc() {
  const [feedRate, setFeedRate] = useState('')
  const [rpm, setRpm] = useState('')
  const [flutes, setFlutes] = useState('2')
  const [metric, setMetric] = useState(false)

  const result = useMemo(() => {
    const f = parseFloat(feedRate)
    const r = parseFloat(rpm)
    const fl = parseFloat(flutes)
    if (!f || !r || !fl || r <= 0 || fl <= 0) return null
    return f / (r * fl)
  }, [feedRate, rpm, flutes, metric])

  const feedUnit = metric ? 'mm/min' : 'in/min'
  const chipUnit = metric ? 'mm/tooth' : 'in/tooth'

  return (
    <div className="space-y-4">
      <h3 className="font-display font-semibold text-zinc-100">Chip Load</h3>
      <p className="text-sm text-zinc-400">
        Chip Load = Feed Rate ÷ (RPM × Flutes)
      </p>
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="chip-metric"
          checked={metric}
          onChange={(e) => setMetric(e.target.checked)}
          className="rounded border-zinc-600 bg-zinc-800"
        />
        <label htmlFor="chip-metric" className="text-sm text-zinc-400">Metric</label>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="text-sm text-zinc-400">Feed Rate ({feedUnit})</span>
          <input
            type="number"
            value={feedRate}
            onChange={(e) => setFeedRate(e.target.value)}
            placeholder="e.g. 48"
            step="any"
            className="mt-1 w-full rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 text-zinc-100 placeholder-zinc-500 focus:border-amber-500/50 focus:outline-none focus:ring-1 focus:ring-amber-500/50"
          />
        </label>
        <label className="block">
          <span className="text-sm text-zinc-400">RPM</span>
          <input
            type="number"
            value={rpm}
            onChange={(e) => setRpm(e.target.value)}
            placeholder="e.g. 12000"
            className="mt-1 w-full rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 text-zinc-100 placeholder-zinc-500 focus:border-amber-500/50 focus:outline-none focus:ring-1 focus:ring-amber-500/50"
          />
        </label>
        <label className="block sm:col-span-2">
          <span className="text-sm text-zinc-400">Number of Flutes</span>
          <input
            type="number"
            value={flutes}
            onChange={(e) => setFlutes(e.target.value)}
            min="1"
            className="mt-1 w-full rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 text-zinc-100 placeholder-zinc-500 focus:border-amber-500/50 focus:outline-none focus:ring-1 focus:ring-amber-500/50"
          />
        </label>
      </div>
      {result !== null && result > 0 && (
        <div className="rounded-lg bg-amber-500/10 px-4 py-3 font-mono text-amber-400">
          Chip Load: {result.toFixed(4)} {chipUnit}
        </div>
      )}
    </div>
  )
}
