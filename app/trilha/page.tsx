'use client'

import { MODULES } from '@/lib/modules'
import { ModuleCard } from '@/components/ModuleCard'
import { useProgress } from '@/hooks/useProgress'

export default function TrilhaPage() {
  const { visited } = useProgress()
  const completedCount = MODULES.filter((m) => visited.has(m.slug)).length

  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <div className="mb-10">
        <p className="text-sm text-cyan tracking-widest uppercase mb-2">Trilha de aprendizado</p>
        <h1 className="text-3xl font-bold text-text-primary mb-3">Computação Quântica</h1>
        <p className="text-text-secondary">
          {completedCount === 0
            ? 'Comece por onde quiser ou siga a trilha sugerida.'
            : `Você visitou ${completedCount} de ${MODULES.length} módulos.`}
        </p>

        {/* Progress bar */}
        <div className="mt-4 h-1.5 bg-border rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{
              width: `${(completedCount / MODULES.length) * 100}%`,
              background: 'linear-gradient(90deg, #8b5cf6, #06b6d4)',
            }}
          />
        </div>
      </div>

      <div className="flex flex-col gap-3">
        {MODULES.map((module) => (
          <ModuleCard
            key={module.slug}
            module={module}
            visited={visited.has(module.slug)}
          />
        ))}
      </div>
    </div>
  )
}
