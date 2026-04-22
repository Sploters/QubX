'use client'

import Link from 'next/link'
import { useState } from 'react'
import { MODULES } from '@/lib/modules'

interface SidebarProps {
  currentSlug: string
  visited: Set<string>
}

export function Sidebar({ currentSlug, visited }: SidebarProps) {
  const [open, setOpen] = useState(false)

  return (
    <>
      {/* Mobile toggle */}
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="lg:hidden fixed bottom-6 right-6 z-40 w-12 h-12 rounded-full flex items-center justify-center text-white shadow-lg"
        style={{ background: 'linear-gradient(135deg, #8b5cf6, #06b6d4)' }}
        aria-label="Toggle menu"
      >
        {open ? '✕' : '☰'}
      </button>

      {/* Overlay on mobile */}
      {open && (
        <div
          className="lg:hidden fixed inset-0 bg-black/60 z-30"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar panel */}
      <aside
        className={`
          fixed top-16 right-0 h-[calc(100vh-4rem)] w-64 z-30
          bg-surface border-l border-border overflow-y-auto
          transition-transform duration-200
          ${open ? 'translate-x-0' : 'translate-x-full'}
          lg:translate-x-0 lg:static lg:h-auto lg:w-56 lg:border-l-0 lg:bg-transparent
        `}
      >
        <div className="p-4">
          <p className="text-xs font-medium text-text-muted uppercase tracking-widest mb-3">
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
                    flex items-center gap-2 px-3 py-2 rounded-lg text-sm no-underline transition-all
                    ${isCurrent
                      ? 'bg-purple/20 text-purple font-medium'
                      : 'text-text-secondary hover:text-text-primary hover:bg-border/40'
                    }
                  `}
                >
                  <span
                    className={`w-5 h-5 rounded-full flex items-center justify-center text-xs flex-shrink-0 ${
                      isVisited ? 'bg-purple text-white' : 'border border-border text-text-muted'
                    }`}
                  >
                    {isVisited ? '✓' : module.order}
                  </span>
                  <span className="truncate">{module.title}</span>
                </Link>
              )
            })}
          </nav>
        </div>
      </aside>
    </>
  )
}
