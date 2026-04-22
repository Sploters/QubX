import Link from 'next/link'

export default function HomePage() {
  return (
    <div className="relative min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center px-4 text-center">
      {/* Decorative glow */}
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full opacity-10 blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(circle, #8b5cf6, #06b6d4)' }}
      />

      <div className="relative z-10 max-w-2xl">
        <p className="text-sm font-medium text-cyan tracking-widest uppercase mb-4">
          Portal Educativo
        </p>

        <h1 className="text-5xl md:text-6xl font-bold text-text-primary mb-6 leading-tight">
          Bem-vindo ao{' '}
          <span className="text-transparent bg-clip-text"
            style={{ backgroundImage: 'linear-gradient(135deg, #8b5cf6, #06b6d4)' }}>
            QubX
          </span>
        </h1>

        <p className="text-lg text-text-secondary mb-10 max-w-xl mx-auto">
          Explore a Computação Quântica do zero ao nível técnico. Uma trilha progressiva
          construída a partir de pesquisa acadêmica real.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/trilha"
            className="inline-block px-8 py-3 rounded-lg font-semibold text-white no-underline transition-all hover:opacity-90 hover:scale-[1.02]"
            style={{ background: 'linear-gradient(135deg, #8b5cf6, #06b6d4)' }}
          >
            Começar trilha
          </Link>
          <Link
            href="/modulo/01-o-que-e-computacao-quantica"
            className="inline-block px-8 py-3 rounded-lg font-semibold text-text-secondary border border-border hover:border-purple hover:text-purple no-underline transition-all"
          >
            Primeiro módulo →
          </Link>
        </div>

        <div className="mt-16 grid grid-cols-3 gap-8 text-center">
          {[
            { label: 'Módulos', value: '6' },
            { label: 'Nível', value: 'Zero ao técnico' },
            { label: 'Acesso', value: 'Gratuito' },
          ].map(({ label, value }) => (
            <div key={label}>
              <div className="text-2xl font-bold text-purple">{value}</div>
              <div className="text-sm text-text-muted mt-1">{label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
