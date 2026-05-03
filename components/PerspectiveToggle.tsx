'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'

export type Perspective = 'visual' | 'iniciante' | 'fisico' | 'programador'

interface PerspectiveToggleProps {
  onPerspectiveChange?: (p: Perspective) => void
  className?: string
}

interface PerspectiveContent {
  label: string
  icon: string
  description: string
}

const perspectives: Record<Perspective, PerspectiveContent> = {
  visual: {
    label: 'Visual',
    icon: '🎨',
    description: 'Animações e analogias visuais',
  },
  iniciante: {
    label: 'Iniciante',
    icon: '👶',
    description: 'Analogias do dia a dia',
  },
  fisico: {
    label: 'Físico',
    icon: '🔬',
    description: 'Equações e notação bra-ket',
  },
  programador: {
    label: 'Programador',
    icon: '💻',
    description: 'Código Qiskit equivalente',
  },
}

export function PerspectiveToggle({ onPerspectiveChange, className = '' }: PerspectiveToggleProps) {
  const [active, setActive] = useState<Perspective>('visual')

  const handleChange = (p: Perspective) => {
    setActive(p)
    onPerspectiveChange?.(p)
  }

  return (
    <div className={`card p-1.5 inline-flex flex-wrap gap-1 ${className}`}>
      {(Object.entries(perspectives) as [Perspective, PerspectiveContent][]).map(([key, { label, icon }]) => (
        <button
          key={key}
          type="button"
          onClick={() => handleChange(key)}
          className={`relative px-3 md:px-4 py-2 rounded-lg text-xs md:text-sm font-medium transition-all duration-200 ${
            active === key
              ? 'text-white'
              : 'text-text-muted hover:text-text-secondary'
          }`}
        >
          {active === key && (
            <motion.div
              layoutId="perspective-bg"
              className="absolute inset-0 rounded-lg bg-gradient-to-r from-accent-orange to-accent-pink"
              transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            />
          )}
          <span className="relative z-10 flex items-center gap-1.5">
            <span className="hidden sm:inline">{icon}</span>
            {label}
          </span>
        </button>
      ))}
    </div>
  )
}

interface PerspectiveWrapperProps {
  children: React.ReactNode
  perspective: Perspective
  showFor: Perspective[]
}

export function PerspectiveWrapper({ children, perspective, showFor }: PerspectiveWrapperProps) {
  if (!showFor.includes(perspective)) return null

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  )
}
