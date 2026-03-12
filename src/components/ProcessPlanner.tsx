import { useMemo, useState } from 'react'
import { materialData } from '../data/content'
import {
  calculateChipThinningFactor,
  calculateCycleTimeMinutes,
  calculateFeedRateIpm,
  calculateHorsepower,
  calculateMaterialRemovalRate,
  calculateSpindleSpeedRpm,
  calculateSurfaceSpeedSfm,
  calculateTorqueFtLb,
  toNumber,
} from '../utils/cncMath'

type FeedPoint = {
  rpm: number
  feed: number
}

const VIEWBOX_WIDTH = 360
const VIEWBOX_HEIGHT = 180
const CHART_PADDING = 26

const formatValue = (value: number | null, decimals: number, suffix = ''): string => {
  if (value === null) {
    return 'Enter valid positive values'
  }

  return `${value.toLocaleString(undefined, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  })}${suffix}`
}

const clamp = (value: number, min: number, max: number): number => Math.min(Math.max(value, min), max)

const parseSfmMidpoint = (sfmRange: string): number => {
  const [low, high] = sfmRange.split('-').map((value) => Number(value.trim()))
  if (!Number.isFinite(low) || !Number.isFinite(high)) {
    return 300
  }

  return Math.round((low + high) / 2)
}

