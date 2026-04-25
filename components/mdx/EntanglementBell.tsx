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
  const border = resolved ? (result === 0 ? '#06b6d4' : '#ec4899') : '#2d2d45'
  const bg = resolved
    ? `radial-gradient(circle at 35% 30%, ${result === 0 ? 'rgba(6,182,212,0.3)' : 'rgba(236,72,153,0.3)'}, #13131f)`
    : '#13131f'

  return (
    <div style={{ textAlign: 'center' }}>
      <div style={{
        width: 100, height: 100, borderRadius: '50%',
        border: `1.5px solid ${border}`,
        background: bg,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        position: 'relative',
        transition: 'all 400ms',
        boxShadow: measuring ? '0 0 30px #f59e0b' : 'none',
        margin: '0 auto',
      }}>
        {superposed && (
          <>
            <span style={{
              position: 'absolute', fontFamily: 'ui-monospace,monospace', fontSize: 20, color: '#06b6d4',
              transform: `translate(${-14 + Math.sin(tick * 2) * 2}px, ${-6 + Math.cos(tick * 2) * 2}px)`,
              opacity: 0.85,
            }}>|0⟩</span>
            <span style={{
              position: 'absolute', fontFamily: 'ui-monospace,monospace', fontSize: 20, color: '#ec4899',
              transform: `translate(${14 + Math.sin(tick * 2 + 2) * 2}px, ${6 + Math.cos(tick * 2 + 2) * 2}px)`,
              opacity: 0.85,
            }}>|1⟩</span>
          </>
        )}
        {resolved && (
          <span style={{
            fontFamily: 'ui-monospace,monospace', fontSize: 42,
            color: result === 0 ? '#06b6d4' : '#ec4899',
          }}>|{result}⟩</span>
        )}
      </div>
      <p style={{
        marginTop: 8,
        fontFamily: 'ui-monospace,monospace', fontSize: 11,
        color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.12em',
      }}>{label}</p>
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
    <div className="my-10 rounded-2xl border border-border bg-surface/20 p-6 flex flex-col items-center gap-6">

      {/* Qubits + entanglement link */}
      <div style={{ position: 'relative', width: '100%', maxWidth: 500, height: 160 }}>
        <svg width="100%" height="160" viewBox="0 0 500 160"
             style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
          <defs>
            <linearGradient id="bellLinkGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%"   stopColor="#06b6d4" />
              <stop offset="50%"  stopColor="#f59e0b" />
              <stop offset="100%" stopColor="#ec4899" />
            </linearGradient>
          </defs>
          {phase === 'ready' && (
            <>
              <path d={`M 100 80 Q ${250 + Math.sin(tick*2)*16} ${60+Math.sin(tick*3)*24} 400 80`}
                    fill="none" stroke="url(#bellLinkGrad)" strokeWidth="1.8" opacity="0.7" strokeDasharray="4 4"/>
              <path d={`M 100 80 Q ${250+Math.sin(tick*2+1)*16} ${100+Math.cos(tick*3)*24} 400 80`}
                    fill="none" stroke="url(#bellLinkGrad)" strokeWidth="1.8" opacity="0.4" strokeDasharray="4 4"/>
            </>
          )}
          {phase === 'measuringA' && (
            <line x1="100" y1="80" x2="400" y2="80"
                  stroke="#f59e0b" strokeWidth="2" opacity={Math.abs(Math.sin(tick * 15))} />
          )}
          {phase === 'done' && (
            <line x1="100" y1="80" x2="400" y2="80"
                  stroke="#2d2d45" strokeWidth="1" strokeDasharray="4 6" opacity="0.4" />
          )}
        </svg>
        <div style={{ position: 'absolute', left: 50,  top: 30 }}>
          <QubitNode label="Alice" result={aliceResult}
            measuring={phase === 'measuringA'} superposed={phase === 'ready'} tick={tick} />
        </div>
        <div style={{ position: 'absolute', right: 50, top: 30 }}>
          <QubitNode label="Bob" result={bobResult} measuring={false}
            superposed={phase === 'ready' || phase === 'measuringA'}
            tick={tick + 1.3} delayed={phase === 'measuringA'} />
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-wrap gap-2 justify-center">
        <button
          onClick={measure} disabled={phase !== 'ready'}
          className="px-4 py-2 rounded-lg text-sm font-medium bg-purple text-white disabled:opacity-40 transition-opacity"
        >Medir Alice</button>
        <button onClick={reset}
          className="px-4 py-2 rounded-lg text-sm font-medium border border-border bg-surface text-text-secondary hover:border-purple/50 transition-colors"
        >↺ Reemaranhar</button>
        <button onClick={runMany} disabled={phase === 'measuringA'}
          className="px-4 py-2 rounded-lg text-sm font-medium border border-[#ec4899] bg-[#ec4899]/10 text-[#ec4899] hover:bg-[#ec4899]/20 disabled:opacity-40 transition-colors"
        >Rodar 200×</button>
      </div>

      {/* Histogram */}
      {history.length > 0 && (
        <div style={{ width: '100%', maxWidth: 420 }}>
          <p className="text-xs text-text-muted font-mono mb-3">
            {history.length} medições · Alice e Bob sempre concordam em |Φ+⟩
          </p>
          <ProbBar label="concordam (00 ou 11)" value={agree / history.length} color="#22c55e" highlight />
          <div style={{ height: 6 }} />
          <ProbBar label="discordam (01 ou 10)" value={disagree / history.length} color="#ef4444" />
          <div style={{ display: 'flex', gap: 2, marginTop: 16, height: 36, alignItems: 'flex-end' }}>
            {history.slice(0, 80).map((p, i) => (
              <div key={i} style={{
                flex: 1,
                height: p[0] === p[1] ? (p[0] === 0 ? 22 : 36) : 16,
                background: p[0] === p[1] ? (p[0] === 0 ? '#06b6d4' : '#ec4899') : '#ef4444',
                borderRadius: 1, opacity: 0.8,
              }} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
