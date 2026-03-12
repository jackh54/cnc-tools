import { useState, useMemo } from 'react'

export function MrrCalc() {
  const [width, setWidth] = useState('')
  const [depth, setDepth] = useState('')
  const [feedRate, setFeedRate] = useState('')
  const [metric, setMetric] = useState(false)

  const result = useMemo(() => {
    const w = parseFloat(width)
    const d = parseFloat(depth)
    const f = parseFloat(feedRate)
    if (!w || !d || !f || w <= 0 || d <= 0 || f <= 0) return null
    return w * d * f
  }, [width, depth, feedRate, metric])

  const unit = metric ? 'mm³/min' : 'in³/min'
  const lenUnit = metric ? 'mm' : 'in'
  const feedUnit = metric ? 'mm/min' : 'in/min'

  return (
    <div className="space-y-4">
      <h3 className="font-display font-semibold text-zinc-100">Material Removal Rate</h3>
      <p className="text-sm text-zinc-400">
        MRR = Width of Cut × Depth of Cut × Feed Rate
      </p>
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="mrr-metric"
          checked={metric}
          onChange={(e) => setMetric(e.target.checked)}
          className="rounded border-zinc-600 bg-zinc-800"
        />
        <label htmlFor="mrr-metric" className="text-sm text-zinc-400">Metric</label>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="text-sm text-zinc-400">Width of Cut ({lenUnit})</span>
          <input
            type="number"
            value={width}
            onChange={(e) => setWidth(e.target.value)}
            placeholder={metric ? 'e.g. 6' : 'e.g. 0.25'}
            step="any"
            className="mt-1 w-full rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 text-zinc-100 placeholder-zinc-500 focus:border-amber-500/50 focus:outline-none focus:ring-1 focus:ring-amber-500/50"
          />
        </label>
        <label className="block">
          <span className="text-sm text-zinc-400">Depth of Cut ({lenUnit})</span>
          <input
            type="number"
            value={depth}
            onChange={(e) => setDepth(e.target.value)}
            placeholder={metric ? 'e.g. 2' : 'e.g. 0.1'}
            step="any"
            className="mt-1 w-full rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 text-zinc-100 placeholder-zinc-500 focus:border-amber-500/50 focus:outline-none focus:ring-1 focus:ring-amber-500/50"
          />
        </label>
        <label className="block sm:col-span-2">
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
          MRR: {result.toFixed(2)} {unit}
        </div>
      )}
    </div>
  )
}
