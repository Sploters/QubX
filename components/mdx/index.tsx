'use client'

import React, { useState } from 'react'
import { GLOSSARY } from '@/lib/glossary'

interface TermProps {
  id: string
  children?: React.ReactNode
}

export * from './BitVsQubit'
export * from './SuperdenseCoding'
export * from './MazeQuantum'
export * from './BlochSphere'
export * from './EntanglementBell'
export * from './DoubleSlit'
export * from './QuantumWalk'

export { PerspectiveToggle, PerspectiveWrapper } from '@/components/PerspectiveToggle'
export { QuantumTheater, TheaterScene, TheaterAnimation, TheaterQubit, TheaterSplitScreen } from '@/components/QuantumTheater'
export { QuantumVsClassical, GroverSearchSimulation, DeutschJozsaSimulation } from '@/components/QuantumVsClassical'
export { CircuitBuilder } from '@/components/CircuitBuilder'
export { VisualDivider } from '@/components/VisualDivider'
export { ConceptBlock } from '@/components/ConceptBlock'
export { StepFlow } from '@/components/StepFlow'
export { KeyInsight } from '@/components/KeyInsight'

export function Term({ id, children }: TermProps) {
  const [isVisible, setIsVisible] = useState(false)
  const entry = GLOSSARY[id]

  if (!entry) {
    return <span className="text-red-500 font-bold underline decoration-dotted">{children || id}</span>
  }

  const content = (
    <>
      <strong className="block text-text-primary mb-1">{entry.term}</strong>
      {entry.definition}
      <span className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-surface" />
    </>
  )

  return (
    <span
      className="relative group cursor-help inline-block"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      <span className="text-accent-cyan border-b border-accent-cyan/40 font-medium hover:border-accent-cyan transition-all">
        {children || entry.term}
      </span>

      {isVisible && (
        <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 p-3 bg-surface border border-white/5 rounded-xl shadow-xl z-50 text-xs text-text-secondary animate-in fade-in slide-in-from-bottom-1 duration-200">
          {content}
        </span>
      )}
    </span>
  )
}

export function Callout({ children, type = 'info', title }: { children: React.ReactNode, type?: 'info' | 'warning' | 'tip' | 'deep-dive', title?: string }) {
  const styles = {
    info: {
      bg: 'bg-accent-cyan/10',
      border: 'border-accent-cyan/20',
      icon: '💡',
      text: 'text-accent-cyan'
    },
    warning: {
      bg: 'bg-accent-orange/10',
      border: 'border-accent-orange/20',
      icon: '⚠️',
      text: 'text-accent-orange'
    },
    tip: {
      bg: 'bg-accent-pink/10',
      border: 'border-accent-pink/20',
      icon: '✨',
      text: 'text-accent-pink'
    },
    'deep-dive': {
      bg: 'bg-elevated/50',
      border: 'border-white/5',
      icon: '🔬',
      text: 'text-text-secondary'
    }
  }[type]

  return (
    <div className={`my-6 p-4 rounded-2xl border ${styles.bg} ${styles.border} relative overflow-hidden`}>
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
  if (!terms || !Array.isArray(terms)) return null

  return (
    <div className="mt-12 p-6 rounded-2xl card">
      <h3 className="text-lg font-display font-bold text-text-primary mb-4 flex items-center gap-2">
        <svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-accent-cyan">
          <path d="M4 4h12v12H4z" />
          <path d="M8 4v12M12 4v12M4 8h12M4 12h12" />
        </svg>
        Glossário do Módulo
      </h3>
      <div className="grid gap-4 sm:grid-cols-2">
        {terms.map(id => {
          const entry = GLOSSARY[id]
          if (!entry) return null
          return (
            <div key={id} className="border-l-2 border-accent-orange/20 pl-4">
              <dt className="text-sm font-bold text-accent-orange mb-1">{entry.term}</dt>
              <dd className="text-xs text-text-secondary leading-relaxed">{entry.definition}</dd>
            </div>
          )
        })}
      </div>
    </div>
  )
}
