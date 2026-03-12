const RPM_FACTOR = 3.82
const MM_TO_IN = 0.0393701
const TORQUE_CONSTANT = 5252

const isPositive = (value: number): boolean => Number.isFinite(value) && value > 0

export const toNumber = (value: string): number => Number(value)

export const calculateSpindleSpeedRpm = (
  cuttingSpeedSfm: number,
  toolDiameterInches: number,
): number | null => {
  if (!isPositive(cuttingSpeedSfm) || !isPositive(toolDiameterInches)) {
    return null
  }

  return (cuttingSpeedSfm * RPM_FACTOR) / toolDiameterInches
}

export const calculateSurfaceSpeedSfm = (
  spindleRpm: number,
  toolDiameterInches: number,
): number | null => {
  if (!isPositive(spindleRpm) || !isPositive(toolDiameterInches)) {
    return null
  }

  return (spindleRpm * toolDiameterInches) / RPM_FACTOR
}

export const calculateFeedRateIpm = (
  spindleRpm: number,
  fluteCount: number,
  chipLoadInches: number,
): number | null => {
  if (!isPositive(spindleRpm) || !isPositive(fluteCount) || !isPositive(chipLoadInches)) {
    return null
  }

  return spindleRpm * fluteCount * chipLoadInches
}

export const calculateMaterialRemovalRate = (
  radialWidthInches: number,
  axialDepthInches: number,
  feedRateIpm: number,
): number | null => {
  if (!isPositive(radialWidthInches) || !isPositive(axialDepthInches) || !isPositive(feedRateIpm)) {
    return null
  }

  return radialWidthInches * axialDepthInches * feedRateIpm
}

export const calculateMetricToInches = (millimeters: number): number | null => {
  if (!isPositive(millimeters)) {
    return null
  }

  return millimeters * MM_TO_IN
}

export const calculateChipThinningFactor = (
  radialWidthInches: number,
  toolDiameterInches: number,
): number | null => {
  if (!isPositive(radialWidthInches) || !isPositive(toolDiameterInches)) {
    return null
  }

  if (radialWidthInches > toolDiameterInches) {
    return null
  }

  const engagementRatio = radialWidthInches / toolDiameterInches
  if (engagementRatio >= 0.5) {
    return 1
  }

  const denominator = 2 * Math.sqrt(engagementRatio * (1 - engagementRatio))
  if (denominator <= 0) {
    return null
  }

  return 1 / denominator
}

export const calculateCycleTimeMinutes = (
  toolpathLengthInches: number,
  feedRateIpm: number,
): number | null => {
  if (!isPositive(toolpathLengthInches) || !isPositive(feedRateIpm)) {
    return null
  }

  return toolpathLengthInches / feedRateIpm
}

export const calculateHorsepower = (
  materialRemovalRate: number,
  unitPowerHpPerIn3Min: number,
): number | null => {
  if (!isPositive(materialRemovalRate) || !isPositive(unitPowerHpPerIn3Min)) {
    return null
  }

  return materialRemovalRate * unitPowerHpPerIn3Min
}

export const calculateTorqueFtLb = (horsepower: number, spindleRpm: number): number | null => {
  if (!isPositive(horsepower) || !isPositive(spindleRpm)) {
    return null
  }

  return (horsepower * TORQUE_CONSTANT) / spindleRpm
}
