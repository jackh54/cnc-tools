const sfmData: { material: string; hss: string; carbide: string }[] = [
  { material: 'Aluminum (soft)', hss: '250–400', carbide: '800–1500' },
  { material: 'Aluminum (hard)', hss: '150–250', carbide: '400–800' },
  { material: 'Brass', hss: '150–300', carbide: '400–800' },
  { material: 'Bronze', hss: '80–150', carbide: '200–400' },
  { material: 'Cast Iron', hss: '60–100', carbide: '250–600' },
  { material: 'Mild Steel', hss: '80–120', carbide: '350–800' },
  { material: 'Stainless Steel', hss: '40–80', carbide: '150–350' },
  { material: 'Tool Steel', hss: '40–70', carbide: '100–250' },
  { material: 'Titanium', hss: '20–40', carbide: '40–150' },
  { material: 'Plastics', hss: '200–400', carbide: '400–1000' },
]

export function SfmReference() {
  return (
    <div className="space-y-4">
      <h3 className="font-display font-semibold text-zinc-100">SFM Reference (Surface Feet/Min)</h3>
      <p className="text-sm text-zinc-400">
        Starting values for cutting speed. Adjust for tool condition, rigidity, and coolant.
      </p>
      <div className="overflow-x-auto -mx-2">
        <table className="w-full min-w-[300px] text-sm">
          <thead>
            <tr className="border-b border-zinc-700">
              <th className="text-left py-2 px-2 font-medium text-zinc-300">Material</th>
              <th className="text-left py-2 px-2 font-medium text-zinc-300">HSS</th>
              <th className="text-left py-2 px-2 font-medium text-zinc-300">Carbide</th>
            </tr>
          </thead>
          <tbody>
            {sfmData.map((row) => (
              <tr key={row.material} className="border-b border-zinc-800 hover:bg-zinc-800/30">
                <td className="py-2 px-2 text-zinc-100">{row.material}</td>
                <td className="py-2 px-2 font-mono text-amber-400">{row.hss}</td>
                <td className="py-2 px-2 font-mono text-amber-400">{row.carbide}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
