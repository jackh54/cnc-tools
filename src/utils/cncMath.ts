const RPM_FACTOR = 3.82
const MM_TO_IN = 0.0393701

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
