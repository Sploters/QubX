import Link from 'next/link'
import { StatsSection } from '@/components/StatsSection'
import { FeatureCards } from '@/components/FeatureCards'
import { CtaSection } from '@/components/CtaSection'
import { BackgroundParticles } from '@/components/BackgroundParticles'

export default function HomePage() {
  return (
    <div className="relative">
      <BackgroundParticles />
      {/* Hero Section */}
      <section className="relative min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center px-4 text-center overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent-orange/10 rounded-full blur-[120px] animate-pulse-glow" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent-cyan/10 rounded-full blur-[100px] animate-pulse-glow" style={{ animationDelay: '-1.5s' }} />
        </div>

        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent-cyan/10 border border-accent-cyan/20 text-accent-cyan text-xs font-medium mb-6">
            <span className="w-2 h-2 rounded-full bg-accent-cyan animate-pulse" />
            Portal Educativo — Gratuito
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-text-primary mb-6 leading-tight">
            Bem-vindo ao{' '}
            <span className="text-gradient">QubX</span>
          </h1>

          <p className="text-lg md:text-xl text-text-secondary mb-10 max-w-xl mx-auto leading-relaxed">
            Explore a Computação Quântica do zero ao nível técnico.
            Uma trilha progressiva com animações, interatividade e
            conteúdo construído a partir de pesquisa acadêmica real.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/trilha" className="btn-primary text-lg no-underline">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                <path d="M3 3l14 7-14 7V3z" />
              </svg>
              Começar Trilha
            </Link>
            <Link
              href="/modulo/00-a-genese-do-mundo-quantico"
              className="btn-secondary text-lg no-underline"
            >
              Primeiro Módulo →
            </Link>
          </div>

          <div className="mt-12 flex items-center justify-center gap-8 text-sm text-text-muted">
            <span className="flex items-center gap-1.5">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" className="text-accent-orange"><circle cx="8" cy="8" r="8" /></svg>
              11 módulos
            </span>
            <span className="flex items-center gap-1.5">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" className="text-accent-cyan"><circle cx="8" cy="8" r="8" /></svg>
              Zero ao técnico
            </span>
            <span className="flex items-center gap-1.5">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" className="text-accent-pink"><circle cx="8" cy="8" r="8" /></svg>
              Gratuito
            </span>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-text-muted">
            <path d="M7 13l5 5 5-5M7 6l5 5 5-5" />
          </svg>
        </div>
      </section>

      <StatsSection />
      <FeatureCards />
      <CtaSection />
    </div>
  )
}
