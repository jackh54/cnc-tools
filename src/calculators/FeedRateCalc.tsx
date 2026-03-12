import { useState, useMemo } from 'react'

export function FeedRateCalc() {
  const [rpm, setRpm] = useState('')
  const [flutes, setFlutes] = useState('2')
  const [chipLoad, setChipLoad] = useState('')
  const [metric, setMetric] = useState(false)

  const result = useMemo(() => {
    const r = parseFloat(rpm)
    const f = parseFloat(flutes)
    const c = parseFloat(chipLoad)
    if (!r || !f || !c || r <= 0 || f <= 0 || c <= 0) return null
    const feed = r * f * c
    return metric ? feed : feed
  }, [rpm, flutes, chipLoad, metric])

  const unit = metric ? 'mm/min' : 'in/min'
  const chipUnit = metric ? 'mm/tooth' : 'in/tooth'

  return (
    <div className="space-y-4">
      <h3 className="font-display font-semibold text-zinc-100">Feed Rate</h3>
      <p className="text-sm text-zinc-400">
        Feed Rate = RPM × Flutes × Chip Load
      </p>
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="metric"
          checked={metric}
          onChange={(e) => setMetric(e.target.checked)}
          className="rounded border-zinc-600 bg-zinc-800"
        />
        <label htmlFor="metric" className="text-sm text-zinc-400">Metric</label>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
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
        <label className="block">
          <span className="text-sm text-zinc-400">Number of Flutes</span>
          <input
            type="number"
            value={flutes}
            onChange={(e) => setFlutes(e.target.value)}
            min="1"
            className="mt-1 w-full rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 text-zinc-100 placeholder-zinc-500 focus:border-amber-500/50 focus:outline-none focus:ring-1 focus:ring-amber-500/50"
          />
        </label>
        <label className="block sm:col-span-2">
          <span className="text-sm text-zinc-400">Chip Load ({chipUnit})</span>
          <input
            type="number"
            value={chipLoad}
            onChange={(e) => setChipLoad(e.target.value)}
            placeholder={metric ? 'e.g. 0.05' : 'e.g. 0.002'}
            step="any"
            className="mt-1 w-full rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 text-zinc-100 placeholder-zinc-500 focus:border-amber-500/50 focus:outline-none focus:ring-1 focus:ring-amber-500/50"
          />
        </label>
      </div>
      {result !== null && (
        <div className="rounded-lg bg-amber-500/10 px-4 py-3 font-mono text-amber-400">
          Feed Rate: {result.toFixed(2)} {unit}
        </div>
      )}
    </div>
  )
}
