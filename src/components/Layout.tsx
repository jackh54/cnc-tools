import type { ReactNode } from 'react'

type Page = 'home' | 'calculators' | 'skills' | 'tools'

interface LayoutProps {
  children: ReactNode
  currentPage: Page
  onNavigate: (page: Page) => void
}

const navItems: { id: Page; label: string; icon: string }[] = [
  { id: 'home', label: 'Home', icon: '⌂' },
  { id: 'calculators', label: 'Calculators', icon: '∑' },
  { id: 'skills', label: 'Skills', icon: '📚' },
  { id: 'tools', label: 'Tools', icon: '🔧' },
]

export function Layout({ children, currentPage, onNavigate }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-50 border-b border-zinc-800 bg-zinc-950/95 backdrop-blur supports-[backdrop-filter]:bg-zinc-950/80">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-14 items-center justify-between">
            <h1 className="font-display text-lg font-semibold tracking-tight text-zinc-100">
              CNC Mill Hub
            </h1>
            <nav className="flex gap-1 sm:gap-2" aria-label="Main navigation">
              {navItems.map(({ id, label, icon }) => (
                <button
                  key={id}
                  onClick={() => onNavigate(id)}
                  className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors sm:px-4 ${
                    currentPage === id
                      ? 'bg-amber-500/20 text-amber-400'
                      : 'text-zinc-400 hover:bg-zinc-800 hover:text-zinc-100'
                  }`}
                  aria-current={currentPage === id ? 'page' : undefined}
                >
                  <span className="sm:hidden">{icon}</span>
                  <span className="hidden sm:inline">{label}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>
      </header>
      <main className="flex-1 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="mx-auto max-w-6xl">{children}</div>
      </main>
    </div>
  )
}
