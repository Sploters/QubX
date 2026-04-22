import Link from 'next/link'
import type { Module } from '@/lib/modules'

interface ModuleCardProps {
  module: Module
  visited: boolean
}

export function ModuleCard({ module, visited }: ModuleCardProps) {
  return (
    <Link
      href={`/modulo/${module.slug}`}
      className="group block p-6 rounded-xl border border-border bg-surface hover:border-purple transition-all no-underline"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <span
            className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold"
            style={{
              background: visited
                ? 'linear-gradient(135deg, #8b5cf6, #06b6d4)'
                : 'transparent',
              border: visited ? 'none' : '1px solid #1e1e30',
              color: visited ? 'white' : '#475569',
            }}
          >
            {visited ? '✓' : module.order}
          </span>
          <h3 className="text-text-primary group-hover:text-purple transition-colors font-semibold">
            {module.title}
          </h3>
        </div>
        <span className="text-text-muted text-sm flex-shrink-0 mt-1">→</span>
      </div>
      <p className="text-text-secondary text-sm mt-3 ml-11 leading-relaxed">
        {module.description}
      </p>
    </Link>
  )
}
