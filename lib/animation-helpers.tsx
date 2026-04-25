import { useState, useEffect, useRef } from 'react'

// ── project3D ───────────────────────────────────────────────────────────────
// Orthographic projection: rotate (x,y,z) by yaw (Y-axis) then pitch (X-axis),
// then flatten to 2D screen coords scaled by `scale`, offset by (cx, cy).
export function project3D(
  x: number, y: number, z: number,
  yaw: number, pitch: number,
  scale = 1, cx = 0, cy = 0
): { x: number; y: number; z: number } {
  const cosY = Math.cos(yaw), sinY = Math.sin(yaw)
  const cosP = Math.cos(pitch), sinP = Math.sin(pitch)
  // Yaw around Y-axis
  const x1 = cosY * x + sinY * z
  const z1 = -sinY * x + cosY * z
  const y1 = y
  // Pitch around X-axis
  const y2 = cosP * y1 - sinP * z1
  const z2 = sinP * y1 + cosP * z1
  const x2 = x1
  // Screen: x maps from rotated x, screen y maps from rotated z (negated for top=up)
  return { x: cx + x2 * scale, y: cy - z2 * scale, z: y2 }
}

// ── useClock ─────────────────────────────────────────────────────────────────
// RAF-driven animation clock. Returns current time `t` in seconds.
export function useClock({ duration = 8, loop = true } = {}) {
  const [t, setT] = useState(0)
  const [play, setPlay] = useState(true)
  const rafRef = useRef<number | null>(null)
  const lastRef = useRef<number | null>(null)

  useEffect(() => {
    if (!play) { lastRef.current = null; return }
    const step = (ts: number) => {
      if (lastRef.current == null) lastRef.current = ts
      const dt = (ts - lastRef.current) / 1000
      lastRef.current = ts
      setT(v => {
        let nv = v + dt
        if (nv >= duration) {
          if (loop) nv = nv % duration
          else { nv = duration; setPlay(false) }
        }
        return nv
      })
      rafRef.current = requestAnimationFrame(step)
    }
    rafRef.current = requestAnimationFrame(step)
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      lastRef.current = null
    }
  }, [play, duration, loop])

  return { t, setT, play, setPlay, duration }
}

// ── ProbBar ──────────────────────────────────────────────────────────────────
// Labeled probability bar (0–1 value). Used in EntanglementBell histogram.
interface ProbBarProps {
  value: number
  color?: string
  label?: string
  highlight?: boolean
}

export function ProbBar({ value, color = '#06b6d4', label, highlight = false }: ProbBarProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <div style={{
        display: 'flex', justifyContent: 'space-between',
        fontFamily: 'ui-monospace, monospace', fontSize: 11,
        color: highlight ? color : '#94a3b8',
      }}>
        <span>{label}</span>
        <span>{(value * 100).toFixed(1)}%</span>
      </div>
      <div style={{ height: 6, background: '#1e1e30', borderRadius: 3, overflow: 'hidden' }}>
        <div style={{
          width: `${value * 100}%`, height: '100%',
          background: color,
          transition: 'width 200ms',
        }} />
      </div>
    </div>
  )
}
