'use client'

import { motion } from 'framer-motion'
import { MODULES } from '@/lib/modules'
import { ModuleCard } from '@/components/ModuleCard'
import { useProgress } from '@/hooks/useProgress'

export default function TrilhaPage() {
  const { visited } = useProgress()
  const completedCount = MODULES.filter((m) => visited.has(m.slug)).length
  const progress = (completedCount / MODULES.length) * 100

  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-10"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-cyan/10 border border-accent-cyan/20 text-accent-cyan text-xs font-medium mb-4">
          <span className="w-1.5 h-1.5 rounded-full bg-accent-cyan" />
          TRILHA DE APRENDIZADO
        </div>

        <h1 className="text-3xl md:text-4xl font-display font-bold text-text-primary mb-3">
          Computação Quântica
        </h1>

        <p className="text-text-secondary">
          {completedCount === 0
            ? 'Comece por onde quiser ou siga a trilha sugerida. Cada módulo é um passo rumo ao entendimento quântico.'
            : `Você visitou ${completedCount} de ${MODULES.length} módulos. Continue assim!`}
        </p>

        <div className="mt-5">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-text-muted">Progresso</span>
            <span className="text-text-secondary font-medium">{Math.round(progress)}%</span>
          </div>
          <div className="h-2 bg-elevated rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="h-full rounded-full bg-gradient-to-r from-accent-orange via-accent-pink to-accent-cyan"
            />
          </div>
        </div>
      </motion.div>

      <div className="flex flex-col gap-3">
        {MODULES.map((module, index) => (
          <ModuleCard
            key={module.slug}
            module={module}
            visited={visited.has(module.slug)}
            index={index}
          />
        ))}
      </div>
    </div>
  )
}
