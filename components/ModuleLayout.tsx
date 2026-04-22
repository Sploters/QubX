'use client'

import Link from 'next/link'
import { useEffect } from 'react'
import type { Module } from '@/lib/modules'
import { Sidebar } from './Sidebar'
import { useProgress } from '@/hooks/useProgress'

interface ModuleLayoutProps {
  module: Module
  prev: Module | null
  next: Module | null
  children: React.ReactNode
}

export function ModuleLayout({ module, prev, next, children }: ModuleLayoutProps) {
  const { visited, markVisited } = useProgress()

  useEffect(() => {
    markVisited(module.slug)
  }, [module.slug, markVisited])

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <div className="flex gap-8">
        {/* Main content */}
        <article className="flex-1 min-w-0">
          {/* Module header */}
          <div className="mb-8">
            <Link href="/trilha" className="text-sm text-text-muted hover:text-purple no-underline">
              ← Trilha
            </Link>
            <div className="flex items-center gap-3 mt-3">
              <span
                className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-white flex-shrink-0"
                style={{ background: 'linear-gradient(135deg, #8b5cf6, #06b6d4)' }}
              >
                {module.order}
              </span>
              <h1 className="text-3xl font-bold text-text-primary">{module.title}</h1>
            </div>
            <p className="text-text-secondary mt-3 ml-11">{module.description}</p>
          </div>

          {/* MDX content */}
          <div className="prose prose-invert max-w-none
            prose-headings:text-text-primary prose-headings:font-semibold
            prose-p:text-text-secondary prose-p:leading-relaxed
            prose-a:text-purple prose-a:no-underline hover:prose-a:text-purple-light
            prose-code:text-cyan prose-code:bg-surface prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm
            prose-pre:bg-surface prose-pre:border prose-pre:border-border
            prose-img:rounded-xl prose-img:border prose-img:border-border prose-img:w-full
            prose-table:text-sm prose-th:text-text-primary prose-td:text-text-secondary
            prose-strong:text-text-primary
            prose-blockquote:border-purple prose-blockquote:text-text-secondary
          ">
            {children}
          </div>

          {/* Embedded video */}
          {module.videoUrl && (
            <div className="mt-10">
              <h2 className="text-xl font-semibold text-text-primary mb-4">Vídeo recomendado</h2>
              <div className="relative aspect-video rounded-xl overflow-hidden border border-border">
                <iframe
                  src={module.videoUrl}
                  title={`Vídeo: ${module.title}`}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full"
                  allowFullScreen
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                />
              </div>
            </div>
          )}

          {/* References */}
          {module.references && module.references.length > 0 && (
            <div className="mt-10 pt-10 border-t border-border">
              <h2 className="text-xl font-semibold text-text-primary mb-4 flex items-center gap-2">
                📚 Referências e Aprofundamento
              </h2>
              <ul className="grid gap-3 list-none p-0">
                {module.references.map((ref, i) => (
                  <li key={i} className="m-0">
                    <a 
                      href={ref.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-3 rounded-lg border border-border bg-surface/50 hover:border-purple/50 transition-all no-underline group"
                    >
                      <span className="text-xs uppercase px-2 py-1 rounded bg-border text-text-muted group-hover:text-purple group-hover:bg-purple/10 transition-colors">
                        {ref.type}
                      </span>
                      <span className="text-sm text-text-secondary group-hover:text-text-primary transition-colors">
                        {ref.title}
                      </span>
                      <span className="ml-auto text-text-muted opacity-0 group-hover:opacity-100 transition-opacity">↗</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Prev / Next navigation */}
          <nav aria-label="Navegação entre módulos" className="mt-12 flex gap-4">
            {prev ? (
              <Link
                href={`/modulo/${prev.slug}`}
                className="flex-1 p-4 rounded-xl border border-border bg-surface hover:border-purple transition-all no-underline group"
              >
                <div className="text-xs text-text-muted mb-1">← Anterior</div>
                <div className="text-sm font-medium text-text-primary group-hover:text-purple transition-colors">
                  {prev.title}
                </div>
              </Link>
            ) : (
              <div className="flex-1 p-4 rounded-xl border border-border bg-surface/50">
                <div className="text-xs text-text-muted mb-1">Início da trilha</div>
                <Link href="/trilha" className="text-sm font-medium text-purple no-underline">
                  Ver todos os módulos →
                </Link>
              </div>
            )}

            {next ? (
              <Link
                href={`/modulo/${next.slug}`}
                className="flex-1 p-4 rounded-xl border border-border bg-surface hover:border-purple transition-all no-underline text-right group"
              >
                <div className="text-xs text-text-muted mb-1">Próximo →</div>
                <div className="text-sm font-medium text-text-primary group-hover:text-purple transition-colors">
                  {next.title}
                </div>
              </Link>
            ) : (
              <div className="flex-1 p-4 rounded-xl border border-border bg-surface/50 text-right">
                <div className="text-xs text-text-muted mb-1">Fim da trilha</div>
                <Link href="/trilha" className="text-sm font-medium text-purple no-underline">
                  Ver progresso →
                </Link>
              </div>
            )}
          </nav>
        </article>

        {/* Sidebar */}
        <div className="hidden lg:block w-56 flex-shrink-0">
          <div className="sticky top-24">
            <Sidebar currentSlug={module.slug} visited={visited} />
          </div>
        </div>
      </div>
    </div>
  )
}
