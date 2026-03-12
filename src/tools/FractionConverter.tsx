import { useState, useMemo } from 'react'

const commonFractions: [number, number][] = [
  [1, 64], [1, 32], [3, 64], [1, 16], [5, 64], [3, 32], [7, 64], [1, 8],
  [9, 64], [5, 32], [11, 64], [3, 16], [13, 64], [7, 32], [15, 64], [1, 4],
  [17, 64], [9, 32], [19, 64], [5, 16], [21, 64], [11, 32], [23, 64], [3, 8],
  [25, 64], [13, 32], [27, 64], [7, 16], [29, 64], [15, 32], [31, 64], [1, 2],
  [33, 64], [17, 32], [35, 64], [9, 16], [37, 64], [19, 32], [39, 64], [5, 8],
  [41, 64], [21, 32], [43, 64], [11, 16], [45, 64], [23, 32], [47, 64], [3, 4],
  [49, 64], [25, 32], [51, 64], [13, 16], [53, 64], [27, 32], [55, 64], [7, 8],
  [57, 64], [29, 32], [59, 64], [15, 16], [61, 64], [31, 32], [63, 64], [1, 1],
]

function gcd(a: number, b: number): number {
  return b === 0 ? a : gcd(b, a % b)
}

function decimalToFraction(decimal: number): string {
  if (decimal === 0) return '0'
  const sign = decimal < 0 ? '-' : ''
  decimal = Math.abs(decimal)
  const whole = Math.floor(decimal)
  const frac = decimal - whole
  if (frac < 0.0001) return `${sign}${whole}`
  let bestNum = 1, bestDen = 1, bestErr = 1
  for (let den = 1; den <= 64; den++) {
    const num = Math.round(frac * den)
    const err = Math.abs(frac - num / den)
    if (err < bestErr) {
      bestErr = err
      bestNum = num
      bestDen = den
    }
  }
  const g = gcd(bestNum, bestDen)
  const n = bestNum / g
  const d = bestDen / g
  const fracStr = d === 1 ? `${n}` : `${n}/${d}`
  return whole ? `${sign}${whole} ${fracStr}` : `${sign}${fracStr}`
}

export function FractionConverter() {
  const [decimal, setDecimal] = useState('')
  const [fracInput, setFracInput] = useState('')

  const decToFrac = useMemo(() => {
    const v = parseFloat(decimal)
    return isNaN(v) ? null : decimalToFraction(v)
  }, [decimal])

  const fracToDec = useMemo(() => {
    const parts = fracInput.trim().split(/[\s/]+/)
    if (parts.length === 1) {
      const v = parseFloat(parts[0])
      return isNaN(v) ? null : v
    }
    if (parts.length === 2) {
      const a = parseFloat(parts[0])
      const b = parseFloat(parts[1])
      return (isNaN(a) || isNaN(b) || b === 0) ? null : a / b
    }
    if (parts.length === 3) {
      const whole = parseFloat(parts[0])
      const num = parseFloat(parts[1])
      const den = parseFloat(parts[2])
      return (isNaN(whole) || isNaN(num) || isNaN(den) || den === 0) ? null : whole + num / den
    }
    return null
  }, [fracInput])

  return (
    <div className="space-y-6">
      <h3 className="font-display font-semibold text-zinc-100">Fraction ↔ Decimal</h3>
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label className="block text-sm text-zinc-400 mb-1">Decimal → Fraction</label>
          <input
            type="number"
            value={decimal}
            onChange={(e) => setDecimal(e.target.value)}
            placeholder="e.g. 0.375"
            step="any"
            className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 text-zinc-100 placeholder-zinc-500 focus:border-amber-500/50 focus:outline-none focus:ring-1 focus:ring-amber-500/50"
          />
          {decToFrac !== null && (
            <p className="mt-2 font-mono text-amber-400">{decToFrac}"</p>
          )}
        </div>
        <div>
          <label className="block text-sm text-zinc-400 mb-1">Fraction → Decimal (e.g. 3/8 or 1 1/4)</label>
          <input
            type="text"
            value={fracInput}
            onChange={(e) => setFracInput(e.target.value)}
            placeholder="e.g. 3/8"
            className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 text-zinc-100 placeholder-zinc-500 focus:border-amber-500/50 focus:outline-none focus:ring-1 focus:ring-amber-500/50"
          />
          {fracToDec !== null && (
            <p className="mt-2 font-mono text-amber-400">{fracToDec.toFixed(4)}"</p>
          )}
        </div>
      </div>
      <div>
        <p className="text-sm text-zinc-400 mb-2">Common fractions (64ths):</p>
        <div className="grid grid-cols-4 sm:grid-cols-8 gap-1 text-xs font-mono max-h-48 overflow-y-auto">
          {commonFractions.map(([num, den]) => (
            <div key={`${num}-${den}`} className="flex justify-between text-zinc-400">
              <span>{num}/{den}</span>
              <span className="text-amber-400/80">{(num/den).toFixed(3)}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
