import { useState } from 'react'
import { UnitConverter } from '../tools/UnitConverter'
import { FractionConverter } from '../tools/FractionConverter'
import { TapDrillChart } from '../tools/TapDrillChart'
import { SfmReference } from '../tools/SfmReference'

type ToolId = 'unit' | 'fraction' | 'tap' | 'sfm'

const tools: { id: ToolId; label: string }[] = [
  { id: 'unit', label: 'Unit Converter' },
  { id: 'fraction', label: 'Fraction ↔ Decimal' },
  { id: 'tap', label: 'Tap Drill Chart' },
  { id: 'sfm', label: 'SFM Reference' },
]

export function Tools() {
  const [active, setActive] = useState<ToolId>('unit')

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display text-2xl font-bold text-zinc-100">Tools</h2>
        <p className="mt-1 text-zinc-400">Converters and reference charts.</p>
      </div>

      <div className="flex flex-wrap gap-2">
        {tools.map(({ id, label }) => (
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
        {active === 'unit' && <UnitConverter />}
        {active === 'fraction' && <FractionConverter />}
        {active === 'tap' && <TapDrillChart />}
        {active === 'sfm' && <SfmReference />}
      </div>
    </div>
  )
}
