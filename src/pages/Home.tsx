type Page = 'home' | 'calculators' | 'skills' | 'tools'

interface HomeProps {
  onNavigate: (page: Page) => void
}

const sections = [
  {
    id: 'calculators' as const,
    title: 'Calculators',
    description: 'Feed rate, spindle speed, chip load, MRR, and cutting time.',
    icon: '∑',
  },
  {
    id: 'skills' as const,
    title: 'Skills',
    description: 'Learn CNC milling fundamentals, G-code, workholding, and safety.',
    icon: '📚',
  },
  {
    id: 'tools' as const,
    title: 'Tools',
    description: 'Unit converters, decimal/fraction charts, tap drill reference.',
    icon: '🔧',
  },
]

export function Home({ onNavigate }: HomeProps) {
  return (
    <div className="space-y-12">
      <section className="text-center">
        <h2 className="font-display text-3xl font-bold tracking-tight text-zinc-100 sm:text-4xl">
          CNC Milling Reference
        </h2>
        <p className="mt-3 text-lg text-zinc-400 max-w-2xl mx-auto">
          Calculators, skills, and tools for CNC mill machining. Mobile-friendly, dark mode, built for the shop floor.
        </p>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {sections.map(({ id, title, description, icon }) => (
          <button
            key={id}
            onClick={() => onNavigate(id)}
            className="group rounded-xl border border-zinc-800 bg-zinc-900/50 p-6 text-left transition-colors hover:border-amber-500/40 hover:bg-zinc-900"
          >
            <span className="text-2xl">{icon}</span>
            <h3 className="mt-3 font-display font-semibold text-zinc-100 group-hover:text-amber-400">
              {title}
            </h3>
            <p className="mt-1 text-sm text-zinc-400">{description}</p>
          </button>
        ))}
      </section>
    </div>
  )
}
