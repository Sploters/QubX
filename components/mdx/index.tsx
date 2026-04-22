'use client'

import React, { useState } from 'react'
import { GLOSSARY } from '@/lib/glossary'

interface TermProps {
  id: string
  children?: React.ReactNode
}

export function Term({ id, children }: TermProps) {
  const [isVisible, setIsVisible] = useState(false)
  const entry = GLOSSARY[id]

  if (!entry) {
    return <span className="text-red-500 font-bold underline decoration-dotted">{children || id}</span>
  }

  return (
    <span 
      className="relative group cursor-help inline-block"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      <span className="text-purple border-b border-purple/40 font-medium hover:border-purple transition-all">
        {children || entry.term}
      </span>
      
      {isVisible && (
        <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 p-3 bg-surface border border-border rounded-lg shadow-xl z-50 text-xs text-text-secondary animate-in fade-in slide-in-from-bottom-1 duration-200">
          <strong className="block text-text-primary mb-1">{entry.term}</strong>
          {entry.definition}
          <span className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-surface" />
        </span>
      )}
    </span>
  )
}

export function Callout({ children, type = 'info', title }: { children: React.ReactNode, type?: 'info' | 'warning' | 'tip' | 'deep-dive', title?: string }) {
  const styles = {
    info: {
      bg: 'bg-cyan/10',
      border: 'border-cyan/30',
      icon: '💡',
      text: 'text-cyan-light'
    },
    warning: {
      bg: 'bg-red-500/10',
      border: 'border-red-500/30',
      icon: '⚠️',
      text: 'text-red-400'
    },
    tip: {
      bg: 'bg-purple/10',
      border: 'border-purple/30',
      icon: '✨',
      text: 'text-purple-light'
    },
    'deep-dive': {
      bg: 'bg-slate-800/50',
      border: 'border-slate-700',
      icon: '🧪',
      text: 'text-slate-300'
    }
  }[type]

  return (
    <div className={`my-6 p-4 rounded-xl border ${styles.bg} ${styles.border} relative overflow-hidden group`}>
      <div className="flex gap-3">
        <span className="text-xl flex-shrink-0">{styles.icon}</span>
        <div>
          {title && <h4 className={`text-sm font-bold uppercase tracking-wider mb-1 ${styles.text}`}>{title}</h4>}
          <div className="text-sm text-text-secondary leading-relaxed m-0">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}

export function GlossaryIndex({ terms }: { terms: string[] }) {
  return (
    <div className="mt-12 p-6 rounded-xl border border-border bg-surface/30">
      <h3 className="text-lg font-bold text-text-primary mb-4 flex items-center gap-2">
        <span className="text-purple">#</span> Glossário do Módulo
      </h3>
      <dl className="grid gap-4 sm:grid-cols-2">
        {terms.map(id => {
          const entry = GLOSSARY[id]
          if (!entry) return null
          return (
            <div key={id} className="border-l-2 border-purple/20 pl-4">
              <dt className="text-sm font-bold text-purple-light mb-1">{entry.term}</dt>
              <dd className="text-xs text-text-secondary leading-relaxed">{entry.definition}</dd>
            </div>
          )
        })}
      </dl>
    </div>
  )
}
