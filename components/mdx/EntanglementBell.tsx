'use client'

import { useState, useEffect, useRef } from 'react'
import { ProbBar } from '@/lib/animation-helpers'

type Phase = 'ready' | 'measuringA' | 'done'

function QubitNode({
  label, result, measuring, superposed, tick, delayed,
}: {
  label: string
  result: number | null
  measuring: boolean
  superposed: boolean
  tick: number
  delayed?: boolean
}) {
  const resolved = result !== null && !delayed
  const color = resolved ? (result === 0 ? '#00D4FF' : '#FF2D78') : '#2A2E42'
  const activeColor = resolved ? (result === 0 ? '#00D4FF' : '#FF2D78') : '#FF6B35'

  return (
    <div className="text-center">
      <div
        className="relative w-24 h-24 md:w-28 md:h-28 rounded-full flex items-center justify-center mx-auto transition-all duration-500"
        style={{
          border: `2px solid ${measuring ? '#FFD166' : color}`,
          background: `radial-gradient(circle at 35% 30%, ${activeColor}25, #13131f 80%)`,
          boxShadow: measuring
            ? `0 0 40px ${activeColor}40, inset 0 0 40px ${activeColor}10`
            : resolved
            ? `0 0 30px ${activeColor}30, inset 0 0 20px ${activeColor}10`
            : 'none',
        }}
      >
        {superposed && (
          <>
            <span
              className="absolute font-mono text-lg transition-all duration-300"
              style={{
                color: '#00D4FF',
                transform: `translate(${-12 + Math.sin(tick * 2) * 3}px, ${-8 + Math.cos(tick * 2) * 3}px)`,
                opacity: 0.8,
                textShadow: '0 0 10px #00D4FF40',
              }}
            >|0⟩</span>
            <span
              className="absolute font-mono text-lg transition-all duration-300"
              style={{
                color: '#FF2D78',
                transform: `translate(${12 + Math.sin(tick * 2 + 2) * 3}px, ${8 + Math.cos(tick * 2 + 2) * 3}px)`,
                opacity: 0.8,
                textShadow: '0 0 10px #FF2D7840',
              }}
            >|1⟩</span>
          </>
        )}
        {resolved && (
          <span
            className="font-mono font-bold transition-all duration-500"
            style={{
              fontSize: 36,
              color: result === 0 ? '#00D4FF' : '#FF2D78',
              textShadow: `0 0 30px ${result === 0 ? '#00D4FF' : '#FF2D78'}40`,
            }}
          >|{result}⟩</span>
        )}
      </div>
      <p className="mt-2 text-[10px] font-mono text-text-muted uppercase tracking-widest">{label}</p>
    </div>
  )
}