const ProcessPlanner = () => {
  const [plannerForm, setPlannerForm] = useState({
    material: materialData[0].material,
    targetSfm: String(parseSfmMidpoint(materialData[0].sfmRange)),
    toolDiameter: '0.5',
    flutes: '4',
    chipLoad: '0.002',
    radialWidth: '0.125',
    axialDepth: '0.4',
    toolpathLength: '120',
    machineHp: '15',
  })

  const selectedMaterial =
    materialData.find((row) => row.material === plannerForm.material) ?? materialData[0]

  const spindleRpm = useMemo(
    () =>
      calculateSpindleSpeedRpm(toNumber(plannerForm.targetSfm), toNumber(plannerForm.toolDiameter)),
    [plannerForm.targetSfm, plannerForm.toolDiameter],
  )

  const chipThinningFactor = useMemo(
    () => calculateChipThinningFactor(toNumber(plannerForm.radialWidth), toNumber(plannerForm.toolDiameter)),
    [plannerForm.radialWidth, plannerForm.toolDiameter],
  )

  const baseFeedRate = useMemo(
    () =>
      calculateFeedRateIpm(
        toNumber(plannerForm.targetSfm) > 0 && spindleRpm !== null ? spindleRpm : NaN,
        toNumber(plannerForm.flutes),
        toNumber(plannerForm.chipLoad),
      ),
    [plannerForm.targetSfm, plannerForm.flutes, plannerForm.chipLoad, spindleRpm],
  )

  const adjustedFeedRate =
    baseFeedRate !== null && chipThinningFactor !== null ? baseFeedRate * chipThinningFactor : null

  const materialRemovalRate = useMemo(
    () =>
      adjustedFeedRate === null
        ? null
        : calculateMaterialRemovalRate(
            toNumber(plannerForm.radialWidth),
            toNumber(plannerForm.axialDepth),
            adjustedFeedRate,
          ),
    [adjustedFeedRate, plannerForm.radialWidth, plannerForm.axialDepth],
  )

  const cycleTimeMinutes = useMemo(
    () =>
      adjustedFeedRate === null
        ? null
        : calculateCycleTimeMinutes(toNumber(plannerForm.toolpathLength), adjustedFeedRate),
    [adjustedFeedRate, plannerForm.toolpathLength],
  )

  const spindleHorsepower = useMemo(
    () =>
      materialRemovalRate === null
        ? null
        : calculateHorsepower(materialRemovalRate, selectedMaterial.unitPowerHpPerIn3Min),
    [materialRemovalRate, selectedMaterial.unitPowerHpPerIn3Min],
  )

  const spindleTorque = useMemo(
    () =>
      spindleHorsepower === null || spindleRpm === null
        ? null
        : calculateTorqueFtLb(spindleHorsepower, spindleRpm),
    [spindleHorsepower, spindleRpm],
  )

  const spindleLoadPercent = useMemo(() => {
    const machineHp = toNumber(plannerForm.machineHp)
    if (spindleHorsepower === null || !Number.isFinite(machineHp) || machineHp <= 0) {
      return null
    }

    return (spindleHorsepower / machineHp) * 100
  }, [plannerForm.machineHp, spindleHorsepower])

  const effectiveSurfaceSpeed = useMemo(
    () =>
      spindleRpm === null
        ? null
        : calculateSurfaceSpeedSfm(spindleRpm, toNumber(plannerForm.toolDiameter)),
    [spindleRpm, plannerForm.toolDiameter],
  )

  const feedCurve = useMemo<FeedPoint[]>(() => {
    const flutes = toNumber(plannerForm.flutes)
    const chipLoad = toNumber(plannerForm.chipLoad)
    if (!Number.isFinite(flutes) || flutes <= 0 || !Number.isFinite(chipLoad) || chipLoad <= 0) {
      return []
    }

    const ctf = chipThinningFactor ?? 1
    const upperRpm =
      spindleRpm === null ? 12000 : clamp(Math.round(spindleRpm * 1.6), 6000, 22000)
    const points: FeedPoint[] = []
    const steps = 10

    for (let index = 0; index <= steps; index += 1) {
      const rpm = 1000 + ((upperRpm - 1000) * index) / steps
      const feed = rpm * flutes * chipLoad * ctf
      points.push({ rpm, feed })
    }

    return points
  }, [plannerForm.flutes, plannerForm.chipLoad, chipThinningFactor, spindleRpm])

  const feedCurveSvg = useMemo(() => {
    if (feedCurve.length === 0) {
      return ''
    }

    const maxFeed = Math.max(...feedCurve.map((point) => point.feed))
    const xSpan = VIEWBOX_WIDTH - CHART_PADDING * 2
    const ySpan = VIEWBOX_HEIGHT - CHART_PADDING * 2

    return feedCurve
      .map((point, index) => {
        const x = CHART_PADDING + (xSpan * index) / (feedCurve.length - 1)
        const y = VIEWBOX_HEIGHT - CHART_PADDING - (point.feed / maxFeed) * ySpan
        return `${x},${y}`
      })
      .join(' ')
  }, [feedCurve])

  const engagementPercent = useMemo(() => {
    const radialWidth = toNumber(plannerForm.radialWidth)
    const toolDiameter = toNumber(plannerForm.toolDiameter)
    if (!Number.isFinite(radialWidth) || !Number.isFinite(toolDiameter) || toolDiameter <= 0) {
      return null
    }

    return clamp((radialWidth / toolDiameter) * 100, 0, 100)
  }, [plannerForm.radialWidth, plannerForm.toolDiameter])

  return (
    <section className="card" id="process-planner" aria-labelledby="planner-title">
      <div className="section-header">
        <h2 id="planner-title">Advanced Process Planner</h2>
        <p>
          Plan a milling operation end-to-end with chip thinning compensation, cycle time, and
          spindle load estimates.
        </p>
      </div>

      <div className="planner-grid">
        <article className="planner-form">
          <h3>Operation Inputs</h3>
          <label>
            Material
            <select
              value={plannerForm.material}
              onChange={(event) => {
                const nextMaterial = materialData.find((item) => item.material === event.target.value)
                const nextSfm = nextMaterial ? parseSfmMidpoint(nextMaterial.sfmRange) : 300
                setPlannerForm((previous) => ({
                  ...previous,
                  material: event.target.value,
                  targetSfm: String(nextSfm),
                }))
              }}
            >
              {materialData.map((item) => (
                <option key={item.material} value={item.material}>
                  {item.material}
                </option>
              ))}
            </select>
          </label>
          <div className="input-grid two-col">
            <label>
              Target SFM
              <input
                inputMode="decimal"
                value={plannerForm.targetSfm}
                onChange={(event) =>
                  setPlannerForm((previous) => ({ ...previous, targetSfm: event.target.value }))
                }
              />
            </label>
            <label>
              Tool Diameter (in)
              <input
                inputMode="decimal"
                value={plannerForm.toolDiameter}
                onChange={(event) =>
                  setPlannerForm((previous) => ({ ...previous, toolDiameter: event.target.value }))
                }
              />
            </label>
            <label>
              Flutes
              <input
                inputMode="numeric"
                value={plannerForm.flutes}
                onChange={(event) =>
                  setPlannerForm((previous) => ({ ...previous, flutes: event.target.value }))
                }
              />
            </label>
            <label>
              Chip Load (in/tooth)
              <input
                inputMode="decimal"
                value={plannerForm.chipLoad}
                onChange={(event) =>
                  setPlannerForm((previous) => ({ ...previous, chipLoad: event.target.value }))
                }
              />
            </label>
            <label>
              Radial Width / Ae (in)
              <input
                inputMode="decimal"
                value={plannerForm.radialWidth}
                onChange={(event) =>
                  setPlannerForm((previous) => ({ ...previous, radialWidth: event.target.value }))
                }
              />
            </label>
            <label>
              Axial Depth / Ap (in)
              <input
                inputMode="decimal"
                value={plannerForm.axialDepth}
                onChange={(event) =>
                  setPlannerForm((previous) => ({ ...previous, axialDepth: event.target.value }))
                }
              />
            </label>
            <label>
              Toolpath Length (in)
              <input
                inputMode="decimal"
                value={plannerForm.toolpathLength}
                onChange={(event) =>
                  setPlannerForm((previous) => ({ ...previous, toolpathLength: event.target.value }))
                }
              />
            </label>
            <label>
              Machine Available HP
              <input
                inputMode="decimal"
                value={plannerForm.machineHp}
                onChange={(event) =>
                  setPlannerForm((previous) => ({ ...previous, machineHp: event.target.value }))
                }
              />
            </label>
          </div>
        </article>

        <article className="planner-output">
          <h3>Calculated Plan</h3>
          <dl className="result-grid">
            <div>
              <dt>Recommended RPM</dt>
              <dd>{formatValue(spindleRpm, 0)}</dd>
            </div>
            <div>
              <dt>Base Feed Rate</dt>
              <dd>{formatValue(baseFeedRate, 2, ' IPM')}</dd>
            </div>
            <div>
              <dt>Chip Thinning Factor</dt>
              <dd>{formatValue(chipThinningFactor, 3, ' x')}</dd>
            </div>
            <div>
              <dt>Adjusted Feed Rate</dt>
              <dd>{formatValue(adjustedFeedRate, 2, ' IPM')}</dd>
            </div>
            <div>
              <dt>Material Removal Rate</dt>
              <dd>{formatValue(materialRemovalRate, 3, ' in³/min')}</dd>
            </div>
            <div>
              <dt>Estimated Cycle Time</dt>
              <dd>{formatValue(cycleTimeMinutes, 2, ' min')}</dd>
            </div>
            <div>
              <dt>Estimated Spindle HP</dt>
              <dd>{formatValue(spindleHorsepower, 2, ' hp')}</dd>
            </div>
            <div>
              <dt>Estimated Torque</dt>
              <dd>{formatValue(spindleTorque, 2, ' ft-lb')}</dd>
            </div>
            <div>
              <dt>Effective Surface Speed</dt>
              <dd>{formatValue(effectiveSurfaceSpeed, 0, ' SFM')}</dd>
            </div>
          </dl>
          <p className="result-note">
            Unit power model uses <strong>{selectedMaterial.unitPowerHpPerIn3Min} hp/in³/min</strong>{' '}
            for {selectedMaterial.material}. Use this as a planning estimate, then validate at the
            machine.
          </p>
        </article>
      </div>

      <div className="visual-grid">
        <article className="visual-card">
          <h3>Feed vs. Spindle Speed Curve</h3>
          {feedCurve.length > 0 ? (
            <>
              <svg
                role="img"
                aria-label="Line chart of feed rate against spindle speed"
                viewBox={`0 0 ${VIEWBOX_WIDTH} ${VIEWBOX_HEIGHT}`}
                className="chart-svg"
              >
                <line
                  x1={CHART_PADDING}
                  y1={VIEWBOX_HEIGHT - CHART_PADDING}
                  x2={VIEWBOX_WIDTH - CHART_PADDING}
                  y2={VIEWBOX_HEIGHT - CHART_PADDING}
                  className="chart-axis"
                />
                <line
                  x1={CHART_PADDING}
                  y1={CHART_PADDING}
                  x2={CHART_PADDING}
                  y2={VIEWBOX_HEIGHT - CHART_PADDING}
                  className="chart-axis"
                />
                <polyline points={feedCurveSvg} className="chart-line" />
              </svg>
              <p className="visual-caption">
                At current flute/chip-load settings, higher RPM increases required feed linearly.
              </p>
            </>
          ) : (
            <p className="visual-caption">Enter valid flute and chip-load values to render the chart.</p>
          )}
        </article>

        <article className="visual-card">
          <h3>Radial Engagement + Spindle Load</h3>
          <div className="engagement-wrap">
            <p className="meter-label">Radial engagement (Ae / D)</p>
            <div className="meter-track">
              <div
                className="meter-fill"
                style={{ width: `${engagementPercent === null ? 0 : engagementPercent}%` }}
              />
            </div>
            <p className="meter-value">
              {engagementPercent === null
                ? 'Enter valid width and diameter'
                : `${engagementPercent.toFixed(1)}% of tool diameter`}
            </p>
          </div>

          <div className="engagement-wrap">
            <p className="meter-label">Estimated spindle load</p>
            <div className="meter-track">
              <div
                className="meter-fill meter-fill-warn"
                style={{ width: `${spindleLoadPercent === null ? 0 : clamp(spindleLoadPercent, 0, 100)}%` }}
              />
            </div>
            <p className="meter-value">
              {spindleLoadPercent === null
                ? 'Enter valid machine HP and operation values'
                : `${spindleLoadPercent.toFixed(1)}% of available spindle power`}
            </p>
          </div>
        </article>
      </div>
    </section>
  )
}

export default ProcessPlanner
