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
    <div className="my-10 rounded-2xl border border-white/5 bg-gradient-to-br from-surface/60 to-background overflow-hidden">
      <div className="px-4 pt-3 pb-1 flex items-center justify-between border-b border-white/5">
        <div className="flex items-center gap-2">
          <span className={`w-2 h-2 rounded-full ${observed ? 'bg-accent-pink' : 'bg-accent-cyan'}`} />
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-text-muted">
            {observed ? 'MODO: DOIS BORRÕES' : 'MODO: INTERFERÊNCIA'}
          </span>
        </div>
        <span className="text-[10px] text-text-muted font-mono">{hits.length} elétrons</span>
      </div>

      <svg
        width="100%"
        style={{ maxWidth: W, display: 'block' }}
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
              100% { opacity: 0; }
            }
            @keyframes sourcePulse {
              0%, 100% { opacity: 0.5; }
              50% { opacity: 1; }
            }
            .wave-source { animation: waveExpand 2s ease-out infinite; transform-origin: ${SOURCE_X}px ${SOURCE_Y}px; }
            .wave-source:nth-child(1) { animation-delay: 0s; }
            .wave-source:nth-child(2) { animation-delay: 0.4s; }
            .wave-source:nth-child(3) { animation-delay: 0.8s; }
            .wave-source:nth-child(4) { animation-delay: 1.2s; }
            .wave-source:nth-child(5) { animation-delay: 1.6s; }
            .wave-slit { animation: waveExpand 2.5s ease-out infinite; transform-origin: ${SLIT_X}px var(--sy); }
            .wave-slit:nth-child(1) { animation-delay: 0s; --sy: ${SLIT1_Y}px; }
            .wave-slit:nth-child(2) { animation-delay: 0.3s; --sy: ${SLIT1_Y}px; }
            .wave-slit:nth-child(3) { animation-delay: 0.6s; --sy: ${SLIT1_Y}px; }
            .wave-slit:nth-child(4) { animation-delay: 0.9s; --sy: ${SLIT1_Y}px; }
            .wave-slit:nth-child(5) { animation-delay: 1.2s; --sy: ${SLIT1_Y}px; }
            .wave-slit:nth-child(6) { animation-delay: 0s; --sy: ${SLIT2_Y}px; }
            .wave-slit:nth-child(7) { animation-delay: 0.3s; --sy: ${SLIT2_Y}px; }
            .wave-slit:nth-child(8) { animation-delay: 0.6s; --sy: ${SLIT2_Y}px; }
            .wave-slit:nth-child(9) { animation-delay: 0.9s; --sy: ${SLIT2_Y}px; }
            .wave-slit:nth-child(10) { animation-delay: 1.2s; --sy: ${SLIT2_Y}px; }
          `}
        </style>

        <circle cx={SOURCE_X} cy={SOURCE_Y} r="24" fill="url(#srcGlow)" />
        <circle cx={SOURCE_X} cy={SOURCE_Y} r="6" fill="#FF6B35">
          <animate attributeName="opacity" values="0.5;1;0.5" dur="2s" repeatCount="indefinite" />
        </circle>
        <text x={SOURCE_X} y={SOURCE_Y - 16} textAnchor="middle"
              fill="#FF6B35" fontFamily="ui-monospace,monospace" fontSize="10" fontWeight="bold">e⁻</text>

        {!observed && (
          <>
            {[1, 2, 3, 4, 5].map(i => (
              <circle key={`sw${i}`} className="wave-source"
                      cx={SOURCE_X} cy={SOURCE_Y} r={20 + i * 28}
                      fill="none" stroke="#00D4FF" strokeWidth="0.7" />
            ))}
            {[1, 2, 3, 4, 5].map(i => (
              <circle key={`s1-${i}`} className="wave-slit"
                      cx={SLIT_X} cy={SLIT1_Y} r={30 + i * 30}
                      fill="none" stroke="#00D4FF" strokeWidth="0.6" />
            ))}
            {[1, 2, 3, 4, 5].map(i => (
              <circle key={`s2-${i}`} className="wave-slit"
                      cx={SLIT_X} cy={SLIT2_Y} r={30 + i * 30}
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

        {/* Legend: constructive / destructive */}
        {!observed && (
          <g>
            <rect x={SCREEN_X + 10} y="4" width="6" height="6" rx="1" fill={color} opacity="0.5" />
            <text x={SCREEN_X + 20} y="10" fill="#6B6B80" fontSize="7" fontFamily="monospace">construtiva</text>
            <rect x={SCREEN_X + 10} y="16" width="6" height="4" rx="1" fill={color} opacity="0.12" />
            <text x={SCREEN_X + 20} y="22" fill="#6B6B80" fontSize="7" fontFamily="monospace">destrutiva</text>
          </g>
        )}

        {/* Mode label on screen */}
        {!observed && (
          <text x={SCREEN_X} y="340" textAnchor="middle" fill="#00D4FF" fontSize="7" fontFamily="monospace" opacity="0.6">
            P(y) ∝ |ψ₁ + ψ₂|²
          </text>
        )}
        {observed && (
          <text x={SCREEN_X} y="340" textAnchor="middle" fill="#FF2D78" fontSize="7" fontFamily="monospace" opacity="0.6">
            P(y) = |ψ₁|² + |ψ₂|²
          </text>
        )}
      </svg>

      <div className="p-3 flex flex-wrap gap-2 justify-center border-t border-white/5">
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

      {/* Info panel */}
      <div className="px-4 pb-4">
        <div className={`rounded-xl p-3 border ${observed ? 'bg-accent-pink/5 border-accent-pink/10' : 'bg-accent-cyan/5 border-accent-cyan/10'}`}>
          <div className="flex items-start gap-3">
            <span className="text-base flex-shrink-0 mt-0.5">{observed ? '🔍' : '🌊'}</span>
            <div className="text-[11px] text-text-secondary leading-relaxed">
              {observed ? (
                <>
                  <strong className="text-accent-pink">Com detector:</strong> as ondas colapsam em partículas. Cada elétron passa por <strong>uma</strong> fenda. O padrão na tela é a <strong>soma das probabilidades individuais</strong>: P(y) = |ψ₁|² + |ψ₂|². Sem interferência.
                </>
              ) : (
                <>
                  <strong className="text-accent-cyan">Sem detector:</strong> cada elétron passa pelas <strong>duas fendas</strong> ao mesmo tempo. As ondas se somam antes de atingir a tela: P(y) ∝ |ψ₁ + ψ₂|². O resultado é o <strong>padrão de interferência</strong> — crista + crista = brilho, crista + vale = escuro.
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
