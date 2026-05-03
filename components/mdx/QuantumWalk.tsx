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
    <div className="my-10 rounded-2xl border border-white/5 bg-gradient-to-br from-surface/60 to-background p-6 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <p className="text-xs text-text-muted font-mono uppercase tracking-widest">
          Passo {step} / {STEPS_MAX}
        </p>
        <div className="h-1.5 flex-1 max-w-[200px] bg-elevated rounded-full overflow-hidden ml-4">
          <div
            className="h-full rounded-full bg-gradient-to-r from-accent-orange to-accent-pink transition-all duration-300"
            style={{ width: `${(step / STEPS_MAX) * 100}%` }}
          />
        </div>
      </div>

      <div>
        <p className="text-xs font-mono mb-2 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-accent-pink" />
          <span className="text-text-muted uppercase tracking-wider">CLÁSSICO</span>
          <span className="text-text-muted font-normal normal-case">caminhada aleatória (moeda real)</span>
        </p>
        <svg width="100%" style={{ maxWidth: W }} viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMid meet">
          <defs>
            <linearGradient id="classicBar" x1="0%" y1="100%" x2="0%" y2="0%">
              <stop offset="0%" stopColor="#FF2D78" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#FF2D78" stopOpacity="0.9" />
            </linearGradient>
          </defs>
          <line x1="0" y1={H-1} x2={W} y2={H-1} stroke="#2A2E42" strokeWidth="0.6" />
          {classicalDist.map((p, i) => (
            <rect key={i}
                  x={i * barW} y={H - (p / maxC) * (H - 4)}
                  width={barW - 0.5} height={(p / maxC) * (H - 4)}
                  fill="url(#classicBar)" rx={0.5} />
          ))}
        </svg>
      </div>

      <div>
        <p className="text-xs font-mono mb-2 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-accent-cyan" />
          <span className="text-text-muted uppercase tracking-wider">QUÂNTICO</span>
          <span className="text-text-muted font-normal normal-case">moeda de Hadamard (superposição)</span>
        </p>
        <svg width="100%" style={{ maxWidth: W }} viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMid meet">
          <defs>
            <linearGradient id="quantumBar" x1="0%" y1="100%" x2="0%" y2="0%">
              <stop offset="0%" stopColor="#00D4FF" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#00D4FF" stopOpacity="0.9" />
            </linearGradient>
          </defs>
          <line x1="0" y1={H-1} x2={W} y2={H-1} stroke="#2A2E42" strokeWidth="0.6" />
          {quantumDist.map((p, i) => (
            <rect key={i}
                  x={i * barW} y={H - (p / maxQ) * (H - 4)}
                  width={barW - 0.5} height={(p / maxQ) * (H - 4)}
                  fill="url(#quantumBar)" rx={0.5} />
          ))}
        </svg>
      </div>

      <div className="flex gap-2 justify-center flex-wrap">
        <button
          onClick={() => { setStep(0); setRunning(true) }}
          className="px-4 py-2 rounded-lg text-xs font-medium text-white transition-all duration-200"
          style={{
            background: 'linear-gradient(135deg, #FF6B35, #FF2D78)',
            boxShadow: '0 0 20px #FF6B3540',
          }}
        >Recomeçar</button>
        <button
          onClick={() => setRunning(r => !r)}
          disabled={step >= STEPS_MAX}
          className="px-4 py-2 rounded-lg text-xs font-medium text-text-muted bg-elevated border border-white/5 hover:text-text-secondary disabled:opacity-30 transition-all"
        >{running ? 'Pausar' : 'Continuar'}</button>
      </div>
    </div>
  )
}
