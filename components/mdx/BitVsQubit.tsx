'use client'

import { useClock, project3D } from '@/lib/animation-helpers'

export function BitVsQubit() {
  const { t } = useClock({ duration: 8, loop: true })

  // Classical bit flips every 1.5 s
  const cbit = Math.floor(t / 1.5) % 2

  // Qubit: state vector traces smooth path on Bloch sphere
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
      out.push(`${p.x},${p.y}`)
    }
    return out.join(' ')
  }

  const equator = wirePts(a => [Math.cos(a), Math.sin(a), 0])
  const meridian = wirePts(a => [0, Math.sin(a), Math.cos(a)])

  return (
    <div className="my-10 flex flex-col md:flex-row items-stretch justify-center rounded-2xl overflow-hidden border border-border bg-surface/20">

      {/* ── BIT CLÁSSICO ── */}
      <div className="flex-1 flex flex-col items-center justify-center gap-6 p-8 border-b md:border-b-0 md:border-r border-border">
        <p className="text-[11px] font-bold uppercase tracking-widest text-cyan/60">BIT CLÁSSICO</p>
        <div style={{
          width: 200, height: 200, borderRadius: '50%',
          border: '1px solid #1e1e30',
          background: '#13131f',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <span style={{
            fontFamily: 'ui-monospace, monospace',
            fontSize: 100, lineHeight: 1,
            color: cbit === 0 ? '#06b6d4' : '#ec4899',
            transition: 'color 200ms',
          }}>
            {cbit}
          </span>
        </div>
        <div className="text-center space-y-1">
          <p className="text-sm font-semibold text-text-primary">Dois estados. 0 ou 1. Nada entre.</p>
          <p className="text-xs text-text-secondary font-mono">b ∈ {'{'}<span style={{color:'#06b6d4'}}>0</span>, <span style={{color:'#ec4899'}}>1</span>{'}'}</p>
        </div>
      </div>

      {/* ── QUBIT ── */}
      <div className="flex-1 flex flex-col items-center justify-center gap-6 p-8">
        <p className="text-[11px] font-bold uppercase tracking-widest" style={{ color: '#a78bfa80' }}>QUBIT</p>
        <svg width="220" height="220" viewBox="-110 -110 220 220">
          <circle cx="0" cy="0" r={R} fill="rgba(30,30,60,0.5)" stroke="#2d2d45" strokeWidth="0.8" />
          <polyline points={equator} fill="none" stroke="#2d2d45" strokeWidth="0.8" strokeDasharray="2 3" opacity="0.7" />
          <polyline points={meridian} fill="none" stroke="#2d2d45" strokeWidth="0.8" strokeDasharray="2 3" opacity="0.7" />
          {/* Poles */}
          <circle cx={north.x} cy={north.y} r="3" fill="#06b6d4" />
          <text x={north.x + 7} y={north.y + 4} fill="#06b6d4" fontFamily="ui-monospace, monospace" fontSize="11">|0⟩</text>
          <circle cx={south.x} cy={south.y} r="3" fill="#ec4899" />
          <text x={south.x + 7} y={south.y + 4} fill="#ec4899" fontFamily="ui-monospace, monospace" fontSize="11">|1⟩</text>
          {/* State vector */}
          <line x1="0" y1="0" x2={sp.x} y2={sp.y} stroke="#f59e0b" strokeWidth="1.5" />
          <circle cx={sp.x} cy={sp.y} r="5" fill="#f59e0b" />
          <circle cx={sp.x} cy={sp.y} r="10" fill="#f59e0b" opacity="0.2" />
        </svg>
        <div className="text-center space-y-1">
          <p className="text-sm font-semibold text-text-primary">Infinitos estados. Qualquer ponto na esfera.</p>
          <p className="text-xs text-text-secondary font-mono">|ψ⟩ = α|0⟩ + β|1⟩</p>
        </div>
      </div>

    </div>
  )
}
