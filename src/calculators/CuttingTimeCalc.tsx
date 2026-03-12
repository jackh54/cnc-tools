import { useState, useMemo } from 'react'

export function CuttingTimeCalc() {
  const [length, setLength] = useState('')
  const [feedRate, setFeedRate] = useState('')
  const [metric, setMetric] = useState(false)

  const result = useMemo(() => {
    const l = parseFloat(length)
    const f = parseFloat(feedRate)
    if (!l || !f || l <= 0 || f <= 0) return null
    return (l / f) * 60
  }, [length, feedRate, metric])

  const lenUnit = metric ? 'mm' : 'in'
  const feedUnit = metric ? 'mm/min' : 'in/min'

  return (
    <div className="space-y-4">
      <h3 className="font-display font-semibold text-zinc-100">Cutting Time</h3>
      <p className="text-sm text-zinc-400">
        Time (seconds) = (Length ÷ Feed Rate) × 60
      </p>
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="time-metric"
          checked={metric}
          onChange={(e) => setMetric(e.target.checked)}
          className="rounded border-zinc-600 bg-zinc-800"
        />
        <label htmlFor="time-metric" className="text-sm text-zinc-400">Metric</label>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="text-sm text-zinc-400">Cut Length ({lenUnit})</span>
          <input
            type="number"
            value={length}
            onChange={(e) => setLength(e.target.value)}
            placeholder={metric ? 'e.g. 100' : 'e.g. 4'}
            step="any"
            className="mt-1 w-full rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 text-zinc-100 placeholder-zinc-500 focus:border-amber-500/50 focus:outline-none focus:ring-1 focus:ring-amber-500/50"
          />
        </label>
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
      </div>
      {result !== null && (
        <div className="rounded-lg bg-amber-500/10 px-4 py-3 font-mono text-amber-400">
          Cutting Time: {result.toFixed(1)} seconds
        </div>
      )}
    </div>
  )
}
