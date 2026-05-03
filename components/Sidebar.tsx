'use client'

import Link from 'next/link'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MODULES } from '@/lib/modules'

interface SidebarProps {
  currentSlug: string
  visited: Set<string>
}

export function Sidebar({ currentSlug, visited }: SidebarProps) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="lg:hidden fixed bottom-6 right-6 z-40 w-12 h-12 rounded-xl flex items-center justify-center text-white shadow-xl btn-primary"
        aria-label="Abrir menu de módulos"
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2">
          {open ? (
            <path d="M5 5l10 10M15 5l-10 10" />
          ) : (
            <path d="M3 5h14M3 10h14M3 15h14" />
          )}
        </svg>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="lg:hidden fixed inset-0 bg-black/60 z-30"
            onClick={() => setOpen(false)}
          />
        )}
      </AnimatePresence>

      <aside
        className={`fixed top-16 right-0 h-[calc(100vh-4rem)] w-72 z-30 bg-surface/95 backdrop-blur-xl border-l border-white/5 overflow-y-auto transition-transform duration-300 ${
          open ? 'translate-x-0' : 'translate-x-full'
        } lg:translate-x-0 lg:static lg:h-auto lg:w-56 lg:border-l-0 lg:bg-transparent lg:backdrop-blur-none`}
      >
        <div className="p-4">
          <p className="text-xs font-medium text-text-muted uppercase tracking-widest mb-4 flex items-center gap-2">
            <span className="w-1 h-4 rounded-full bg-gradient-to-b from-accent-orange to-accent-pink" />
            Módulos
          </p>
          <nav aria-label="Lista de módulos" className="flex flex-col gap-1">
            {MODULES.map((module) => {
              const isCurrent = module.slug === currentSlug
              const isVisited = visited.has(module.slug)

              return (
                <Link
                  key={module.slug}
                  href={`/modulo/${module.slug}`}
                  onClick={() => setOpen(false)}
                  className={`
                    flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm no-underline transition-all duration-200 group
                    ${isCurrent
                      ? 'bg-gradient-to-r from-accent-orange/15 to-accent-pink/10 text-accent-orange font-medium border border-accent-orange/20'
                      : 'text-text-secondary hover:text-text-primary hover:bg-white/5'
                    }
                  `}
                >
                  <span
                    className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs font-medium flex-shrink-0 transition-all ${
                      isVisited
                        ? 'bg-gradient-to-br from-accent-orange to-accent-pink text-white'
                        : 'bg-elevated text-text-muted border border-border'
                    }`}
                  >
                    {isVisited ? (
                      <svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M13.78 4.22a.75.75 0 010 1.06l-7.25 7.25a.75.75 0 01-1.06 0L2.22 9.28a.75.75 0 011.06-1.06L6 10.94l6.72-6.72a.75.75 0 011.06 0z" />
                      </svg>
                    ) : (
                      String(module.order).padStart(2, '0')
                    )}
                  </span>
                  <span className={`truncate ${isCurrent ? 'text-accent-orange' : ''}`}>
                    {module.title}
                  </span>
                  {isCurrent && (
                    <span className="ml-auto w-1.5 h-1.5 rounded-full bg-accent-orange" />
                  )}
                </Link>
              )
            })}
          </nav>
        </div>
      </aside>
    </>
  )
}
