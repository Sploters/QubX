'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import type { Module } from '@/lib/modules'

interface ModuleCardProps {
  module: Module
  visited: boolean
  index: number
}

export function ModuleCard({ module, visited, index }: ModuleCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
    >
      <Link
        href={`/modulo/${module.slug}`}
        className={`group block p-5 rounded-2xl border transition-all duration-300 no-underline ${
          visited
            ? 'bg-accent-orange/5 border-accent-orange/20 hover:border-accent-orange/40'
            : 'bg-surface border-border hover:border-accent-cyan/30 hover:bg-elevated'
        }`}
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-4">
            <span
              className={`flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold font-display transition-all duration-300 ${
                visited
                  ? 'bg-gradient-to-br from-accent-orange to-accent-pink text-white shadow-lg shadow-accent-orange/20'
                  : 'bg-elevated text-text-muted border border-border group-hover:border-accent-cyan/30'
              }`}
            >
              {visited ? (
                <svg width="18" height="18" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" />
                </svg>
              ) : (
                String(module.order).padStart(2, '0')
              )}
            </span>
            <div>
              <h3 className={`font-display font-semibold transition-colors ${
                visited ? 'text-accent-orange' : 'text-text-primary group-hover:text-accent-cyan'
              }`}>
                {module.title}
              </h3>
              <p className="text-sm text-text-secondary mt-1 leading-relaxed line-clamp-2">
                {module.description}
              </p>
            </div>
          </div>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-text-muted group-hover:text-accent-cyan transition-colors flex-shrink-0 mt-1">
            <path d="M7 3l7 7-7 7" />
          </svg>
        </div>
      </Link>
    </motion.div>
  )
}
