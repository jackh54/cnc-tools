const tapDrillData: { tap: string; tpi: number; close: string; closeDec: string; free: string; freeDec: string }[] = [
  { tap: '#4-40', tpi: 40, close: '#43', closeDec: '0.0890', free: '#42', freeDec: '0.0935' },
  { tap: '#5-40', tpi: 40, close: '#38', closeDec: '0.1015', free: '#37', freeDec: '0.1040' },
  { tap: '#6-32', tpi: 32, close: '#36', closeDec: '0.1065', free: '#33', freeDec: '0.1130' },
  { tap: '#8-32', tpi: 32, close: '#29', closeDec: '0.1360', free: '#28', freeDec: '0.1405' },
  { tap: '#10-24', tpi: 24, close: '#25', closeDec: '0.1495', free: '#21', freeDec: '0.1590' },
  { tap: '#10-32', tpi: 32, close: '#21', closeDec: '0.1590', free: '#20', freeDec: '0.1610' },
  { tap: '1/4"-20', tpi: 20, close: '#7', closeDec: '0.2010', free: '#1', freeDec: '0.2280' },
  { tap: '1/4"-28', tpi: 28, close: '#3', closeDec: '0.2130', free: '7/32', freeDec: '0.2188' },
  { tap: '5/16"-18', tpi: 18, close: 'F', closeDec: '0.2570', free: '17/64', freeDec: '0.2656' },
  { tap: '5/16"-24', tpi: 24, close: 'I', closeDec: '0.2720', free: '9/32', freeDec: '0.2812' },
  { tap: '3/8"-16', tpi: 16, close: '5/16', closeDec: '0.3125', free: '21/64', freeDec: '0.3281' },
  { tap: '3/8"-24', tpi: 24, close: 'Q', closeDec: '0.3320', free: '11/32', freeDec: '0.3438' },
  { tap: '7/16"-14', tpi: 14, close: 'U', closeDec: '0.3680', free: '25/64', freeDec: '0.3906' },
  { tap: '7/16"-20', tpi: 20, close: '25/64', closeDec: '0.3906', free: '13/32', freeDec: '0.4062' },
  { tap: '1/2"-13', tpi: 13, close: '27/64', closeDec: '0.4219', free: '7/16', freeDec: '0.4375' },
  { tap: '1/2"-20', tpi: 20, close: '29/64', closeDec: '0.4531', free: '15/32', freeDec: '0.4688' },
  { tap: '5/8"-11', tpi: 11, close: '17/32', closeDec: '0.5312', free: '9/16', freeDec: '0.5625' },
  { tap: '5/8"-18', tpi: 18, close: '37/64', closeDec: '0.5781', free: '19/32', freeDec: '0.5938' },
  { tap: '3/4"-10', tpi: 10, close: '21/32', closeDec: '0.6562', free: '11/16', freeDec: '0.6875' },
  { tap: '3/4"-16', tpi: 16, close: '11/16', closeDec: '0.6875', free: '23/32', freeDec: '0.7188' },
]

export function TapDrillChart() {
  return (
    <div className="space-y-4">
      <h3 className="font-display font-semibold text-zinc-100">Tap Drill Chart</h3>
      <p className="text-sm text-zinc-400">
        Close fit: ~75% thread (aluminum, brass, plastics). Free fit: ~50% thread (steel, stainless).
      </p>
      <div className="overflow-x-auto -mx-2">
        <table className="w-full min-w-[400px] text-sm">
          <thead>
            <tr className="border-b border-zinc-700">
              <th className="text-left py-2 px-2 font-medium text-zinc-300">Tap</th>
              <th className="text-left py-2 px-2 font-medium text-zinc-300">TPI</th>
              <th className="text-left py-2 px-2 font-medium text-zinc-300">Close Drill</th>
              <th className="text-left py-2 px-2 font-medium text-zinc-300">Close (in)</th>
              <th className="text-left py-2 px-2 font-medium text-zinc-300">Free Drill</th>
              <th className="text-left py-2 px-2 font-medium text-zinc-300">Free (in)</th>
            </tr>
          </thead>
          <tbody>
            {tapDrillData.map((row) => (
              <tr key={row.tap} className="border-b border-zinc-800 hover:bg-zinc-800/30">
                <td className="py-2 px-2 font-mono text-zinc-100">{row.tap}</td>
                <td className="py-2 px-2 text-zinc-400">{row.tpi}</td>
                <td className="py-2 px-2 font-mono text-amber-400">{row.close}</td>
                <td className="py-2 px-2 text-zinc-400">{row.closeDec}</td>
                <td className="py-2 px-2 font-mono text-amber-400">{row.free}</td>
                <td className="py-2 px-2 text-zinc-400">{row.freeDec}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
