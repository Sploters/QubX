'use client'

import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export interface TheaterScene {
  id: string
  duration: number
  content: React.ReactNode
  narration?: string
}

interface QuantumTheaterProps {
  scenes: TheaterScene[]
  title?: string
  className?: string
}

export function QuantumTheater({ scenes, title, className = '' }: QuantumTheaterProps) {
  const [currentScene, setCurrentScene] = useState(0)
  const [direction, setDirection] = useState(0)

  const goTo = useCallback((index: number) => {
    setDirection(index > currentScene ? 1 : -1)
    setCurrentScene(index)
  }, [currentScene])

  const next = useCallback(() => {
    if (currentScene < scenes.length - 1) goTo(currentScene + 1)
  }, [currentScene, scenes.length, goTo])

  const prev = useCallback(() => {
    if (currentScene > 0) goTo(currentScene - 1)
  }, [currentScene, goTo])

  const scene = scenes[currentScene]

  return (
    <div className={`card overflow-hidden ${className}`}>
      {title && (
        <div className="px-6 pt-5 pb-2 border-b border-white/5">
          <div className="flex items-center gap-2">
            <svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-accent-yellow">
              <path d="M10 2.5a7.5 7.5 0 100 15 7.5 7.5 0 000-15z" />
              <path d="M10 6v4l3 2" />
            </svg>
            <h4 className="text-sm font-display font-semibold text-text-primary">{title}</h4>
          </div>
        </div>
      )}

      <div className="relative min-h-[300px]">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={scene.id}
            custom={direction}
            initial={{ opacity: 0, x: direction > 0 ? 60 : -60 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction > 0 ? -60 : 60 }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
            className="p-6"
          >
            {scene.content}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="px-6 py-4 border-t border-white/5 flex items-center justify-between">
        <div className="flex items-center gap-1">
          {scenes.map((s, i) => (
            <button
              key={s.id}
              type="button"
              onClick={() => goTo(i)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                i === currentScene
                  ? 'w-6 bg-gradient-to-r from-accent-orange to-accent-pink'
                  : 'bg-elevated hover:bg-text-muted'
              }`}
              aria-label={`Cena ${i + 1}`}
            />
          ))}
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-text-muted">
            {currentScene + 1}/{scenes.length}
          </span>
          <button
            type="button"
            onClick={prev}
            disabled={currentScene === 0}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-text-muted hover:text-text-primary hover:bg-elevated disabled:opacity-30 disabled:cursor-not-allowed transition-all"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M10 4l-4 4 4 4" />
            </svg>
          </button>
          <button
            type="button"
            onClick={next}
            disabled={currentScene === scenes.length - 1}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-text-muted hover:text-text-primary hover:bg-elevated disabled:opacity-30 disabled:cursor-not-allowed transition-all"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M6 4l4 4-4 4" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}

export function TheaterScene({ children, narration }: { children: React.ReactNode; narration?: string }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[260px] text-center">
      <div className="mb-4">
        {children}
      </div>
      {narration && (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-sm text-text-secondary max-w-md mx-auto leading-relaxed"
        >
          {narration}
        </motion.p>
      )}
    </div>
  )
}

export function TheaterAnimation({ children, label }: { children: React.ReactNode; label?: string }) {
  return (
    <div className="flex flex-col items-center gap-3">
      <div className="w-32 h-32 md:w-40 md:h-40 rounded-2xl bg-gradient-to-br from-accent-orange/10 to-accent-pink/10 border border-white/5 flex items-center justify-center">
        {children}
      </div>
      {label && (
        <span className="text-xs font-medium text-text-muted">{label}</span>
      )}
    </div>
  )
}

export function TheaterQubit({ state, label }: { state: '0' | '1' | '+'; label?: string }) {
  const colors = {
    '0': { bg: 'from-accent-cyan/20 to-accent-cyan/5', dot: 'bg-accent-cyan', glow: 'shadow-cyan-500/20' },
    '1': { bg: 'from-accent-orange/20 to-accent-orange/5', dot: 'bg-accent-orange', glow: 'shadow-orange-500/20' },
    '+': { bg: 'from-accent-pink/20 to-accent-pink/5 via-accent-pink/10', dot: 'bg-accent-pink', glow: 'shadow-pink-500/20' },
  }
  const c = colors[state]

  return (
    <div className="flex flex-col items-center gap-2">
      <motion.div
        animate={
          state === '+'
            ? { rotate: 360 }
            : { scale: [1, 1.05, 1] }
        }
        transition={
          state === '+'
            ? { repeat: Infinity, duration: 4, ease: 'linear' }
            : { repeat: Infinity, duration: 2 }
        }
        className={`w-16 h-16 rounded-full bg-gradient-to-br ${c.bg} border border-white/10 shadow-lg ${c.glow} flex items-center justify-center`}
      >
        <div className={`w-3 h-3 rounded-full ${c.dot} shadow-lg`} />
      </motion.div>
      {label && <span className="text-xs text-text-muted">{label}</span>}
    </div>
  )
}

export function TheaterSplitScreen({ left, right, label }: { left: React.ReactNode; right: React.ReactNode; label?: string }) {
  return (
    <div className="w-full">
      {label && (
        <p className="text-xs text-text-muted text-center mb-3">{label}</p>
      )}
      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 rounded-xl bg-elevated/50 border border-white/5 flex items-center justify-center min-h-[120px]">
          {left}
        </div>
        <div className="p-4 rounded-xl bg-elevated/50 border border-white/5 flex items-center justify-center min-h-[120px]">
          {right}
        </div>
      </div>
    </div>
  )
}
