'use client'

import { useState, useEffect, useMemo } from 'react'

const N = 81
const CENTER = (N - 1) / 2
const STEPS_MAX = 38
const W = 560, H = 180

type Complex = { re: number; im: number }

export function QuantumWalk() {
  const [step, setStep] = useState(0)
  const [running, setRunning] = useState(true)

  useEffect(() => {
    if (!running) return
    if (step >= STEPS_MAX) { setRunning(false); return }
    const id = setTimeout(() => setStep(s => s + 1), 280)
    return () => clearTimeout(id)
  }, [running, step])

  // Classical: binomial distribution
  const classicalDist = useMemo(() => {
    const dist = new Array(N).fill(0) as number[]
    if (step === 0) { dist[CENTER] = 1; return dist }
    for (let k = -step; k <= step; k += 2) {
      const idx = CENTER + k
      if (idx < 0 || idx >= N) continue
      let logp = -step * Math.log(2)
      const m = (step + k) / 2
      for (let i = 1; i <= m; i++) logp += Math.log(step - i + 1) - Math.log(i)
      dist[idx] = Math.exp(logp)
    }
    return dist
  }, [step])

  // Quantum: Hadamard walk
  const quantumDist = useMemo(() => {
    let amp0: Complex[] = Array.from({ length: N }, () => ({ re: 0, im: 0 }))
    let amp1: Complex[] = Array.from({ length: N }, () => ({ re: 0, im: 0 }))
    amp0[CENTER] = { re: 1 / Math.SQRT2, im: 0 }
    amp1[CENTER] = { re: 0, im: 1 / Math.SQRT2 }

    for (let s = 0; s < step; s++) {
      const newA0: Complex[] = Array.from({ length: N }, () => ({ re: 0, im: 0 }))
      const newA1: Complex[] = Array.from({ length: N }, () => ({ re: 0, im: 0 }))
      for (let i = 0; i < N; i++) {
        newA0[i] = { re: (amp0[i].re + amp1[i].re) / Math.SQRT2, im: (amp0[i].im + amp1[i].im) / Math.SQRT2 }
        newA1[i] = { re: (amp0[i].re - amp1[i].re) / Math.SQRT2, im: (amp0[i].im - amp1[i].im) / Math.SQRT2 }
      }
      const s0: Complex[] = Array.from({ length: N }, () => ({ re: 0, im: 0 }))
      const s1: Complex[] = Array.from({ length: N }, () => ({ re: 0, im: 0 }))
      for (let i = 0; i < N; i++) {
        if (i + 1 < N) s0[i + 1] = newA0[i]
        if (i - 1 >= 0) s1[i - 1] = newA1[i]
      }
      amp0 = s0; amp1 = s1
    }

    return amp0.map((a, i) =>
      a.re*a.re + a.im*a.im + amp1[i].re*amp1[i].re + amp1[i].im*amp1[i].im
    )
  }, [step])

  const barW = W / N
  const maxC = Math.max(...classicalDist, 0.001)
  const maxQ = Math.max(...quantumDist,   0.001)

  return (
    <div className="my-10 rounded-2xl border border-border bg-surface/20 p-6 flex flex-col gap-4">
      <p className="text-xs text-text-muted font-mono uppercase tracking-widest">
        passo {step} / {STEPS_MAX}
      </p>

      {/* Classical distribution */}
      <div>
        <p className="text-xs font-mono mb-2" style={{ color: '#ef4444' }}>
          CLÁSSICO · caminhada aleatória (moeda real)
        </p>
        <svg width="100%" style={{ maxWidth: W }} viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMid meet">
          <line x1="0" y1={H-1} x2={W} y2={H-1} stroke="#2d2d45" strokeWidth="0.6" />
          {classicalDist.map((p, i) => (
            <rect key={i}
                  x={i * barW} y={H - (p / maxC) * (H - 4)}
                  width={barW - 0.5} height={(p / maxC) * (H - 4)}
                  fill="#ef4444" opacity={0.85} />
          ))}
          <text x={W/2} y={H-6} textAnchor="middle"
                fill="#475569" fontFamily="ui-monospace,monospace" fontSize="10">posição = 0</text>
        </svg>
      </div>

      {/* Quantum distribution */}
      <div>
        <p className="text-xs font-mono mb-2" style={{ color: '#06b6d4' }}>
          QUÂNTICO · moeda de Hadamard (superposição)
        </p>
        <svg width="100%" style={{ maxWidth: W }} viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMid meet">
          <line x1="0" y1={H-1} x2={W} y2={H-1} stroke="#2d2d45" strokeWidth="0.6" />
          {quantumDist.map((p, i) => (
            <rect key={i}
                  x={i * barW} y={H - (p / maxQ) * (H - 4)}
                  width={barW - 0.5} height={(p / maxQ) * (H - 4)}
                  fill="#06b6d4" opacity={0.85} />
          ))}
        </svg>
      </div>

      {/* Controls */}
      <div className="flex gap-2 justify-center flex-wrap">
        <button
          onClick={() => { setStep(0); setRunning(true) }}
          className="px-4 py-2 rounded-lg text-sm font-medium bg-purple text-white"
        >▶ Recomeçar</button>
        <button
          onClick={() => setRunning(r => !r)}
          className="px-4 py-2 rounded-lg text-sm font-medium border border-border bg-surface text-text-secondary hover:border-purple/50 transition-colors"
        >{running ? '⏸ Pausar' : '▶ Continuar'}</button>
      </div>
    </div>
  )
}
