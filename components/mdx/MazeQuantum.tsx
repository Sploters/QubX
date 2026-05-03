'use client'

import { useEffect, useState } from 'react'

const GRID = 5
const TOTAL = GRID * GRID
const TARGET = 19

const BASE_AMPS = [
  0.28, 0.24, 0.30, 0.22, 0.26,
  0.25, 0.32, 0.20, 0.29, 0.24,
  0.27, 0.21, 0.33, 0.23, 0.28,
  0.24, 0.30, 0.22, 0.27, 1.00,
  0.26, 0.28, 0.24, 0.30, 0.22,
]

export function MazeQuantum() {
  const [step, setStep] = useState(0)
  const [qPhase, setQPhase] = useState<0 | 1>(0)

  useEffect(() => {
    const t = setInterval(() => {
      setStep(s => (s >= TOTAL + 5 ? 0 : s + 1))
    }, 260)
    return () => clearInterval(t)
  }, [])

  useEffect(() => {
    const t = setInterval(() => {
      setQPhase(p => (p === 0 ? 1 : 0))
    }, 2400)
    return () => clearInterval(t)
  }, [])

  const visited = Math.min(step, TOTAL)
  const currentIdx = step > 0 && step <= TOTAL ? step - 1 : -1
  const found = visited > TARGET

  return (
    <div className="my-6 grid grid-cols-1 md:grid-cols-2 gap-4">

      <div className="rounded-2xl border border-white/5 bg-gradient-to-br from-surface/60 to-background p-5 flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-accent-pink" />
          <span className="text-[10px] font-bold uppercase tracking-widest text-text-muted">
            Abordagem Clássica
          </span>
        </div>

        <div className="grid gap-1" style={{ gridTemplateColumns: `repeat(${GRID}, 1fr)` }}>
          {Array.from({ length: TOTAL }).map((_, i) => {
            const isTarget = i === TARGET
            const isVisited = i < visited
            const isCurrent = i === currentIdx

            let cls = 'bg-elevated/50 border-white/5'
            if (isTarget && isVisited) cls = 'bg-gradient-to-br from-accent-orange to-accent-pink border-accent-orange text-white shadow-lg'
            else if (isCurrent) cls = 'bg-accent-cyan border-accent-cyan scale-110 shadow-lg shadow-accent-cyan/20'
            else if (isVisited) cls = 'bg-accent-cyan/15 border-accent-cyan/25'

            return (
              <div
                key={i}
                className={`aspect-square rounded-lg border transition-all duration-150 flex items-center justify-center text-[9px] font-bold ${cls}`}
              >
                {isTarget && isVisited && <span className="text-white">✓</span>}
              </div>
            )
          })}
        </div>

        <div>
          <p className="text-sm text-text-secondary">
            Verificadas:{' '}
            <span className="text-accent-cyan font-bold">{visited}</span>/{TOTAL}{' '}
            {found && <span className="text-accent-orange">— encontrada em {TARGET + 1} passos</span>}
          </p>
          <p className="text-xs text-text-muted mt-1">
            Pior caso: <strong>N</strong> verificações sequenciais
          </p>
        </div>
      </div>

      <div className="rounded-2xl border border-accent-orange/10 bg-gradient-to-br from-accent-orange/5 to-accent-pink/5 p-5 flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full bg-accent-orange ${qPhase === 1 ? 'animate-pulse' : ''}`} />
          <span className="text-[10px] font-bold uppercase tracking-widest text-accent-orange/70">
            Abordagem Quântica
          </span>
        </div>

        <div className="grid gap-1" style={{ gridTemplateColumns: `repeat(${GRID}, 1fr)` }}>
          {Array.from({ length: TOTAL }).map((_, i) => {
            const isTarget = i === TARGET
            const amp = BASE_AMPS[i]

            if (qPhase === 1) {
              if (isTarget) {
                return (
                  <div
                    key={i}
                    className="aspect-square rounded-lg border bg-gradient-to-br from-accent-orange to-accent-pink border-accent-orange scale-110 transition-all duration-500 flex items-center justify-center text-[9px] font-bold text-white shadow-lg shadow-accent-orange/30"
                  >
                    ✓
                  </div>
                )
              }
              return (
                <div
                  key={i}
                  className="aspect-square rounded-lg border border-accent-orange/10 bg-accent-orange/5 transition-all duration-500"
                  style={{ opacity: 0.12 }}
                />
              )
            }

            return (
              <div
                key={i}
                className="aspect-square rounded-lg border border-accent-orange/20 bg-accent-orange/10 transition-all duration-500"
                style={{ opacity: 0.3 + amp * 0.5 }}
              />
            )
          })}
        </div>

        <div>
          <p className="text-sm text-text-secondary">
            {qPhase === 0 ? (
              <>
                <span className="text-accent-orange font-bold">Todas</span> as células exploradas{' '}
                <span className="text-accent-orange font-bold">simultaneamente</span>
              </>
            ) : (
              <>
                Interferência{' '}
                <span className="text-accent-orange font-bold">amplificou a solução</span> correta
              </>
            )}
          </p>
          <p className="text-xs text-text-muted mt-1">
            Grover: apenas <strong>√N</strong> iterações necessárias
          </p>
        </div>
      </div>

    </div>
  )
}