export function EntanglementBell() {
  const [phase, setPhase] = useState<Phase>('ready')
  const [aliceResult, setAliceResult] = useState<number | null>(null)
  const [bobResult, setBobResult] = useState<number | null>(null)
  const [history, setHistory] = useState<[number, number][]>([])
  const [tick, setTick] = useState(0)
  const rafRef = useRef<number | null>(null)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    if (phase === 'done') return
    const step = () => { setTick(v => v + 0.015); rafRef.current = requestAnimationFrame(step) }
    rafRef.current = requestAnimationFrame(step)
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current) }
  }, [phase])

  useEffect(() => {
    return () => { if (timerRef.current) clearTimeout(timerRef.current) }
  }, [])

  const measure = () => {
    const r = Math.random() < 0.5 ? 0 : 1
    setAliceResult(r)
    setPhase('measuringA')
    timerRef.current = setTimeout(() => {
      setBobResult(r)
      setPhase('done')
      setHistory(h => ([[r, r] as [number, number], ...h]).slice(0, 64))
    }, 700)
  }

  const reset = () => {
    if (timerRef.current) clearTimeout(timerRef.current)
    setPhase('ready'); setAliceResult(null); setBobResult(null)
  }

  const runMany = () => {
    const trials: [number, number][] = Array.from({ length: 200 }, () => {
      const r = Math.random() < 0.5 ? 0 : 1
      return [r, r]
    })
    setHistory(h => ([...trials, ...h]).slice(0, 400))
  }

  const agree    = history.filter(p => p[0] === p[1]).length
  const disagree = history.length - agree

  return (
    <div className="my-10 rounded-2xl border border-white/5 bg-gradient-to-br from-surface/60 to-background p-6 flex flex-col items-center gap-6">
      <div className="relative w-full max-w-[500px] h-40 md:h-44">
        <svg width="100%" height="100%" viewBox="0 0 500 180"
             className="absolute inset-0 pointer-events-none">
          <defs>
            <linearGradient id="bellLinkGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%"   stopColor="#00D4FF" />
              <stop offset="50%"  stopColor="#FFD166" />
              <stop offset="100%" stopColor="#FF2D78" />
            </linearGradient>
            <filter id="bell-glow">
              <feGaussianBlur stdDeviation="2" result="blur" />
              <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
          </defs>

          {phase === 'ready' && (
            <>
              <path d={`M 120 90 Q ${250 + Math.sin(tick*2)*20} ${60+Math.sin(tick*3)*30} 380 90`}
                    fill="none" stroke="url(#bellLinkGrad)" strokeWidth="1.5" opacity="0.6" strokeDasharray="4,5" filter="url(#bell-glow)"/>
              <path d={`M 120 90 Q ${250+Math.sin(tick*2+1)*20} ${120+Math.cos(tick*3)*30} 380 90`}
                    fill="none" stroke="url(#bellLinkGrad)" strokeWidth="1.5" opacity="0.3" strokeDasharray="4,5" filter="url(#bell-glow)"/>
            </>
          )}
          {phase === 'measuringA' && (
            <line x1="120" y1="90" x2="380" y2="90"
                  stroke="#FFD166" strokeWidth="2.5" opacity={Math.abs(Math.sin(tick * 15))} filter="url(#bell-glow)" />
          )}
          {phase === 'done' && (
            <line x1="120" y1="90" x2="380" y2="90"
                  stroke="#2A2E42" strokeWidth="1" strokeDasharray="4,8" opacity="0.4" />
          )}
        </svg>
        <div className="absolute left-4 md:left-8 top-4">
          <QubitNode label="Alice" result={aliceResult}
            measuring={phase === 'measuringA'} superposed={phase === 'ready'} tick={tick} />
        </div>
        <div className="absolute right-4 md:right-8 top-4">
          <QubitNode label="Bob" result={bobResult} measuring={false}
            superposed={phase === 'ready' || phase === 'measuringA'}
            tick={tick + 1.3} delayed={phase === 'measuringA'} />
        </div>
      </div>

      <div className="flex flex-wrap gap-2 justify-center">
        <button
          onClick={measure} disabled={phase !== 'ready'}
          className="px-4 py-2 rounded-lg text-xs font-medium text-white transition-all duration-200 disabled:opacity-30"
          style={phase === 'ready' ? {
            background: 'linear-gradient(135deg, #FF6B35, #FF2D78)',
            boxShadow: '0 0 20px #FF6B3540',
          } : {
            background: '#242840',
          }}
        >Medir Alice</button>
        <button onClick={reset}
          className="px-4 py-2 rounded-lg text-xs font-medium text-text-muted bg-elevated border border-white/5 hover:text-text-secondary transition-all"
        >Reemaranhar</button>
        <button onClick={runMany} disabled={phase === 'measuringA'}
          className="px-4 py-2 rounded-lg text-xs font-medium text-accent-pink bg-accent-pink/10 border border-accent-pink/20 hover:bg-accent-pink/20 disabled:opacity-30 transition-all"
        >Rodar 200×</button>
      </div>

      {history.length > 0 && (
        <div className="w-full max-w-[420px]">
          <p className="text-xs text-text-muted font-mono mb-3">
            {history.length} medições · Alice e Bob sempre concordam
          </p>
          <ProbBar label="concordam (00 ou 11)" value={agree / history.length} color="#FF6B35" highlight />
          <div className="h-1.5" />
          <ProbBar label="discordam (01 ou 10)" value={disagree / history.length} color="#2A2E42" />
          <div className="flex gap-[2px] mt-4 h-8 items-end">
            {history.slice(0, 80).map((p, i) => (
              <div key={i} className="flex-1 rounded-sm transition-all duration-300"
                style={{
                  height: p[0] === p[1] ? (p[0] === 0 ? 22 : 32) : 12,
                  background: p[0] === p[1]
                    ? (p[0] === 0 ? '#00D4FF' : '#FF2D78')
                    : '#2A2E42',
                  opacity: 0.8,
                }}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
