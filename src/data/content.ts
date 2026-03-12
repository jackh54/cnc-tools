export type Skill = {
  title: string
  level: 'Foundational' | 'Core' | 'Advanced'
  description: string
  checklist: string[]
}

export type ToolItem = {
  name: string
  category: string
  summary: string
  quickTip: string
}

export type MaterialSurfaceSpeed = {
  material: string
  tooling: string
  sfmRange: string
  coolant: string
  unitPowerHpPerIn3Min: number
}

export type CncCodeReference = {
  code: string
  group: 'Motion' | 'Compensation' | 'Cycles' | 'Machine'
  description: string
  usage: string
}

export const skills: Skill[] = [
  {
    title: 'Machine Setup and Work Offsets',
    level: 'Foundational',
    description:
      'Set accurate work offsets, define safe clearance heights, and verify machine position before any cut.',
    checklist: [
      'Confirm stock orientation and clamping torque',
      'Set G54 (or active work offset) from known datum',
      'Dry-run above part with single block enabled',
    ],
  },
  {
    title: 'Tooling Strategy and Tool Life',
    level: 'Core',
    description:
      'Select cutter type, flute count, and coating based on material and operation while managing wear proactively.',
    checklist: [
      'Match flute count to chip evacuation needs',
      'Track spindle load and edge wear at checkpoints',
      'Replace or regrind tools before finish quality degrades',
    ],
  },
  {
    title: 'Feeds, Speeds, and Step-Over Control',
    level: 'Core',
    description:
      'Dial in spindle speed, chip load, axial/radial engagement, and adaptive paths to maximize stability.',
    checklist: [
      'Start from material SFM baseline and adjust by rigidity',
      'Balance step-over and depth to avoid chatter',
      'Use feed override intentionally during prove-out only',
    ],
  },
  {
    title: 'Program Verification and Error Recovery',
    level: 'Advanced',
    description:
      'Read and validate posted code, identify risky moves, and recover quickly from tool breaks or offset mistakes.',
    checklist: [
      'Simulate and review rapid moves near fixtures',
      'Use optional stop at critical transitions',
      'Document restart line and safe re-entry procedure',
    ],
  },
]

export const toolbox: ToolItem[] = [
  {
    name: 'G-Code Quick Reference',
    category: 'Programming',
    summary: 'Common milling cycles, motion modes, and compensation commands in one place.',
    quickTip: 'Always verify modal states before restarting in the middle of a program.',
  },
  {
    name: 'Workholding Setup Matrix',
    category: 'Setup',
    summary: 'Fixture strategy suggestions by part geometry and operation type.',
    quickTip: 'Prioritize datum repeatability before maximizing clamp force.',
  },
  {
    name: 'Tool Library Starter',
    category: 'Tooling',
    summary: 'Starter list of roughers, finishers, drills, and chamfer mills for daily jobs.',
    quickTip: 'Store measured stick-out and holder IDs with each tool entry.',
  },
  {
    name: 'Troubleshooting Guide',
    category: 'Quality',
    summary: 'Root-cause patterns for chatter, poor finish, burrs, and size drift.',
    quickTip: 'Correlate defects to tool wear and spindle load trend, not just dimensions.',
  },
]

export const materialData: MaterialSurfaceSpeed[] = [
  {
    material: '6061 Aluminum',
    tooling: 'Carbide end mill',
    sfmRange: '600 - 1200',
    coolant: 'Flood or MQL',
    unitPowerHpPerIn3Min: 0.3,
  },
  {
    material: '1018 Mild Steel',
    tooling: 'Carbide end mill',
    sfmRange: '250 - 450',
    coolant: 'Flood preferred',
    unitPowerHpPerIn3Min: 1,
  },
  {
    material: '304 Stainless',
    tooling: 'Carbide end mill',
    sfmRange: '150 - 300',
    coolant: 'High-pressure preferred',
    unitPowerHpPerIn3Min: 1.4,
  },
  {
    material: 'Ti-6Al-4V',
    tooling: 'Variable flute carbide',
    sfmRange: '80 - 180',
    coolant: 'Through-tool',
    unitPowerHpPerIn3Min: 1.8,
  },
]

export const processChecklist = [
  'Review drawing revisions, tolerances, and critical surfaces.',
  'Verify stock dimensions and inspect for warp before setup.',
  'Load tools, check runout, and set tool length/radius offsets.',
  'Run simulation, then machine dry run above stock.',
  'Inspect first article before releasing full production run.',
]

export const codeReference: CncCodeReference[] = [
  {
    code: 'G0',
    group: 'Motion',
    description: 'Rapid positioning move',
    usage: 'Use only with verified clearances above fixtures and stock.',
  },
  {
    code: 'G1',
    group: 'Motion',
    description: 'Linear feed move',
    usage: 'Primary cutting move using active feed rate (F).',
  },
  {
    code: 'G2 / G3',
    group: 'Motion',
    description: 'Clockwise / counterclockwise arc interpolation',
    usage: 'Confirm I/J/K or R mode expected by controller post settings.',
  },
  {
    code: 'G41 / G42',
    group: 'Compensation',
    description: 'Cutter radius compensation left / right',
    usage: 'Lead in/out cleanly to avoid overtravel alarms or wall marks.',
  },
  {
    code: 'G43',
    group: 'Compensation',
    description: 'Tool length compensation positive',
    usage: 'Pair with correct H offset before every Z approach.',
  },
  {
    code: 'G81',
    group: 'Cycles',
    description: 'Simple drilling cycle',
    usage: 'Best for shallow holes where pecking is not required.',
  },
  {
    code: 'G83',
    group: 'Cycles',
    description: 'Peck drilling cycle',
    usage: 'Use for deeper holes to break chips and improve evacuation.',
  },
  {
    code: 'G84',
    group: 'Cycles',
    description: 'Tapping cycle',
    usage: 'Confirm spindle orientation and synchronized feed before production.',
  },
  {
    code: 'M6',
    group: 'Machine',
    description: 'Tool change',
    usage: 'Validate preload and pot assignment in setup sheet.',
  },
  {
    code: 'M8 / M9',
    group: 'Machine',
    description: 'Coolant on / off',
    usage: 'Verify coolant state before entering deep pockets or drilling.',
  },
  {
    code: 'M30',
    group: 'Machine',
    description: 'Program end and rewind',
    usage: 'Ensure safe machine state before cycle repeats automatically.',
  },
]
