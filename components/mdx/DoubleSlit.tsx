'use client'

import { useState, useEffect, useCallback } from 'react'

interface Hit { y: number; id: number }

const W = 600, H = 380
const SLIT_X = 220, SCREEN_X = 520
const SLIT1_Y = H / 2 - 32, SLIT2_Y = H / 2 + 32
const SOURCE_X = 60, SOURCE_Y = H / 2
const WAVELENGTH = 14

export function DoubleSlit() {
  const [observed, setObserved] = useState(false)
  const [hits, setHits] = useState<Hit[]>([])
  const [running, setRunning] = useState(true)
  const [tick, setTick] = useState(0)

  const screenIntensity = useCallback((y: number): number => {
    if (observed) {
      return (
        Math.exp(-Math.pow((y - SLIT1_Y) / 50, 2)) +
        Math.exp(-Math.pow((y - SLIT2_Y) / 50, 2))
      )
    }
    const d = SLIT2_Y - SLIT1_Y
    const L = SCREEN_X - SLIT_X
    const theta = (y - H / 2) / L
    const phaseDiff = (2 * Math.PI / WAVELENGTH) * d * theta
    const env = Math.exp(-Math.pow((y - H / 2) / 130, 2))
    return env * Math.pow(Math.cos(phaseDiff / 2), 2)
  }, [observed])

  const sampleY = useCallback((): number => {
    for (let i = 0; i < 50; i++) {
      const y = Math.random() * H
      if (Math.random() < screenIntensity(y)) return y
    }
    return H / 2
  }, [screenIntensity])

  // Accumulate hits
  useEffect(() => {
    if (!running) return
    const id = setInterval(() => {
      setHits(h => {
        const fresh = Array.from({ length: 6 }, () => ({ y: sampleY(), id: Math.random() }))
        return [...h, ...fresh].slice(-1500)
      })
    }, 60)
    return () => clearInterval(id)
  }, [running, sampleY])

  // Clear hits when observer toggled
  useEffect(() => { setHits([]) }, [observed])

  // Animation tick for wavefronts
  useEffect(() => {
    let raf: number
    const step = () => { setTick(t => t + 0.02); raf = requestAnimationFrame(step) }
    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [])

  const color = observed ? '#ef4444' : '#06b6d4'

  return (
    <div className="my-10 rounded-2xl border border-border bg-surface/20 p-4 flex flex-col items-center gap-4">
      <svg
        width="100%"
        style={{ maxWidth: W }}
        viewBox={`0 0 ${W} ${H}`}
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Electron source */}
        <circle cx={SOURCE_X} cy={SOURCE_Y} r="6" fill="#f59e0b" />
        <text x={SOURCE_X} y={SOURCE_Y - 14} textAnchor="middle"
              fill="#f59e0b" fontFamily="ui-monospace,monospace" fontSize="10">e⁻</text>

        {/* Wavefronts from source */}
        {!observed && [30, 60, 90, 120, 150].map(r => {
          const phase = (tick * 60 - r) / 200
          if (phase <= 0 || phase >= 1) return null
          return (
            <circle key={r} cx={SOURCE_X} cy={SOURCE_Y}
                    r={r + (tick * 60 % 28)}
                    fill="none" stroke="#06b6d4" strokeWidth="0.6" opacity={0.3 * (1 - phase)} />
          )
        })}

        {/* Barrier */}
        <rect x={SLIT_X - 4} y={0}              width="8" height={SLIT1_Y - 16}               fill="#475569" />
        <rect x={SLIT_X - 4} y={SLIT1_Y + 16}  width="8" height={SLIT2_Y - SLIT1_Y - 32}     fill="#475569" />
        <rect x={SLIT_X - 4} y={SLIT2_Y + 16}  width="8" height={H - SLIT2_Y - 16}            fill="#475569" />

        {/* Which-path detectors */}
        {observed && (
          <>
            <rect x={SLIT_X-14} y={SLIT1_Y-14} width="28" height="28"
                  fill="none" stroke="#ef4444" strokeWidth="1.2" strokeDasharray="2 3" />
            <rect x={SLIT_X-14} y={SLIT2_Y-14} width="28" height="28"
                  fill="none" stroke="#ef4444" strokeWidth="1.2" strokeDasharray="2 3" />
            <text x={SLIT_X} y={16} textAnchor="middle"
                  fill="#ef4444" fontFamily="ui-monospace,monospace" fontSize="9">DETECTORES</text>
          </>
        )}

        {/* Wavefronts after slits */}
        {!observed && [SLIT1_Y, SLIT2_Y].map((sy, si) => (
          <g key={si}>
            {[40, 70, 100, 130, 160, 190, 220, 250].map(r => {
              const phase = (tick * 60 - r) / 280
              if (phase <= 0 || phase >= 1) return null
              return <circle key={r} cx={SLIT_X} cy={sy} r={r}
                             fill="none" stroke="#06b6d4" strokeWidth="0.6" opacity={0.35 * (1 - phase)} />
            })}
          </g>
        ))}

        {/* Detection screen */}
        <line x1={SCREEN_X} y1={0} x2={SCREEN_X} y2={H} stroke="#2d2d45" strokeWidth="1.5" />

        {/* Predicted intensity profile */}
        <g transform={`translate(${SCREEN_X + 8}, 0)`}>
          {Array.from({ length: 80 }, (_, i) => {
            const y = (i / 80) * H
            return (
              <rect key={i} x={0} y={y}
                    width={Math.max(2, screenIntensity(y) * 60)}
                    height={H / 80} fill={color} opacity="0.35" />
            )
          })}
        </g>

        {/* Accumulated hits */}
        {hits.map(h => (
          <circle key={h.id} cx={SCREEN_X - 1} cy={h.y} r="1.5" fill={color} opacity="0.85" />
        ))}

        <text x={W - 14} y={H - 14} textAnchor="end"
              fill="#475569" fontFamily="ui-monospace,monospace" fontSize="11">
          {hits.length} elétrons
        </text>
      </svg>

      {/* Controls */}
      <div className="flex flex-wrap gap-2 justify-center">
        <button
          onClick={() => setObserved(false)}
          className={`px-4 py-2 rounded-lg text-sm font-medium border transition-colors ${
            !observed ? 'bg-purple border-purple text-white' : 'border-border bg-surface text-text-secondary hover:border-purple/50'
          }`}
        >Sem medir fenda</button>
        <button
          onClick={() => setObserved(true)}
          className={`px-4 py-2 rounded-lg text-sm font-medium border transition-colors ${
            observed ? 'bg-[#ef4444] border-[#ef4444] text-white' : 'border-border bg-surface text-text-secondary hover:border-[#ef4444]/50'
          }`}
        >Medir &quot;qual fenda?&quot;</button>
        <button onClick={() => setHits([])}
          className="px-4 py-2 rounded-lg text-sm font-medium border border-border bg-surface text-text-secondary hover:border-purple/50 transition-colors"
        >↺ Limpar</button>
        <button onClick={() => setRunning(r => !r)}
          className="px-4 py-2 rounded-lg text-sm font-medium border border-border bg-surface text-text-secondary hover:border-purple/50 transition-colors"
        >{running ? '⏸ Pausar' : '▶ Disparar'}</button>
      </div>
    </div>
  )
}
