'use client'

import Link from 'next/link'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const navLinks = [
  { href: '/trilha', label: 'Trilha' },
  { href: '/modulo/00-a-genese-do-mundo-quantico', label: 'Módulos' },
]

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="absolute inset-0 bg-background/70 backdrop-blur-xl border-b border-white/5" />
      <div className="relative mx-auto max-w-6xl px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 no-underline group">
          <span className="text-xl font-display font-bold text-text-primary">
            Qub<span className="text-gradient">X</span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-1" aria-label="Principal">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="px-4 py-2 rounded-lg text-sm font-medium text-text-secondary hover:text-text-primary hover:bg-white/5 transition-all no-underline"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/trilha"
            className="ml-2 btn-primary text-sm px-4 py-2 no-underline"
          >
            Começar
          </Link>
        </nav>

        <button
          type="button"
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden w-10 h-10 rounded-lg flex items-center justify-center text-text-secondary hover:text-text-primary hover:bg-white/5 transition-all"
          aria-label="Abrir menu"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2">
            {mobileOpen ? (
              <path d="M5 5l10 10M15 5l-10 10" />
            ) : (
              <path d="M3 5h14M3 10h14M3 15h14" />
            )}
          </svg>
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="md:hidden absolute top-full left-0 right-0 bg-surface/95 backdrop-blur-xl border-b border-white/5"
          >
            <nav className="p-4 flex flex-col gap-1" aria-label="Navegação móvel">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="px-4 py-3 rounded-lg text-sm font-medium text-text-secondary hover:text-text-primary hover:bg-white/5 transition-all no-underline"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/trilha"
                onClick={() => setMobileOpen(false)}
                className="btn-primary text-sm mt-2 no-underline"
              >
                Começar Jornada
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
