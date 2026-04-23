'use client'

import React, { useEffect, useState } from 'react'

const GRID = 5
const TOTAL = GRID * GRID
// Índice da célula-alvo (linha 3, coluna 4 = índice 19)
const TARGET = 19

// Amplitudes de base para o lado quântico — determinísticas, sem Math.random()
const BASE_AMPS = [
  0.28, 0.24, 0.30, 0.22, 0.26,
  0.25, 0.32, 0.20, 0.29, 0.24,
  0.27, 0.21, 0.33, 0.23, 0.28,
  0.24, 0.30, 0.22, 0.27, 1.00,
  0.26, 0.28, 0.24, 0.30, 0.22,
]

export function MazeQuantum() {
  const [step, setStep] = useState(0)
  const [qPhase, setQPhase] = useState<0 | 1>(0) // 0 = superposição uniforme, 1 = amplificado

  // Clássico: avança uma célula a cada tick
  useEffect(() => {
    const t = setInterval(() => {
      setStep(s => (s >= TOTAL + 5 ? 0 : s + 1))
    }, 260)
    return () => clearInterval(t)
  }, [])

  // Quântico: alterna entre exploração e amplificação
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

      {/* ── ABORDAGEM CLÁSSICA ── */}
      <div className="rounded-xl border border-border bg-surface/30 p-5 flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-cyan/60" />
          <span className="text-[11px] font-bold uppercase tracking-widest text-cyan/70">
            Abordagem Clássica
          </span>
        </div>

        {/* Grid */}
        <div className="grid gap-1" style={{ gridTemplateColumns: `repeat(${GRID}, 1fr)` }}>
          {Array.from({ length: TOTAL }).map((_, i) => {
            const isTarget = i === TARGET
            const isVisited = i < visited
            const isCurrent = i === currentIdx

            let bg = 'bg-surface/40 border-border/30'
            if (isTarget && isVisited) bg = 'bg-emerald-500/80 border-emerald-400'
            else if (isCurrent) bg = 'bg-cyan border-cyan scale-110'
            else if (isVisited) bg = 'bg-cyan/15 border-cyan/25'

            return (
              <div
                key={i}
                className={`aspect-square rounded border transition-all duration-150 flex items-center justify-center text-[9px] font-bold ${bg}`}
              >
                {isTarget && isVisited && <span className="text-white">✓</span>}
              </div>
            )
          })}
        </div>

        {/* Status */}
        <div>
          <p className="text-[11px] text-text-secondary">
            Verificadas:{' '}
            <span className="text-cyan font-bold">{visited}</span>/{TOTAL}{' '}
            {found && <span className="text-emerald-400">— achada em {TARGET + 1} passos</span>}
          </p>
          <p className="text-[10px] text-text-muted mt-0.5">
            Pior caso: <strong>N</strong> verificações sequenciais
          </p>
        </div>
      </div>

      {/* ── ABORDAGEM QUÂNTICA ── */}
      <div className="rounded-xl border border-purple/30 bg-surface/30 p-5 flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full bg-purple ${qPhase === 1 ? 'animate-pulse' : ''}`} />
          <span className="text-[11px] font-bold uppercase tracking-widest text-purple-light/70">
            Abordagem Quântica
          </span>
        </div>

        {/* Grid */}
        <div className="grid gap-1" style={{ gridTemplateColumns: `repeat(${GRID}, 1fr)` }}>
          {Array.from({ length: TOTAL }).map((_, i) => {
            const isTarget = i === TARGET
            const amp = BASE_AMPS[i]

            if (qPhase === 1) {
              // Fase amplificada: target brilha, outros somem
              if (isTarget) {
                return (
                  <div
                    key={i}
                    className="aspect-square rounded border bg-purple border-purple-light scale-125 transition-all duration-500 flex items-center justify-center text-[9px] font-bold text-white"
                  >
                    ✓
                  </div>
                )
              }
              return (
                <div
                  key={i}
                  className="aspect-square rounded border border-purple/10 bg-purple/5 transition-all duration-500"
                  style={{ opacity: 0.12 }}
                />
              )
            }

            // Fase de superposição: todas as células com amplitude uniforme
            return (
              <div
                key={i}
                className="aspect-square rounded border border-purple/30 bg-purple/20 transition-all duration-500"
                style={{ opacity: amp }}
              />
            )
          })}
        </div>

        {/* Status */}
        <div>
          <p className="text-[11px] text-text-secondary">
            {qPhase === 0 ? (
              <>
                <span className="text-purple-light font-bold">Todas</span> as células exploradas{' '}
                <span className="text-purple-light font-bold">simultaneamente</span>
              </>
            ) : (
              <>
                Interferência{' '}
                <span className="text-purple-light font-bold">amplificou a solução</span> correta
              </>
            )}
          </p>
          <p className="text-[10px] text-text-muted mt-0.5">
            Grover: apenas <strong>√N</strong> iterações necessárias
          </p>
        </div>
      </div>

    </div>
  )
}
