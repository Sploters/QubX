import Link from 'next/link'

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/80 backdrop-blur-sm">
      <div className="mx-auto max-w-6xl px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 no-underline">
          <span className="text-xl font-bold text-text-primary">
            Qub<span className="text-purple">X</span>
          </span>
        </Link>
        <nav>
          <Link
            href="/trilha"
            className="text-sm font-medium text-text-secondary hover:text-purple transition-colors no-underline"
          >
            Trilha de aprendizado
          </Link>
        </nav>
      </div>
    </header>
  )
}
