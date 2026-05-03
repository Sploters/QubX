'use client'

import { useState, useEffect, useCallback, useMemo, useRef, memo } from 'react'

interface Hit { y: number; id: number }

const W = 600, H = 380
const SLIT_X = 220, SCREEN_X = 520
const SLIT1_Y = H / 2 - 32, SLIT2_Y = H / 2 + 32
const SOURCE_X = 60, SOURCE_Y = H / 2
const WAVELENGTH = 14

const HitCircles = memo(function HitCircles({ hits, color }: { hits: Hit[]; color: string }) {
  return (
    <>
      {hits.map(h => (
        <circle key={h.id} cx={SCREEN_X - 1} cy={h.y} r="1.5" fill={color} opacity="0.8" />
      ))}
    </>
  )
})

const staticElements = (
  <>
    <rect x={SLIT_X - 4} y={0} width="8" height={SLIT1_Y - 16} fill="#2A2E42" rx="1" />
    <rect x={SLIT_X - 4} y={SLIT1_Y + 16} width="8" height={SLIT2_Y - SLIT1_Y - 32} fill="#2A2E42" rx="1" />
    <rect x={SLIT_X - 4} y={SLIT2_Y + 16} width="8" height={H - SLIT2_Y - 16} fill="#2A2E42" rx="1" />
    <line x1={SCREEN_X} y1={0} x2={SCREEN_X} y2={H} stroke="#2A2E42" strokeWidth="1.5" />
  </>
)

export function DoubleSlit() {
  const hitIdRef = useRef(0)
  const [observed, setObserved] = useState(false)
  const [hits, setHits] = useState<Hit[]>([])
  const [running, setRunning] = useState(true)

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
    for (let i = 0; i < 15; i++) {
      const y = Math.random() * H
      if (Math.random() < screenIntensity(y)) return y
    }
    return H / 2
  }, [screenIntensity])

  useEffect(() => {
    if (!running) return
    const id = setInterval(() => {
      setHits(h => {
        const fresh = Array.from({ length: 5 }, () => ({ y: sampleY(), id: hitIdRef.current++ }))
        return [...h, ...fresh].slice(-1500)
      })
    }, 80)
    return () => clearInterval(id)
  }, [running, sampleY])

  useEffect(() => { setHits([]) }, [observed])

  const intensityBars = useMemo(
    () => Array.from({ length: 80 }, (_, i) => {
      const y = (i / 80) * H
      return { y, w: Math.max(2, screenIntensity(y) * 60) }
    }),
    [screenIntensity]
  )

  const color = observed ? '#FF2D78' : '#00D4FF'

  return (
    <div className="my-10 rounded-2xl border border-white/5 bg-gradient-to-br from-surface/60 to-background p-4 flex flex-col items-center gap-4">
      <svg
        width="100%"
        style={{ maxWidth: W }}
        viewBox={`0 0 ${W} ${H}`}
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <radialGradient id="srcGlow">
            <stop offset="0%" stopColor="#FF6B35" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#FF6B35" stopOpacity="0" />
          </radialGradient>
        </defs>

        <style>
          {`
            @keyframes waveExpand {
              0% { opacity: 0.35; }
              100% { opacity: 0; transform: scale(var(--scale, 1)); }
            }
            @keyframes sourcePulse {
              0%, 100% { opacity: 0.5; r: 6; }
              50% { opacity: 1; r: 7; }
            }
            .wave-source { animation: waveExpand 2s ease-out infinite; transform-origin: ${SOURCE_X}px ${SOURCE_Y}px; }
            .wave-source:nth-child(1) { animation-delay: 0s; --scale: 1.3; }
            .wave-source:nth-child(2) { animation-delay: 0.4s; --scale: 1.6; }
            .wave-source:nth-child(3) { animation-delay: 0.8s; --scale: 2; }
            .wave-source:nth-child(4) { animation-delay: 1.2s; --scale: 2.3; }
            .wave-source:nth-child(5) { animation-delay: 1.6s; --scale: 2.6; }
            .wave-slit { animation: waveExpand 2.5s ease-out infinite; transform-origin: ${SLIT_X}px var(--sy); }
            .wave-slit:nth-child(1) { animation-delay: 0s; --scale: 1.3; --sy: ${SLIT1_Y}px; }
            .wave-slit:nth-child(2) { animation-delay: 0.3s; --scale: 1.6; --sy: ${SLIT1_Y}px; }
            .wave-slit:nth-child(3) { animation-delay: 0.6s; --scale: 2; --sy: ${SLIT1_Y}px; }
            .wave-slit:nth-child(4) { animation-delay: 0.9s; --scale: 2.3; --sy: ${SLIT1_Y}px; }
            .wave-slit:nth-child(5) { animation-delay: 1.2s; --scale: 2.6; --sy: ${SLIT1_Y}px; }
            .wave-slit:nth-child(6) { animation-delay: 0s; --scale: 1.3; --sy: ${SLIT2_Y}px; }
            .wave-slit:nth-child(7) { animation-delay: 0.3s; --scale: 1.6; --sy: ${SLIT2_Y}px; }
            .wave-slit:nth-child(8) { animation-delay: 0.6s; --scale: 2; --sy: ${SLIT2_Y}px; }
            .wave-slit:nth-child(9) { animation-delay: 0.9s; --scale: 2.3; --sy: ${SLIT2_Y}px; }
            .wave-slit:nth-child(10) { animation-delay: 1.2s; --scale: 2.6; --sy: ${SLIT2_Y}px; }
            .source-glow { animation: sourcePulse 2s ease-in-out infinite; }
          `}
        </style>

        <circle cx={SOURCE_X} cy={SOURCE_Y} r="20" fill="url(#srcGlow)" />
        <circle cx={SOURCE_X} cy={SOURCE_Y} r="6" fill="#FF6B35" className="source-glow" />
        <text x={SOURCE_X} y={SOURCE_Y - 16} textAnchor="middle"
              fill="#FF6B35" fontFamily="ui-monospace,monospace" fontSize="10" fontWeight="bold">e⁻</text>

        {!observed && (
          <>
            {[1, 2, 3, 4, 5].map(i => (
              <circle key={`sw${i}`} className="wave-source"
                      cx={SOURCE_X} cy={SOURCE_Y} r={20 + i * 25}
                      fill="none" stroke="#00D4FF" strokeWidth="0.7" />
            ))}
            {[1, 2, 3, 4, 5].map(i => (
              <circle key={`s1-${i}`} className="wave-slit"
                      cx={SLIT_X} cy={SLIT1_Y} r={30 + i * 25}
                      fill="none" stroke="#00D4FF" strokeWidth="0.6" />
            ))}
            {[1, 2, 3, 4, 5].map(i => (
              <circle key={`s2-${i}`} className="wave-slit"
                      cx={SLIT_X} cy={SLIT2_Y} r={30 + i * 25}
                      fill="none" stroke="#00D4FF" strokeWidth="0.6" />
            ))}
          </>
        )}

        {staticElements}

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

        <g transform={`translate(${SCREEN_X + 8}, 0)`}>
          {intensityBars.map(({ y, w }, i) => (
            <rect key={i} x={0} y={y} width={w} height={H / 80} fill={color} opacity="0.3" rx="1" />
          ))}
        </g>

        <HitCircles hits={hits} color={color} />

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
