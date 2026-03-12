import { useState } from 'react'

const skills: { id: string; title: string; content: string }[] = [
  {
    id: 'basics',
    title: 'CNC Milling Basics',
    content: `CNC (Computer Numerical Control) milling uses rotating cutters to remove material from a workpiece. The machine follows G-code instructions to move the tool along programmed paths. Key concepts:
• Axes: X (left-right), Y (front-back), Z (up-down)
• Workholding: Secure the part with vises, clamps, or fixtures
• Tool changes: Automatic (ATC) or manual
• Coordinate systems: Machine zero vs. work zero (G54–G59)`,
  },
  {
    id: 'feeds-speeds',
    title: 'Feeds and Speeds',
    content: `Proper feeds and speeds extend tool life and improve surface finish.
• SFM (Surface Feet/Min): Material-dependent cutting speed
• RPM: Spindle speed = (SFM × 3.82) ÷ tool diameter
• Chip load: Material removed per tooth per revolution
• Feed rate: IPM = RPM × flutes × chip load
Start conservative and increase based on tool, material, and rigidity.`,
  },
  {
    id: 'tool-selection',
    title: 'Tool Selection',
    content: `Choose tools based on material, operation, and machine capability.
• End mills: 2–4 flutes for aluminum; 4+ for steel
• Coatings: TiN, TiAlN, TiCN for different materials
• Carbide vs HSS: Carbide for harder materials and higher speeds
• Helix angle: Higher for aluminum, lower for steel
• Tool length: Shortest possible for rigidity`,
  },
  {
    id: 'workholding',
    title: 'Workholding',
    content: `Secure parts to prevent movement and vibration.
• Vises: Parallel jaws, soft jaws for custom shapes
• Clamping: Avoid over-tightening; use step blocks and parallels
• Fixtures: For repeat runs, custom fixtures save time
• Zero point: Establish work zero consistently
• Clearance: Ensure no interference with tool paths`,
  },
  {
    id: 'gcode',
    title: 'G-Code Essentials',
    content: `Common G-codes for milling:
• G00: Rapid positioning
• G01: Linear interpolation (feed)
• G02/G03: Circular interpolation (CW/CCW)
• G17/G18/G19: XY, XZ, YZ plane selection
• G54–G59: Work coordinate offsets
• M03: Spindle on CW
• M05: Spindle stop
• F: Feed rate, S: Spindle speed`,
  },
  {
    id: 'safety',
    title: 'Safety',
    content: `Always follow shop safety practices:
• PPE: Safety glasses, hearing protection, no loose clothing
• Machine guards: Keep in place during operation
• Emergency stop: Know its location and use it when needed
• First run: Single-block mode, reduced rapid/feed override
• Chips: Use brushes, never hands; let spindle stop before handling`,
  },
]

export function Skills() {
  const [expanded, setExpanded] = useState<string | null>('basics')

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display text-2xl font-bold text-zinc-100">Skills</h2>
        <p className="mt-1 text-zinc-400">CNC milling fundamentals and best practices.</p>
      </div>

      <div className="space-y-2">
        {skills.map(({ id, title, content }) => (
          <div
            key={id}
            className="rounded-xl border border-zinc-800 bg-zinc-900/50 overflow-hidden"
          >
            <button
              onClick={() => setExpanded(expanded === id ? null : id)}
              className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-zinc-800/50 transition-colors"
            >
              <span className="font-display font-medium text-zinc-100">{title}</span>
              <span className="text-zinc-500">{expanded === id ? '−' : '+'}</span>
            </button>
            {expanded === id && (
              <div className="px-4 pb-4 pt-0">
                <pre className="whitespace-pre-wrap font-sans text-sm text-zinc-400 leading-relaxed">
                  {content}
                </pre>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
