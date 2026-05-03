'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface AlgorithmStep {
  classical: string
  quantum: string
  classicalIcon?: string
  quantumIcon?: string
}

interface QuantumVsClassicalProps {
  title: string
  description: string
  steps: AlgorithmStep[]
  totalItems: number
  className?: string
}

export function QuantumVsClassical({ title, description, steps, totalItems, className = '' }: QuantumVsClassicalProps) {
  const [step, setStep] = useState(0)
  const [isRunning, setIsRunning] = useState(false)
  const [classicalProgress, setClassicalProgress] = useState(0)
  const [quantumProgress, setQuantumProgress] = useState(0)
  const [quantumDone, setQuantumDone] = useState(false)
  const intervalRef = useRef<ReturnType<typeof setInterval>>()

  const reset = () => {
    setStep(0)
    setClassicalProgress(0)
    setQuantumProgress(0)
    setQuantumDone(false)
    setIsRunning(false)
    if (intervalRef.current) clearInterval(intervalRef.current)
  }

  const start = () => {
    reset()
    setIsRunning(true)

    const classicalSpeed = 1
    const quantumSpeed = 4

    intervalRef.current = setInterval(() => {
      setClassicalProgress((prev) => {
        const next = prev + classicalSpeed
        if (next >= totalItems) {
          clearInterval(intervalRef.current)
          setQuantumDone(true)
          return totalItems
        }
        return next
      })

      setQuantumProgress((prev) => {
        const next = prev + quantumSpeed
        if (next >= totalItems) {
          setQuantumDone(true)
          return totalItems
        }
        return next
      })
    }, 100)
  }

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [])

  const isComplete = classicalProgress >= totalItems && quantumProgress >= totalItems
  const currentStep = steps[Math.min(step, steps.length - 1)]

  return (
    <div className={`card overflow-hidden ${className}`}>
      <div className="p-6">
        <h4 className="font-display font-semibold text-text-primary mb-1 flex items-center gap-2">
          <svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-accent-cyan">
            <path d="M10 2a8 8 0 100 16 8 8 0 000-16z" />
            <path d="M10 6v4l3 3" />
          </svg>
          {title}
        </h4>
        <p className="text-sm text-text-secondary mb-5">{description}</p>

        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-elevated/30 border border-white/5">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-lg">💻</span>
              <span className="text-xs font-medium text-text-muted uppercase tracking-wider">Clássico</span>
            </div>
            <div className="flex items-baseline gap-1 mb-2">
              <span className="text-2xl font-display font-bold text-text-primary">{classicalProgress}</span>
              <span className="text-xs text-text-muted">/ {totalItems}</span>
            </div>
            <div className="h-2 bg-elevated rounded-full overflow-hidden">
              <motion.div
                animate={{ width: `${(classicalProgress / totalItems) * 100}%` }}
                className="h-full rounded-full bg-gradient-to-r from-blue-500 to-blue-400"
              />
            </div>
          </div>

          <div className="p-4 rounded-xl bg-gradient-to-br from-accent-orange/5 to-accent-pink/5 border border-accent-orange/10">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-lg">⚛️</span>
              <span className="text-xs font-medium text-accent-orange uppercase tracking-wider">Quântico</span>
            </div>
            <div className="flex items-baseline gap-1 mb-2">
              <motion.span
                key={quantumProgress}
                initial={quantumDone ? { scale: 1.5 } : undefined}
                animate={{ scale: 1 }}
                className="text-2xl font-display font-bold text-accent-orange"
              >
                {quantumProgress}
              </motion.span>
              <span className="text-xs text-text-muted">/ {totalItems}</span>
            </div>
            <div className="h-2 bg-elevated rounded-full overflow-hidden">
              <motion.div
                animate={{ width: `${(quantumProgress / totalItems) * 100}%` }}
                className="h-full rounded-full bg-gradient-to-r from-accent-orange to-accent-pink"
              />
            </div>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {currentStep && (
            <motion.div
              key={step}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mt-4 grid grid-cols-2 gap-3"
            >
              <div className="p-3 rounded-lg bg-elevated/50 border border-white/5 text-xs text-text-secondary">
                {currentStep.classicalIcon && <span className="mr-1">{currentStep.classicalIcon}</span>}
                {currentStep.classical}
              </div>
              <div className="p-3 rounded-lg bg-accent-orange/5 border border-accent-orange/10 text-xs text-text-secondary">
                {currentStep.quantumIcon && <span className="mr-1">{currentStep.quantumIcon}</span>}
                {currentStep.quantum}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="mt-5 flex items-center gap-3">
          {!isRunning ? (
            <button
              type="button"
              onClick={start}
              className="btn-primary text-sm px-5 py-2"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                <path d="M4 3l10 5-10 5V3z" />
              </svg>
              Executar
            </button>
          ) : (
            <button
              type="button"
              onClick={reset}
              className="btn-secondary text-sm px-5 py-2"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M2 8a6 6 0 0111.33-3M14 2v4h-4M14 8a6 6 0 01-11.33 3M2 14v-4h4" />
              </svg>
              Resetar
            </button>
          )}

          {isComplete && (
            <motion.span
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              className="badge-orange text-xs"
            >
              Vantagem Quântica! {Math.round((1 - quantumProgress / classicalProgress) * 100)}% mais rápido
            </motion.span>
          )}
        </div>
      </div>
    </div>
  )
}

export function GroverSearchSimulation() {
  const items = 100
  const steps: AlgorithmStep[] = [
    { classical: 'Verifica item #1', quantum: 'Prepara superposição de todos os itens', classicalIcon: '📋', quantumIcon: '🌀' },
    { classical: 'Verifica item #2', quantum: 'Aplica amplificação de amplitude', classicalIcon: '📋', quantumIcon: '🔊' },
    { classical: 'Verifica item #25...', quantum: 'Interfere construtivamente na resposta', classicalIcon: '⏳', quantumIcon: '🌊' },
    { classical: 'Verifica item #50...', quantum: 'Resultado encontrado em ~10 passos!', classicalIcon: '😩', quantumIcon: '🎯' },
  ]

  return (
    <QuantumVsClassical
      title="Busca Quântica (Algoritmo de Grover)"
      description="Encontrar um item específico em {items} itens não ordenados."
      steps={steps}
      totalItems={items}
    />
  )
}

export function DeutschJozsaSimulation() {
  const items = 16
  const steps: AlgorithmStep[] = [
    { classical: 'Testa entrada 0000 → f(0000)', quantum: 'Prepara superposição de todas as entradas', classicalIcon: '0️⃣', quantumIcon: '🌀' },
    { classical: 'Testa entrada 0001 → f(0001)', quantum: 'Avalia f em superposição (1 chamada)', classicalIcon: '1️⃣', quantumIcon: '⚡' },
    { classical: 'Testa entrada 0010 → f(0010)', quantum: 'Interferência destrutiva das respostas erradas', classicalIcon: '2️⃣', quantumIcon: '🌊' },
    { classical: '...mais 13 testes...', quantum: 'Resposta: função é constante ou balanceada!', classicalIcon: '😩', quantumIcon: '🎯' },
  ]

  return (
    <QuantumVsClassical
      title="Algoritmo de Deutsch-Jozsa"
      description="Descobrir se uma função binária é constante ou balanceada."
      steps={steps}
      totalItems={items}
    />
  )
}
