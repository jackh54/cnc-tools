import { useState } from 'react'
import { FeedRateCalc } from '../calculators/FeedRateCalc'
import { RpmCalc } from '../calculators/RpmCalc'
import { ChipLoadCalc } from '../calculators/ChipLoadCalc'
import { MrrCalc } from '../calculators/MrrCalc'
import { CuttingTimeCalc } from '../calculators/CuttingTimeCalc'

type CalcId = 'feed' | 'rpm' | 'chip' | 'mrr' | 'time'

const calcs: { id: CalcId; label: string }[] = [
  { id: 'feed', label: 'Feed Rate' },
  { id: 'rpm', label: 'Spindle Speed (RPM)' },
  { id: 'chip', label: 'Chip Load' },
  { id: 'mrr', label: 'Material Removal Rate' },
  { id: 'time', label: 'Cutting Time' },
]

export function Calculators() {
  const [active, setActive] = useState<CalcId>('feed')

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display text-2xl font-bold text-zinc-100">Calculators</h2>
        <p className="mt-1 text-zinc-400">Speeds, feeds, and machining parameters.</p>
      </div>

      <div className="flex flex-wrap gap-2">
        {calcs.map(({ id, label }) => (
          <button
            key={id}
            onClick={() => setActive(id)}
            className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
              active === id
                ? 'bg-amber-500/20 text-amber-400'
                : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700 hover:text-zinc-200'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-4 sm:p-6">
        {active === 'feed' && <FeedRateCalc />}
        {active === 'rpm' && <RpmCalc />}
        {active === 'chip' && <ChipLoadCalc />}
        {active === 'mrr' && <MrrCalc />}
        {active === 'time' && <CuttingTimeCalc />}
      </div>
    </div>
  )
}
