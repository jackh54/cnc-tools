import { useState, useMemo } from 'react'

export function UnitConverter() {
  const [value, setValue] = useState('')
  const [fromUnit, setFromUnit] = useState<'inch' | 'mm'>('inch')

  const result = useMemo((): { mm: number; cm: number; thou: number } | { inch: number; cm: number; thou: number } | null => {
    const v = parseFloat(value)
    if (isNaN(v)) return null
    if (fromUnit === 'inch') {
      return { mm: v * 25.4, cm: v * 2.54, thou: v * 1000 }
    }
    return { inch: v / 25.4, cm: v / 10, thou: (v / 25.4) * 1000 }
  }, [value, fromUnit])

  return (
    <div className="space-y-4">
      <h3 className="font-display font-semibold text-zinc-100">Unit Converter</h3>
      <div className="flex flex-wrap gap-4 items-end">
        <label className="block">
          <span className="text-sm text-zinc-400">Value</span>
          <input
            type="number"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="0"
            step="any"
            className="mt-1 w-32 rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 text-zinc-100 placeholder-zinc-500 focus:border-amber-500/50 focus:outline-none focus:ring-1 focus:ring-amber-500/50"
          />
        </label>
        <label className="block">
          <span className="text-sm text-zinc-400">From</span>
          <select
            value={fromUnit}
            onChange={(e) => setFromUnit(e.target.value as 'inch' | 'mm')}
            className="mt-1 block rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 text-zinc-100 focus:border-amber-500/50 focus:outline-none focus:ring-1 focus:ring-amber-500/50"
          >
            <option value="inch">inch</option>
            <option value="mm">mm</option>
          </select>
        </label>
      </div>
      {result !== null && (
        <div className="flex flex-wrap gap-4 text-sm">
          {'mm' in result ? (
            <>
              <span className="text-zinc-400">mm: <span className="font-mono text-amber-400">{result.mm.toFixed(4)}</span></span>
              <span className="text-zinc-400">cm: <span className="font-mono text-amber-400">{result.cm.toFixed(4)}</span></span>
              <span className="text-zinc-400">thou: <span className="font-mono text-amber-400">{result.thou.toFixed(2)}</span></span>
            </>
          ) : (
            <>
              <span className="text-zinc-400">inch: <span className="font-mono text-amber-400">{result.inch.toFixed(4)}</span></span>
              <span className="text-zinc-400">cm: <span className="font-mono text-amber-400">{result.cm.toFixed(4)}</span></span>
              <span className="text-zinc-400">thou: <span className="font-mono text-amber-400">{result.thou.toFixed(2)}</span></span>
            </>
          )}
        </div>
      )}
    </div>
  )
}
