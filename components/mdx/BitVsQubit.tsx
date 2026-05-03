'use client'

import { useClock, project3D } from '@/lib/animation-helpers'

export function BitVsQubit() {
  const { t } = useClock({ duration: 8, loop: true })

  const cbit = Math.floor(t / 1.5) % 2

  const theta = Math.PI * (0.5 + 0.35 * Math.sin(t * 0.9))
  const phi = t * 0.8
  const qx = Math.sin(theta) * Math.cos(phi)
  const qy = Math.sin(theta) * Math.sin(phi)
  const qz = Math.cos(theta)

  const R = 90
  const yaw = 0.4 + Math.sin(t * 0.15) * 0.1
  const pitch = -0.2

  const sp = project3D(qx, qy, qz, yaw, pitch, R)
  const north = project3D(0, 0, 1, yaw, pitch, R)
  const south = project3D(0, 0, -1, yaw, pitch, R)

  const wirePts = (fn: (a: number) => [number, number, number]) => {
    const out: string[] = []
    for (let i = 0; i <= 48; i++) {
      const a = (i / 48) * Math.PI * 2
      const [x, y, z] = fn(a)
      const p = project3D(x, y, z, yaw, pitch, R)
      out.push(`${p.x.toFixed(1)},${p.y.toFixed(1)}`)
    }
    return out.join(' ')
  }

  const equator = wirePts(a => [Math.cos(a), Math.sin(a), 0])
  const meridian = wirePts(a => [0, Math.sin(a), Math.cos(a)])

  const glowId = 'bq-glow'
  const bitColors = ['#00D4FF', '#FF2D78']

  return (
    <div className="my-10 flex flex-col md:flex-row items-stretch justify-center rounded-2xl overflow-hidden border border-white/5 bg-gradient-to-br from-surface/80 to-background">
      <div className="flex-1 flex flex-col items-center justify-center gap-5 p-8 border-b md:border-b-0 md:border-r border-white/5">
        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-text-muted">BIT CLÁSSICO</p>
        <div className="relative w-[180px] h-[180px] flex items-center justify-center">
          <div
            className="absolute inset-0 rounded-full opacity-20"
            style={{
              background: `radial-gradient(circle, ${bitColors[cbit]}40, transparent 70%)`,
            }}
          />
          <div
            className="w-[160px] h-[160px] rounded-full flex items-center justify-center backdrop-blur-sm"
            style={{
              border: `1px solid ${bitColors[cbit]}30`,
              background: `radial-gradient(circle at 35% 35%, ${bitColors[cbit]}15, #13131f 80%)`,
              boxShadow: `inset 0 0 60px ${bitColors[cbit]}10, 0 0 40px ${bitColors[cbit]}10`,
            }}
          >
            <span
              className="font-mono font-bold transition-all duration-500"
              style={{
                fontSize: 100,
                lineHeight: 1,
                color: bitColors[cbit],
                textShadow: `0 0 40px ${bitColors[cbit]}40, 0 0 80px ${bitColors[cbit]}20`,
              }}
            >
              {cbit}
            </span>
          </div>
        </div>
        <div className="text-center space-y-1">
          <p className="text-sm font-semibold text-text-primary">0 ou 1. Nada entre.</p>
          <p className="text-xs text-text-muted font-mono">b ∈ {0} ou {1}</p>
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center gap-5 p-8">
        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-accent-orange/60">QUBIT</p>
        <svg width="210" height="210" viewBox="-110 -110 220 220" className="overflow-visible">
          <defs>
            <radialGradient id="sphere-bg">
              <stop offset="0%" stopColor="#FF6B35" stopOpacity="0.08" />
              <stop offset="100%" stopColor="#FF2D78" stopOpacity="0.02" />
            </radialGradient>
            <filter id={glowId}>
              <feGaussianBlur stdDeviation="2" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <filter id="glow-strong">
              <feGaussianBlur stdDeviation="3" />
            </filter>
          </defs>

          <circle cx="0" cy="0" r={R} fill="url(#sphere-bg)" stroke="#2A2E42" strokeWidth="0.8" />
          <circle cx="0" cy="0" r={R} fill="none" stroke="#FF6B35" strokeWidth="0.3" opacity="0.3" />

          <polyline points={equator} fill="none" stroke="#2A2E42" strokeWidth="0.6" strokeDasharray="3,4" opacity="0.6" />
          <polyline points={meridian} fill="none" stroke="#2A2E42" strokeWidth="0.6" strokeDasharray="3,4" opacity="0.6" />

          <circle cx={north.x} cy={north.y} r="3" fill="#00D4FF" filter={`url(${glowId})`} />
          <circle cx={north.x} cy={north.y} r="6" fill="#00D4FF" opacity="0.2" />
          <text x={north.x + 8} y={north.y + 4} fill="#00D4FF" fontFamily="ui-monospace, monospace" fontSize="10" fontWeight="bold">|0⟩</text>

          <circle cx={south.x} cy={south.y} r="3" fill="#FF2D78" filter={`url(${glowId})`} />
          <circle cx={south.x} cy={south.y} r="6" fill="#FF2D78" opacity="0.2" />
          <text x={south.x + 8} y={south.y + 4} fill="#FF2D78" fontFamily="ui-monospace, monospace" fontSize="10" fontWeight="bold">|1⟩</text>

          <line x1="0" y1="0" x2={sp.x} y2={sp.y} stroke="#FFD166" strokeWidth="1.5" filter={`url(${glowId})`} opacity="0.8" />
          <circle cx={sp.x} cy={sp.y} r="5" fill="#FFD166" filter={`url(${glowId})`} />
          <circle cx={sp.x} cy={sp.y} r="12" fill="#FFD166" opacity="0.15" filter="url(#glow-strong)" />
        </svg>
        <div className="text-center space-y-1">
          <p className="text-sm font-semibold text-text-primary">Infinitos estados na esfera.</p>
          <p className="text-xs text-text-muted font-mono">|ψ⟩ = α|0⟩ + β|1⟩</p>
        </div>
      </div>
    </div>
  )
}
