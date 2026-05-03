'use client'

import Link from 'next/link'
import { useEffect } from 'react'
import { motion } from 'framer-motion'
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
        <article className="flex-1 min-w-0">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Link
              href="/trilha"
              className="inline-flex items-center gap-1.5 text-sm text-text-muted hover:text-accent-cyan no-underline transition-colors mb-6"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M10 12l-4-4 4-4" />
              </svg>
              Voltar à trilha
            </Link>

            <div className="flex items-center gap-4 mb-3">
              <span
                className="w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold font-display text-white flex-shrink-0"
                style={{
                  background: module.order === 0
                    ? 'linear-gradient(135deg, #00D4FF, #8b5cf6)'
                    : 'linear-gradient(135deg, #FF6B35, #FF2D78)',
                }}
              >
                {String(module.order).padStart(2, '0')}
              </span>
              <h1 className="text-3xl md:text-4xl font-display font-bold text-text-primary">{module.title}</h1>
            </div>
            <p className="text-text-secondary mt-2 ml-14">{module.description}</p>
          </motion.div>

          <div className="prose-custom mt-8">
            {children}
          </div>

          {module.videoUrl && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-12"
            >
              <h2 className="text-xl font-display font-semibold text-text-primary mb-4 flex items-center gap-2">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" className="text-accent-pink">
                  <path d="M4 4l12 6-12 6V4z" />
                </svg>
                Vídeo recomendado
              </h2>
              <div className="relative aspect-video rounded-2xl overflow-hidden border border-white/5 shadow-xl">
                <iframe
                  src={module.videoUrl}
                  title={`Vídeo: ${module.title}`}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full"
                  allowFullScreen
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                />
              </div>
            </motion.div>
          )}

          {module.references && module.references.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-12 pt-10 border-t border-white/5"
            >
              <h2 className="text-xl font-display font-semibold text-text-primary mb-6 flex items-center gap-2">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-accent-cyan">
                  <path d="M5 4h10v12H5z" />
                  <path d="M8 2v4M12 2v4" />
                </svg>
                Referências e Aprofundamento
              </h2>
              <div className="grid gap-3">
                {module.references.map((ref, i) => (
                  <a
                    key={i}
                    href={ref.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-4 rounded-xl card hover:border-accent-cyan/30 hover:bg-elevated transition-all no-underline group"
                  >
                    <span className="text-xs font-medium uppercase px-2.5 py-1 rounded-lg bg-elevated text-text-muted group-hover:text-accent-cyan group-hover:bg-accent-cyan/10 transition-all">
                      {ref.type}
                    </span>
                    <span className="text-sm text-text-secondary group-hover:text-text-primary transition-colors flex-1">
                      {ref.title}
                    </span>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-text-muted opacity-0 group-hover:opacity-100 transition-all">
                      <path d="M5 3l6 6-6 6" />
                    </svg>
                  </a>
                ))}
              </div>
            </motion.div>
          )}

          <nav aria-label="Navegação entre módulos" className="mt-12 flex gap-4">
            {prev ? (
              <Link
                href={`/modulo/${prev.slug}`}
                className="flex-1 p-5 rounded-2xl card-hover no-underline group"
              >
                <div className="text-xs text-text-muted mb-1 flex items-center gap-1">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M7 3L4 6l3 3" />
                  </svg>
                  Anterior
                </div>
                <div className="text-sm font-medium text-text-primary group-hover:text-accent-cyan transition-colors">
                  {prev.title}
                </div>
              </Link>
            ) : (
              <div className="flex-1 p-5 rounded-2xl card">
                <div className="text-xs text-text-muted mb-1">Início da trilha</div>
                <Link href="/trilha" className="text-sm font-medium text-accent-cyan no-underline">
                  Ver todos os módulos →
                </Link>
              </div>
            )}

            {next ? (
              <Link
                href={`/modulo/${next.slug}`}
                className="flex-1 p-5 rounded-2xl card-hover no-underline text-right group"
              >
                <div className="text-xs text-text-muted mb-1 flex items-center justify-end gap-1">
                  Próximo
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M5 3l3 3-3 3" />
                  </svg>
                </div>
                <div className="text-sm font-medium text-text-primary group-hover:text-accent-cyan transition-colors">
                  {next.title}
                </div>
              </Link>
            ) : (
              <div className="flex-1 p-5 rounded-2xl card text-right">
                <div className="text-xs text-text-muted mb-1">Fim da trilha</div>
                <Link href="/trilha" className="text-sm font-medium text-accent-cyan no-underline">
                  Ver progresso →
                </Link>
              </div>
            )}
          </nav>
        </article>

        <div className="hidden lg:block w-56 flex-shrink-0">
          <div className="sticky top-24">
            <Sidebar currentSlug={module.slug} visited={visited} />
          </div>
        </div>
      </div>
    </div>
  )
}
