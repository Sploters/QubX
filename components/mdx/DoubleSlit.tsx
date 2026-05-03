'use client'

import { useState, useEffect, useCallback, useMemo, useRef } from 'react'

interface Hit { y: number; id: number }

const W = 600, H = 380
const SLIT_X = 220, SCREEN_X = 520
const SLIT1_Y = H / 2 - 32, SLIT2_Y = H / 2 + 32
const SOURCE_X = 60, SOURCE_Y = H / 2
const WAVELENGTH = 14

export function DoubleSlit() {
  const hitIdRef = useRef(0)
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

  useEffect(() => {
    if (!running) return
    const id = setInterval(() => {
      setHits(h => {
        const fresh = Array.from({ length: 6 }, () => ({ y: sampleY(), id: hitIdRef.current++ }))
        return [...h, ...fresh].slice(-1500)
      })
    }, 60)
    return () => clearInterval(id)
  }, [running, sampleY])

  useEffect(() => { setHits([]) }, [observed])

  useEffect(() => {
    if (!running) return
    let raf: number
    const step = () => { setTick(t => t + 0.02); raf = requestAnimationFrame(step) }
    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [running])

  const intensityBars = useMemo(
    () => Array.from({ length: 80 }, (_, i) => {
      const y = (i / 80) * H
      return { y, w: Math.max(2, screenIntensity(y) * 60) }
    }),
    [screenIntensity]
  )

  const color = observed ? '#FF2D78' : '#00D4FF'
  const glowFilter = observed ? 'url(#ds-glow-pink)' : 'url(#ds-glow-cyan)'

  return (
    <div className="my-10 rounded-2xl border border-white/5 bg-gradient-to-br from-surface/60 to-background p-4 flex flex-col items-center gap-4">
      <svg
        width="100%"
        style={{ maxWidth: W }}
        viewBox={`0 0 ${W} ${H}`}
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <filter id="ds-glow-cyan">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <filter id="ds-glow-pink">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <filter id="ds-glow-strong">
            <feGaussianBlur stdDeviation="3" />
          </filter>
          <radialGradient id="sourceGlow">
            <stop offset="0%" stopColor="#FF6B35" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#FF6B35" stopOpacity="0" />
          </radialGradient>
        </defs>

        <circle cx={SOURCE_X} cy={SOURCE_Y} r="20" fill="url(#sourceGlow)" />
        <circle cx={SOURCE_X} cy={SOURCE_Y} r="6" fill="#FF6B35" filter="url(#ds-glow-strong)" />
        <text x={SOURCE_X} y={SOURCE_Y - 16} textAnchor="middle"
              fill="#FF6B35" fontFamily="ui-monospace,monospace" fontSize="10" fontWeight="bold">e⁻</text>

        {!observed && [30, 60, 90, 120, 150].map(r => {
          const phase = (tick * 60 - r) / 200
          if (phase <= 0 || phase >= 1) return null
          return (
            <circle key={r} cx={SOURCE_X} cy={SOURCE_Y}
                    r={r + (tick * 60 % 28)}
                    fill="none" stroke="#00D4FF" strokeWidth="0.7" opacity={0.25 * (1 - phase)} />
          )
        })}

        <rect x={SLIT_X - 4} y={0}              width="8" height={SLIT1_Y - 16} fill="#2A2E42" rx="1" />
        <rect x={SLIT_X - 4} y={SLIT1_Y + 16}  width="8" height={SLIT2_Y - SLIT1_Y - 32} fill="#2A2E42" rx="1" />
        <rect x={SLIT_X - 4} y={SLIT2_Y + 16}  width="8" height={H - SLIT2_Y - 16} fill="#2A2E42" rx="1" />

        {observed && (
          <>
            <rect x={SLIT_X - 16} y={SLIT1_Y - 16} width="32" height="32"
                  fill="none" stroke="#FF2D78" strokeWidth="1" strokeDasharray="3,4" rx="2" opacity="0.7" />
            <rect x={SLIT_X - 16} y={SLIT2_Y - 16} width="32" height="32"
                  fill="none" stroke="#FF2D78" strokeWidth="1" strokeDasharray="3,4" rx="2" opacity="0.7" />
            <text x={SLIT_X} y={14} textAnchor="middle"
                  fill="#FF2D78" fontFamily="ui-monospace,monospace" fontSize="8" fontWeight="bold">DETECTOR ATIVO</text>
          </>
        )}

        {!observed && [SLIT1_Y, SLIT2_Y].map((sy, si) => (
          <g key={si}>
            {[40, 70, 100, 130, 160, 190, 220, 250].map(r => {
              const phase = (tick * 60 - r) / 280
              if (phase <= 0 || phase >= 1) return null
              return (
                <circle key={r} cx={SLIT_X} cy={sy} r={r}
                        fill="none" stroke="#00D4FF" strokeWidth="0.6" opacity={0.3 * (1 - phase)} />
              )
            })}
          </g>
        ))}

        <line x1={SCREEN_X} y1={0} x2={SCREEN_X} y2={H} stroke="#2A2E42" strokeWidth="1.5" />

        <g transform={`translate(${SCREEN_X + 8}, 0)`}>
          {intensityBars.map(({ y, w }, i) => (
            <rect key={i} x={0} y={y} width={w} height={H / 80} fill={color} opacity="0.3" rx="1" />
          ))}
        </g>

        {hits.map(h => (
          <circle key={h.id} cx={SCREEN_X - 1} cy={h.y} r="2" fill={color} opacity="0.8" filter={glowFilter} />
        ))}

        <text x={W - 14} y={H - 14} textAnchor="end"
              fill="#6B6B80" fontFamily="ui-monospace,monospace" fontSize="10">
          {hits.length} elétrons
        </text>
      </svg>

      <div className="flex flex-wrap gap-2 justify-center">
        <button
          onClick={() => setObserved(false)}
          className={`px-4 py-2 rounded-lg text-xs font-medium transition-all duration-200 ${
            !observed
              ? 'text-white shadow-lg'
              : 'text-text-muted bg-elevated border border-white/5 hover:text-text-secondary'
          }`}
          style={!observed ? {
            background: 'linear-gradient(135deg, #00D4FF, #8b5cf6)',
            boxShadow: '0 0 20px #00D4FF40',
          } : undefined}
        >Sem medir fenda</button>
        <button
          onClick={() => setObserved(true)}
          className={`px-4 py-2 rounded-lg text-xs font-medium transition-all duration-200 ${
            observed
              ? 'text-white shadow-lg'
              : 'text-text-muted bg-elevated border border-white/5 hover:text-text-secondary'
          }`}
          style={observed ? {
            background: 'linear-gradient(135deg, #FF2D78, #FF6B35)',
            boxShadow: '0 0 20px #FF2D7840',
          } : undefined}
        >Medir &quot;qual fenda?&quot;</button>
        <button onClick={() => setHits([])}
          className="px-4 py-2 rounded-lg text-xs font-medium text-text-muted bg-elevated border border-white/5 hover:text-text-secondary transition-all"
        >Limpar</button>
        <button onClick={() => setRunning(r => !r)}
          className="px-4 py-2 rounded-lg text-xs font-medium text-text-muted bg-elevated border border-white/5 hover:text-text-secondary transition-all"
        >{running ? 'Pausar' : 'Continuar'}</button>
      </div>
    </div>
  )
}
