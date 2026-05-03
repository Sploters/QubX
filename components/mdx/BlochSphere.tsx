'use client'

import { useState, useEffect, useRef } from 'react'
import { project3D } from '@/lib/animation-helpers'

const PRESETS = {
  zero:   { theta: 0,             phi: 0,            label: '|0⟩' },
  one:    { theta: Math.PI,       phi: 0,            label: '|1⟩' },
  plus:   { theta: Math.PI / 2,   phi: 0,            label: '|+⟩' },
  minus:  { theta: Math.PI / 2,   phi: Math.PI,      label: '|−⟩' },
  iplus:  { theta: Math.PI / 2,   phi: Math.PI / 2,  label: '|+i⟩' },
  iminus: { theta: Math.PI / 2,   phi: -Math.PI / 2, label: '|−i⟩' },
} as const

type PresetKey = keyof typeof PRESETS
type PresetValue = { theta: number; phi: number; label: string }

const presetColors: Record<string, string> = {
  zero: '#00D4FF',
  one: '#FF2D78',
  plus: '#FF6B35',
  minus: '#8b5cf6',
  iplus: '#FFD166',
  iminus: '#00D4FF',
}

export function BlochSphere() {
  const [yaw, setYaw] = useState(0.6)
  const [pitch, setPitch] = useState(-0.25)
  const [dragging, setDragging] = useState(false)
  const dragStart = useRef<{ x: number; y: number; yaw: number; pitch: number } | null>(null)

  const [preset, setPreset] = useState<PresetKey>('plus')
  const [animFrom, setAnimFrom] = useState<PresetValue>(PRESETS.plus)
  const [animTo, setAnimTo] = useState<PresetValue>(PRESETS.plus)
  const [animT, setAnimT] = useState(1)

  useEffect(() => {
    setAnimFrom(cur => ({
      ...cur,
      theta: cur.theta + (animTo.theta - cur.theta) * animT,
      phi:   cur.phi   + (animTo.phi   - cur.phi)   * animT,
    }))
    setAnimTo(PRESETS[preset])
    setAnimT(0)
  }, [preset])

  useEffect(() => {
    if (animT >= 1) return
    let raf: number
    const start = performance.now()
    const step = (ts: number) => {
      const tt = Math.min(1, (ts - start) / 600)
      const eased = tt < 0.5 ? 2 * tt * tt : 1 - Math.pow(-2 * tt + 2, 2) / 2
      setAnimT(eased)
      if (tt < 1) raf = requestAnimationFrame(step)
    }
    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [animTo])

  const theta = animFrom.theta + (animTo.theta - animFrom.theta) * animT
  const phi   = animFrom.phi   + (animTo.phi   - animFrom.phi)   * animT
  const qx = Math.sin(theta) * Math.cos(phi)
  const qy = Math.sin(theta) * Math.sin(phi)
  const qz = Math.cos(theta)

  const R = 160
  const currentColor = presetColors[preset]

  const onMouseDown = (e: React.MouseEvent) => {
    setDragging(true)
    dragStart.current = { x: e.clientX, y: e.clientY, yaw, pitch }
  }

  useEffect(() => {
    if (!dragging) return
    const move = (e: MouseEvent) => {
      if (!dragStart.current) return
      setYaw(dragStart.current.yaw + (e.clientX - dragStart.current.x) * 0.01)
      setPitch(Math.max(-1.2, Math.min(1.2,
        dragStart.current.pitch - (e.clientY - dragStart.current.y) * 0.01
      )))
    }
    const up = () => setDragging(false)
    window.addEventListener('mousemove', move)
    window.addEventListener('mouseup', up)
    return () => { window.removeEventListener('mousemove', move); window.removeEventListener('mouseup', up) }
  }, [dragging])

  const wirePts = (fn: (a: number) => [number, number, number]) => {
    const pts: string[] = []
    for (let i = 0; i <= 64; i++) {
      const a = (i / 64) * Math.PI * 2
      const [x, y, z] = fn(a)
      const p = project3D(x, y, z, yaw, pitch, R)
      pts.push(`${p.x.toFixed(1)},${p.y.toFixed(1)}`)
    }
    return pts.join(' ')
  }

  const equator   = wirePts(a => [Math.cos(a), Math.sin(a), 0])
  const meridian  = wirePts(a => [0, Math.sin(a), Math.cos(a)])
  const meridian2 = wirePts(a => [Math.cos(a), 0, Math.sin(a)])

  const sp     = project3D(qx, qy, qz, yaw, pitch, R)
  const north  = project3D(0,  0,  1,  yaw, pitch, R)
  const south  = project3D(0,  0, -1,  yaw, pitch, R)
  const plusX  = project3D(1,  0,  0,  yaw, pitch, R)
  const minusX = project3D(-1, 0,  0,  yaw, pitch, R)
  const plusY  = project3D(0,  1,  0,  yaw, pitch, R)
  const minusY = project3D(0, -1,  0,  yaw, pitch, R)

  return (
    <div className="my-10 rounded-2xl border border-white/5 bg-gradient-to-br from-surface/60 to-background p-6 flex flex-col items-center gap-4">
      <svg
        width="460" height="460"
        viewBox="-230 -230 460 460"
        style={{ cursor: dragging ? 'grabbing' : 'grab', maxWidth: 460, width: '100%' }}
        onMouseDown={onMouseDown}
      >
        <defs>
          <radialGradient id="blochBg" cx="40%" cy="35%" r="75%">
            <stop offset="0%"   stopColor="#1A1D2E" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#0B0D17" stopOpacity="0.3" />
          </radialGradient>
          <radialGradient id="blochGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%"   stopColor={currentColor} stopOpacity="0.15" />
            <stop offset="100%" stopColor={currentColor} stopOpacity="0" />
          </radialGradient>
          <filter id="bloch-vector-glow">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="bloch-dot-glow">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <circle cx="0" cy="0" r={R} fill="url(#blochBg)" stroke="#2A2E42" strokeWidth="0.8" />
        <circle cx="0" cy="0" r={R} fill="url(#blochGlow)" />

        <polyline points={equator}   fill="none" stroke="#2A2E42" strokeWidth="0.7" strokeDasharray="3,5" opacity="0.7" />
        <polyline points={meridian}  fill="none" stroke="#2A2E42" strokeWidth="0.7" strokeDasharray="3,5" opacity="0.7" />
        <polyline points={meridian2} fill="none" stroke="#2A2E42" strokeWidth="0.5" strokeDasharray="3,5" opacity="0.4" />

        <line x1={minusX.x} y1={minusX.y} x2={plusX.x} y2={plusX.y} stroke="#2A2E42" strokeWidth="0.5" opacity="0.5" />
        <line x1={minusY.x} y1={minusY.y} x2={plusY.x} y2={plusY.y} stroke="#2A2E42" strokeWidth="0.5" opacity="0.5" />
        <line x1={south.x}  y1={south.y}  x2={north.x} y2={north.y} stroke="#2A2E42" strokeWidth="0.5" opacity="0.5" />

        <text x={plusX.x + 8}   y={plusX.y + 4}  fill="#6B6B80" fontFamily="ui-monospace,monospace" fontSize="10">|+⟩</text>
        <text x={minusX.x - 30} y={minusX.y + 4} fill="#6B6B80" fontFamily="ui-monospace,monospace" fontSize="10">|−⟩</text>
        <text x={plusY.x + 8}   y={plusY.y + 4}  fill="#6B6B80" fontFamily="ui-monospace,monospace" fontSize="10">|+i⟩</text>
        <text x={minusY.x - 36} y={minusY.y + 4} fill="#6B6B80" fontFamily="ui-monospace,monospace" fontSize="10">|−i⟩</text>

        <line x1="0" y1="0" x2={sp.x} y2={sp.y} stroke={currentColor} strokeWidth="2.5" filter="url(#bloch-vector-glow)" />
        <circle cx={sp.x} cy={sp.y} r="16" fill={currentColor} opacity="0.12" filter="url(#bloch-dot-glow)" />
        <circle cx={sp.x} cy={sp.y} r="6" fill={currentColor} filter="url(#bloch-dot-glow)" />
        <circle cx={sp.x} cy={sp.y} r="3" fill="#F0F0F0" />

        <circle cx={north.x} cy={north.y} r="4" fill="#00D4FF" filter="url(#bloch-dot-glow)" />
        <circle cx={north.x} cy={north.y} r="8" fill="#00D4FF" opacity="0.2" />
        <text x={north.x + 10} y={north.y - 4}  fill="#00D4FF" fontFamily="ui-monospace,monospace" fontSize="12" fontWeight="bold">|0⟩</text>

        <circle cx={south.x} cy={south.y} r="4" fill="#FF2D78" filter="url(#bloch-dot-glow)" />
        <circle cx={south.x} cy={south.y} r="8" fill="#FF2D78" opacity="0.2" />
        <text x={south.x + 10} y={south.y + 14} fill="#FF2D78" fontFamily="ui-monospace,monospace" fontSize="12" fontWeight="bold">|1⟩</text>
      </svg>

      <div className="flex flex-wrap gap-1.5 justify-center">
        {(Object.entries(PRESETS) as [PresetKey, PresetValue][]).map(([k, v]) => (
          <button
            key={k}
            onClick={() => setPreset(k)}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all duration-200 ${
              preset === k
                ? 'text-white shadow-lg'
                : 'text-text-muted bg-elevated border border-white/5 hover:text-text-secondary hover:border-white/10'
            }`}
            style={preset === k ? {
              background: `linear-gradient(135deg, ${presetColors[k]}, ${presetColors[k]}cc)`,
              boxShadow: `0 0 20px ${presetColors[k]}40`,
            } : undefined}
          >
            {v.label}
          </button>
        ))}
      </div>

      <div className="flex items-center gap-4 text-xs text-text-muted">
        <span>θ = {(theta * 180 / Math.PI).toFixed(0)}°</span>
        <span className="w-1 h-1 rounded-full bg-elevated" />
        <span>φ = {(phi * 180 / Math.PI).toFixed(0)}°</span>
        <span className="w-1 h-1 rounded-full bg-elevated" />
        <span className="text-[10px]">Arraste para rotacionar</span>
      </div>
    </div>
  )
}
