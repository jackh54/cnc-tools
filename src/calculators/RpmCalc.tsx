import { useState, useMemo } from 'react'

export function RpmCalc() {
  const [sfm, setSfm] = useState('')
  const [diameter, setDiameter] = useState('')
  const [metric, setMetric] = useState(false)

  const result = useMemo(() => {
    const d = parseFloat(diameter)
    if (!d || d <= 0) return null
    if (metric) {
      const vc = parseFloat(sfm)
      if (!vc || vc <= 0) return null
      return (vc * 1000) / (Math.PI * d)
    }
    const s = parseFloat(sfm)
    if (!s || s <= 0) return null
    return (s * 3.82) / d
  }, [sfm, diameter, metric])

  const speedLabel = metric ? 'Cutting Speed (m/min)' : 'Surface Speed (SFM)'
  const diamLabel = metric ? 'Tool Diameter (mm)' : 'Tool Diameter (in)'

  return (
    <div className="space-y-4">
      <h3 className="font-display font-semibold text-zinc-100">Spindle Speed (RPM)</h3>
      <p className="text-sm text-zinc-400">
        {metric
          ? 'RPM = (Vc × 1000) ÷ (π × Diameter)'
          : 'RPM = (SFM × 3.82) ÷ Diameter'}
      </p>
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="rpm-metric"
          checked={metric}
          onChange={(e) => setMetric(e.target.checked)}
          className="rounded border-zinc-600 bg-zinc-800"
        />
        <label htmlFor="rpm-metric" className="text-sm text-zinc-400">Metric</label>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="text-sm text-zinc-400">{speedLabel}</span>
          <input
            type="number"
            value={sfm}
            onChange={(e) => setSfm(e.target.value)}
            placeholder={metric ? 'e.g. 100' : 'e.g. 400'}
            step="any"
            className="mt-1 w-full rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 text-zinc-100 placeholder-zinc-500 focus:border-amber-500/50 focus:outline-none focus:ring-1 focus:ring-amber-500/50"
          />
        </label>
        <label className="block">
          <span className="text-sm text-zinc-400">{diamLabel}</span>
          <input
            type="number"
            value={diameter}
            onChange={(e) => setDiameter(e.target.value)}
            placeholder={metric ? 'e.g. 6' : 'e.g. 0.25'}
            step="any"
            className="mt-1 w-full rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 text-zinc-100 placeholder-zinc-500 focus:border-amber-500/50 focus:outline-none focus:ring-1 focus:ring-amber-500/50"
          />
        </label>
      </div>
      {result !== null && (
        <div className="rounded-lg bg-amber-500/10 px-4 py-3 font-mono text-amber-400">
          RPM: {Math.round(result)}
        </div>
      )}
    </div>
  )
}
