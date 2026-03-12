import { useMemo, useState } from 'react'
import {
  calculateFeedRateIpm,
  calculateMaterialRemovalRate,
  calculateMetricToInches,
  calculateSpindleSpeedRpm,
  toNumber,
} from '../utils/cncMath'

const formatNumber = (value: number | null, decimals = 0): string => {
  if (value === null) {
    return 'Enter valid positive values'
  }

  return value.toLocaleString(undefined, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  })
}

const CalculatorPanel = () => {
  const [speedForm, setSpeedForm] = useState({
    sfm: '500',
    diameter: '0.5',
  })
  const [feedForm, setFeedForm] = useState({
    spindleRpm: '3820',
    flutes: '4',
    chipLoad: '0.002',
  })
  const [mrrForm, setMrrForm] = useState({
    radialWidth: '0.2',
    axialDepth: '0.25',
    feedRate: '30',
  })
  const [metricForm, setMetricForm] = useState({
    millimeters: '12',
  })

  const spindleRpm = useMemo(
    () => calculateSpindleSpeedRpm(toNumber(speedForm.sfm), toNumber(speedForm.diameter)),
    [speedForm],
  )

  const feedRateIpm = useMemo(
    () =>
      calculateFeedRateIpm(
        toNumber(feedForm.spindleRpm),
        toNumber(feedForm.flutes),
        toNumber(feedForm.chipLoad),
      ),
    [feedForm],
  )

  const materialRemovalRate = useMemo(
    () =>
      calculateMaterialRemovalRate(
        toNumber(mrrForm.radialWidth),
        toNumber(mrrForm.axialDepth),
        toNumber(mrrForm.feedRate),
      ),
    [mrrForm],
  )

  const metricToInches = useMemo(
    () => calculateMetricToInches(toNumber(metricForm.millimeters)),
    [metricForm],
  )

  return (
    <section className="card calculators" id="calculators" aria-labelledby="calc-title">
      <div className="section-header">
        <h2 id="calc-title">CNC Milling Calculators</h2>
        <p>
          Fast planning tools for spindle speed, chip-load feed rate, material removal, and unit
          conversion.
        </p>
      </div>
      <div className="calculator-grid">
        <article className="calculator">
          <h3>Spindle Speed</h3>
          <p className="formula">RPM = (SFM × 3.82) / Tool Diameter (in)</p>
          <label>
            Cutting speed (SFM)
            <input
              inputMode="decimal"
              value={speedForm.sfm}
              onChange={(event) =>
                setSpeedForm((previous) => ({ ...previous, sfm: event.target.value }))
              }
            />
          </label>
          <label>
            Tool diameter (in)
            <input
              inputMode="decimal"
              value={speedForm.diameter}
              onChange={(event) =>
                setSpeedForm((previous) => ({ ...previous, diameter: event.target.value }))
              }
            />
          </label>
          <output>{formatNumber(spindleRpm, 0)} RPM</output>
        </article>

        <article className="calculator">
          <h3>Feed Rate</h3>
          <p className="formula">IPM = RPM × Flutes × Chip Load (in/tooth)</p>
          <label>
            Spindle speed (RPM)
            <input
              inputMode="decimal"
              value={feedForm.spindleRpm}
              onChange={(event) =>
                setFeedForm((previous) => ({ ...previous, spindleRpm: event.target.value }))
              }
            />
          </label>
          <label>
            Flute count
            <input
              inputMode="numeric"
              value={feedForm.flutes}
              onChange={(event) =>
                setFeedForm((previous) => ({ ...previous, flutes: event.target.value }))
              }
            />
          </label>
          <label>
            Chip load (in/tooth)
            <input
              inputMode="decimal"
              value={feedForm.chipLoad}
              onChange={(event) =>
                setFeedForm((previous) => ({ ...previous, chipLoad: event.target.value }))
              }
            />
          </label>
          <output>{formatNumber(feedRateIpm, 2)} IPM</output>
        </article>

        <article className="calculator">
          <h3>Material Removal Rate</h3>
          <p className="formula">MRR = Width of Cut × Depth of Cut × Feed (in³/min)</p>
          <label>
            Width of cut (in)
            <input
              inputMode="decimal"
              value={mrrForm.radialWidth}
              onChange={(event) =>
                setMrrForm((previous) => ({ ...previous, radialWidth: event.target.value }))
              }
            />
          </label>
          <label>
            Depth of cut (in)
            <input
              inputMode="decimal"
              value={mrrForm.axialDepth}
              onChange={(event) =>
                setMrrForm((previous) => ({ ...previous, axialDepth: event.target.value }))
              }
            />
          </label>
          <label>
            Feed rate (IPM)
            <input
              inputMode="decimal"
              value={mrrForm.feedRate}
              onChange={(event) =>
                setMrrForm((previous) => ({ ...previous, feedRate: event.target.value }))
              }
            />
          </label>
          <output>{formatNumber(materialRemovalRate, 3)} in³/min</output>
        </article>

        <article className="calculator">
          <h3>Metric to Inch</h3>
          <p className="formula">Inches = Millimeters × 0.0393701</p>
          <label>
            Size (mm)
            <input
              inputMode="decimal"
              value={metricForm.millimeters}
              onChange={(event) => setMetricForm({ millimeters: event.target.value })}
            />
          </label>
          <output>{formatNumber(metricToInches, 4)} in</output>
        </article>
      </div>
    </section>
  )
}

export default CalculatorPanel
