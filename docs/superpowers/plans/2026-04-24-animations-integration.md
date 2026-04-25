# Animations Integration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Port 5 interactive animations from `refs/` to TypeScript React components and embed them in the corresponding MDX modules, enriching prose with text from all 17 ref scenes.

**Architecture:** Shared utilities (`project3D`, `useClock`, `ProbBar`) in `lib/animation-helpers.tsx`; each animation is a `'use client'` MDX component following the existing pattern of `BitVsQubit` / `SuperdenseCoding`; colors mapped directly to QubX hex values; no new CSS variables.

**Tech Stack:** Next.js 15, React 18, TypeScript, Tailwind CSS, Vitest + @testing-library/react, MDX/next-mdx-remote

---

## File Map

| Action | Path |
|--------|------|
| Create | `lib/animation-helpers.tsx` |
| Create | `lib/__tests__/animation-helpers.test.ts` |
| Modify | `components/mdx/BitVsQubit.tsx` (full rewrite) |
| Create | `components/mdx/__tests__/BitVsQubit.test.tsx` |
| Create | `components/mdx/BlochSphere.tsx` |
| Create | `components/mdx/__tests__/BlochSphere.test.tsx` |
| Create | `components/mdx/EntanglementBell.tsx` |
| Create | `components/mdx/__tests__/EntanglementBell.test.tsx` |
| Create | `components/mdx/DoubleSlit.tsx` |
| Create | `components/mdx/__tests__/DoubleSlit.test.tsx` |
| Create | `components/mdx/QuantumWalk.tsx` |
| Create | `components/mdx/__tests__/QuantumWalk.test.tsx` |
| Modify | `components/mdx/index.tsx` |
| Modify | `app/modulo/[slug]/page.tsx` |
| Modify | `content/modules/01-a-nova-era-da-computacao.mdx` |
| Modify | `content/modules/02-o-mundo-quantico.mdx` |
| Modify | `content/modules/03-qubits-alem-do-bit.mdx` |
| Modify | `content/modules/05-portas-e-algoritmos-quanticos.mdx` |
| Modify | `content/modules/06-o-desafio-da-construcao.mdx` |
| Modify | `content/modules/08-a-ameaca-a-criptografia.mdx` |
| Modify | `content/modules/10-alem-do-computador-quantico.mdx` |

---

## Task 1: Shared Animation Helpers

**Files:**
- Create: `lib/animation-helpers.tsx`
- Create: `lib/__tests__/animation-helpers.test.ts`

- [ ] **Step 1: Create `lib/animation-helpers.tsx`**

```tsx
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
  return { x: cx + x2 * scale, y: cy - y2 * scale, z: z2 }
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
```

- [ ] **Step 2: Write tests for `project3D`**

```ts
// lib/__tests__/animation-helpers.test.ts
import { describe, it, expect } from 'vitest'
import { project3D } from '../animation-helpers'

describe('project3D', () => {
  it('north pole (0,0,1) projects to top of screen with zero rotation', () => {
    const r = project3D(0, 0, 1, 0, 0, 100)
    expect(r.x).toBeCloseTo(0)
    expect(r.y).toBeCloseTo(-100)
  })

  it('south pole (0,0,-1) projects to bottom of screen with zero rotation', () => {
    const r = project3D(0, 0, -1, 0, 0, 100)
    expect(r.x).toBeCloseTo(0)
    expect(r.y).toBeCloseTo(100)
  })

  it('point on +x axis projects to right side with zero rotation', () => {
    const r = project3D(1, 0, 0, 0, 0, 100)
    expect(r.x).toBeCloseTo(100)
    expect(r.y).toBeCloseTo(0)
  })

  it('scale doubles output distance from origin', () => {
    const r1 = project3D(1, 0, 0, 0, 0, 50)
    const r2 = project3D(1, 0, 0, 0, 0, 100)
    expect(r2.x).toBeCloseTo(r1.x * 2)
  })

  it('cx/cy offsets the 2D result', () => {
    const r = project3D(0, 0, 0, 0, 0, 100, 30, 40)
    expect(r.x).toBeCloseTo(30)
    expect(r.y).toBeCloseTo(40)
  })

  it('origin maps to cx/cy', () => {
    const r = project3D(0, 0, 0, Math.PI / 3, 0.5, 100, 10, 20)
    expect(r.x).toBeCloseTo(10)
    expect(r.y).toBeCloseTo(20)
  })
})
```

- [ ] **Step 3: Run tests — expect PASS**

```bash
cd "e:/Desktop/PROJETOS/QubX" && npx vitest run lib/__tests__/animation-helpers.test.ts
```

Expected: 6 tests pass, 0 fail.

- [ ] **Step 4: Commit**

```bash
git add lib/animation-helpers.tsx lib/__tests__/animation-helpers.test.ts
git commit -m "feat: add shared animation helpers (project3D, useClock, ProbBar)"
```

---

## Task 2: Replace BitVsQubit

**Files:**
- Modify: `components/mdx/BitVsQubit.tsx` (full rewrite)
- Create: `components/mdx/__tests__/BitVsQubit.test.tsx`

- [ ] **Step 1: Write failing render test**

```tsx
// components/mdx/__tests__/BitVsQubit.test.tsx
import { describe, it, expect, vi, beforeAll } from 'vitest'
import { render, screen } from '@testing-library/react'
import { BitVsQubit } from '../BitVsQubit'

beforeAll(() => {
  vi.stubGlobal('requestAnimationFrame', (fn: FrameRequestCallback) =>
    setTimeout(fn, 16) as unknown as number
  )
  vi.stubGlobal('cancelAnimationFrame', clearTimeout)
})

describe('BitVsQubit', () => {
  it('renders BIT CLÁSSICO label', () => {
    render(<BitVsQubit />)
    expect(screen.getByText('BIT CLÁSSICO')).toBeInTheDocument()
  })

  it('renders QUBIT label', () => {
    render(<BitVsQubit />)
    expect(screen.getByText('QUBIT')).toBeInTheDocument()
  })

  it('renders pole labels |0⟩ and |1⟩', () => {
    render(<BitVsQubit />)
    // SVG text elements — getByText covers them
    expect(screen.getAllByText('|0⟩').length).toBeGreaterThan(0)
    expect(screen.getAllByText('|1⟩').length).toBeGreaterThan(0)
  })
})
```

- [ ] **Step 2: Run test — expect FAIL**

```bash
npx vitest run components/mdx/__tests__/BitVsQubit.test.tsx
```

Expected: fails (BIT CLÁSSICO not in document with old component).

- [ ] **Step 3: Rewrite `components/mdx/BitVsQubit.tsx`**

```tsx
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
```

- [ ] **Step 4: Run test — expect PASS**

```bash
npx vitest run components/mdx/__tests__/BitVsQubit.test.tsx
```

Expected: 3 tests pass.

- [ ] **Step 5: Commit**

```bash
git add components/mdx/BitVsQubit.tsx components/mdx/__tests__/BitVsQubit.test.tsx
git commit -m "feat: replace BitVsQubit with animated bit+Bloch-sphere version"
```

---

## Task 3: BlochSphere Component

**Files:**
- Create: `components/mdx/BlochSphere.tsx`
- Create: `components/mdx/__tests__/BlochSphere.test.tsx`

- [ ] **Step 1: Write failing render test**

```tsx
// components/mdx/__tests__/BlochSphere.test.tsx
import { describe, it, expect, vi, beforeAll } from 'vitest'
import { render, screen } from '@testing-library/react'
import { BlochSphere } from '../BlochSphere'

beforeAll(() => {
  vi.stubGlobal('requestAnimationFrame', (fn: FrameRequestCallback) =>
    setTimeout(fn, 16) as unknown as number
  )
  vi.stubGlobal('cancelAnimationFrame', clearTimeout)
  vi.stubGlobal('performance', { now: () => 0 })
})

describe('BlochSphere', () => {
  it('renders all 6 preset buttons', () => {
    render(<BlochSphere />)
    expect(screen.getByRole('button', { name: '|0⟩' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: '|1⟩' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: '|+⟩' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: '|−⟩' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: '|+i⟩' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: '|−i⟩' })).toBeInTheDocument()
  })

  it('renders drag instruction', () => {
    render(<BlochSphere />)
    expect(screen.getByText(/arraste para rotacionar/i)).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run test — expect FAIL**

```bash
npx vitest run components/mdx/__tests__/BlochSphere.test.tsx
```

Expected: FAIL (BlochSphere not found).

- [ ] **Step 3: Create `components/mdx/BlochSphere.tsx`**

```tsx
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

export function BlochSphere() {
  const [yaw, setYaw] = useState(0.6)
  const [pitch, setPitch] = useState(-0.25)
  const [dragging, setDragging] = useState(false)
  const dragStart = useRef<{ x: number; y: number; yaw: number; pitch: number } | null>(null)

  const [preset, setPreset] = useState<PresetKey>('plus')
  const [animFrom, setAnimFrom] = useState<PresetValue>(PRESETS.plus)
  const [animTo, setAnimTo] = useState<PresetValue>(PRESETS.plus)
  const [animT, setAnimT] = useState(1)

  // Kick off transition when preset changes
  useEffect(() => {
    setAnimFrom(cur => ({
      ...cur,
      theta: cur.theta + (animTo.theta - cur.theta) * animT,
      phi:   cur.phi   + (animTo.phi   - cur.phi)   * animT,
    }))
    setAnimTo(PRESETS[preset])
    setAnimT(0)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [preset])

  // Animate transition
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [animTo])

  const theta = animFrom.theta + (animTo.theta - animFrom.theta) * animT
  const phi   = animFrom.phi   + (animTo.phi   - animFrom.phi)   * animT
  const qx = Math.sin(theta) * Math.cos(phi)
  const qy = Math.sin(theta) * Math.sin(phi)
  const qz = Math.cos(theta)

  const R = 160

  const onMouseDown = (e: React.MouseEvent) => {
    setDragging(true)
    dragStart.current = { x: e.clientX, y: e.clientY, yaw, pitch }
  }

  useEffect(() => {
    if (!dragging) return
    const move = (e: MouseEvent) => {
      if (!dragStart.current) return
      setYaw(dragStart.current.yaw + (e.clientX - dragStart.current.x) * 0.01)
      setPitch(v => Math.max(-1.2, Math.min(1.2,
        dragStart.current!.pitch - (e.clientY - dragStart.current!.y) * 0.01
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
      pts.push(`${p.x},${p.y}`)
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
    <div className="my-10 rounded-2xl border border-border bg-surface/20 p-6 flex flex-col items-center gap-4">
      <svg
        width="360" height="360"
        viewBox="-180 -180 360 360"
        style={{ cursor: dragging ? 'grabbing' : 'grab', maxWidth: '100%' }}
        onMouseDown={onMouseDown}
      >
        <defs>
          <radialGradient id="blochSphereGrad" cx="40%" cy="35%" r="75%">
            <stop offset="0%"   stopColor="#1e1e4a" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#0a0a1e" stopOpacity="0.5" />
          </radialGradient>
        </defs>
        <circle cx="0" cy="0" r={R} fill="url(#blochSphereGrad)" stroke="#2d2d45" strokeWidth="0.8" />

        {/* Wireframe */}
        <polyline points={equator}   fill="none" stroke="#2d2d45" strokeWidth="0.8" strokeDasharray="3 4" opacity="0.8" />
        <polyline points={meridian}  fill="none" stroke="#2d2d45" strokeWidth="0.8" strokeDasharray="3 4" opacity="0.8" />
        <polyline points={meridian2} fill="none" stroke="#2d2d45" strokeWidth="0.8" strokeDasharray="3 4" opacity="0.6" />

        {/* Axes */}
        <line x1={minusX.x} y1={minusX.y} x2={plusX.x} y2={plusX.y} stroke="#475569" strokeWidth="0.7" />
        <line x1={minusY.x} y1={minusY.y} x2={plusY.x} y2={plusY.y} stroke="#475569" strokeWidth="0.7" />
        <line x1={south.x}  y1={south.y}  x2={north.x} y2={north.y} stroke="#475569" strokeWidth="0.7" />

        {/* Axis labels */}
        <text x={plusX.x + 8}  y={plusX.y + 4}  fill="#94a3b8" fontFamily="ui-monospace,monospace" fontSize="10">|+⟩</text>
        <text x={minusX.x - 30} y={minusX.y + 4} fill="#475569" fontFamily="ui-monospace,monospace" fontSize="10">|−⟩</text>
        <text x={plusY.x + 8}  y={plusY.y + 4}  fill="#94a3b8" fontFamily="ui-monospace,monospace" fontSize="10">|+i⟩</text>
        <text x={minusY.x - 36} y={minusY.y + 4} fill="#475569" fontFamily="ui-monospace,monospace" fontSize="10">|−i⟩</text>

        {/* State vector */}
        <line x1="0" y1="0" x2={sp.x} y2={sp.y} stroke="#f59e0b" strokeWidth="2.2" />
        <circle cx={sp.x} cy={sp.y} r="14" fill="#f59e0b" opacity="0.18" />
        <circle cx={sp.x} cy={sp.y} r="5.5" fill="#f59e0b" />

        {/* Poles */}
        <circle cx={north.x} cy={north.y} r="4" fill="#06b6d4" />
        <text x={north.x + 10} y={north.y - 4}  fill="#06b6d4" fontFamily="ui-monospace,monospace" fontSize="12" fontWeight="600">|0⟩</text>
        <circle cx={south.x} cy={south.y} r="4" fill="#ec4899" />
        <text x={south.x + 10} y={south.y + 14} fill="#ec4899" fontFamily="ui-monospace,monospace" fontSize="12" fontWeight="600">|1⟩</text>
      </svg>

      {/* Preset buttons */}
      <div className="flex flex-wrap gap-2 justify-center">
        {(Object.entries(PRESETS) as [PresetKey, PresetValue][]).map(([k, v]) => (
          <button
            key={k}
            onClick={() => setPreset(k)}
            className={`px-3 py-1 rounded text-xs font-mono border transition-colors ${
              preset === k
                ? 'bg-purple border-purple text-white'
                : 'border-border bg-surface text-text-secondary hover:border-purple/50'
            }`}
          >
            {v.label}
          </button>
        ))}
      </div>

      <p className="text-xs text-text-muted font-mono">
        arraste para rotacionar · θ = {(theta * 180 / Math.PI).toFixed(0)}° · φ = {(phi * 180 / Math.PI).toFixed(0)}°
      </p>
    </div>
  )
}
```

- [ ] **Step 4: Run test — expect PASS**

```bash
npx vitest run components/mdx/__tests__/BlochSphere.test.tsx
```

Expected: 2 tests pass.

- [ ] **Step 5: Commit**

```bash
git add components/mdx/BlochSphere.tsx components/mdx/__tests__/BlochSphere.test.tsx
git commit -m "feat: add interactive BlochSphere component (drag + presets)"
```

---

## Task 4: EntanglementBell Component

**Files:**
- Create: `components/mdx/EntanglementBell.tsx`
- Create: `components/mdx/__tests__/EntanglementBell.test.tsx`

- [ ] **Step 1: Write failing render test**

```tsx
// components/mdx/__tests__/EntanglementBell.test.tsx
import { describe, it, expect, vi, beforeAll } from 'vitest'
import { render, screen } from '@testing-library/react'
import { EntanglementBell } from '../EntanglementBell'

beforeAll(() => {
  vi.stubGlobal('requestAnimationFrame', (fn: FrameRequestCallback) =>
    setTimeout(fn, 16) as unknown as number
  )
  vi.stubGlobal('cancelAnimationFrame', clearTimeout)
})

describe('EntanglementBell', () => {
  it('renders Alice and Bob labels', () => {
    render(<EntanglementBell />)
    expect(screen.getByText('Alice')).toBeInTheDocument()
    expect(screen.getByText('Bob')).toBeInTheDocument()
  })

  it('renders control buttons', () => {
    render(<EntanglementBell />)
    expect(screen.getByRole('button', { name: /Medir Alice/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Reemaranhar/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Rodar 200/i })).toBeInTheDocument()
  })

  it('Medir Alice button is enabled initially', () => {
    render(<EntanglementBell />)
    expect(screen.getByRole('button', { name: /Medir Alice/i })).not.toBeDisabled()
  })
})
```

- [ ] **Step 2: Run test — expect FAIL**

```bash
npx vitest run components/mdx/__tests__/EntanglementBell.test.tsx
```

Expected: FAIL (EntanglementBell not found).

- [ ] **Step 3: Create `components/mdx/EntanglementBell.tsx`**

```tsx
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

  useEffect(() => {
    if (phase !== 'ready') return
    const step = () => { setTick(v => v + 0.015); rafRef.current = requestAnimationFrame(step) }
    rafRef.current = requestAnimationFrame(step)
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current) }
  }, [phase])

  const measure = () => {
    const r = Math.random() < 0.5 ? 0 : 1
    setAliceResult(r)
    setPhase('measuringA')
    setTimeout(() => {
      setBobResult(r)
      setPhase('done')
      setHistory(h => ([[r, r] as [number, number], ...h]).slice(0, 64))
    }, 700)
  }

  const reset = () => { setPhase('ready'); setAliceResult(null); setBobResult(null) }

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
        <button onClick={runMany}
          className="px-4 py-2 rounded-lg text-sm font-medium border border-[#ec4899] bg-[#ec4899]/10 text-[#ec4899] hover:bg-[#ec4899]/20 transition-colors"
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
```

- [ ] **Step 4: Run test — expect PASS**

```bash
npx vitest run components/mdx/__tests__/EntanglementBell.test.tsx
```

Expected: 3 tests pass.

- [ ] **Step 5: Commit**

```bash
git add components/mdx/EntanglementBell.tsx components/mdx/__tests__/EntanglementBell.test.tsx
git commit -m "feat: add EntanglementBell interactive component (Bell pair measurement)"
```

---

## Task 5: DoubleSlit Component

**Files:**
- Create: `components/mdx/DoubleSlit.tsx`
- Create: `components/mdx/__tests__/DoubleSlit.test.tsx`

- [ ] **Step 1: Write failing render test**

```tsx
// components/mdx/__tests__/DoubleSlit.test.tsx
import { describe, it, expect, vi, beforeAll } from 'vitest'
import { render, screen } from '@testing-library/react'
import { DoubleSlit } from '../DoubleSlit'

beforeAll(() => {
  vi.stubGlobal('requestAnimationFrame', (fn: FrameRequestCallback) =>
    setTimeout(fn, 16) as unknown as number
  )
  vi.stubGlobal('cancelAnimationFrame', clearTimeout)
})

describe('DoubleSlit', () => {
  it('renders toggle buttons', () => {
    render(<DoubleSlit />)
    expect(screen.getByRole('button', { name: /Sem medir fenda/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Medir "qual fenda/i })).toBeInTheDocument()
  })

  it('renders pause and clear buttons', () => {
    render(<DoubleSlit />)
    expect(screen.getByRole('button', { name: /Pausar|Disparar/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Limpar/i })).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run test — expect FAIL**

```bash
npx vitest run components/mdx/__tests__/DoubleSlit.test.tsx
```

Expected: FAIL.

- [ ] **Step 3: Create `components/mdx/DoubleSlit.tsx`**

```tsx
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
```

- [ ] **Step 4: Run test — expect PASS**

```bash
npx vitest run components/mdx/__tests__/DoubleSlit.test.tsx
```

Expected: 2 tests pass.

- [ ] **Step 5: Commit**

```bash
git add components/mdx/DoubleSlit.tsx components/mdx/__tests__/DoubleSlit.test.tsx
git commit -m "feat: add DoubleSlit interactive component (interference vs which-path)"
```

---

## Task 6: QuantumWalk Component

**Files:**
- Create: `components/mdx/QuantumWalk.tsx`
- Create: `components/mdx/__tests__/QuantumWalk.test.tsx`

- [ ] **Step 1: Write failing render test**

```tsx
// components/mdx/__tests__/QuantumWalk.test.tsx
import { describe, it, expect, vi, beforeAll } from 'vitest'
import { render, screen } from '@testing-library/react'
import { QuantumWalk } from '../QuantumWalk'

beforeAll(() => {
  vi.stubGlobal('requestAnimationFrame', (fn: FrameRequestCallback) =>
    setTimeout(fn, 16) as unknown as number
  )
  vi.stubGlobal('cancelAnimationFrame', clearTimeout)
})

describe('QuantumWalk', () => {
  it('renders classical and quantum labels', () => {
    render(<QuantumWalk />)
    expect(screen.getByText(/CLÁSSICO/i)).toBeInTheDocument()
    expect(screen.getByText(/QUÂNTICO/i)).toBeInTheDocument()
  })

  it('renders restart and pause buttons', () => {
    render(<QuantumWalk />)
    expect(screen.getByRole('button', { name: /Recomeçar/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Pausar|Continuar/i })).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run test — expect FAIL**

```bash
npx vitest run components/mdx/__tests__/QuantumWalk.test.tsx
```

Expected: FAIL.

- [ ] **Step 3: Create `components/mdx/QuantumWalk.tsx`**

```tsx
'use client'

import { useState, useEffect, useMemo } from 'react'

const N = 81
const CENTER = (N - 1) / 2
const STEPS_MAX = 38
const W = 560, H = 180

type Complex = { re: number; im: number }

export function QuantumWalk() {
  const [step, setStep] = useState(0)
  const [running, setRunning] = useState(true)

  useEffect(() => {
    if (!running) return
    if (step >= STEPS_MAX) { setRunning(false); return }
    const id = setTimeout(() => setStep(s => s + 1), 280)
    return () => clearTimeout(id)
  }, [running, step])

  // Classical: binomial distribution
  const classicalDist = useMemo(() => {
    const dist = new Array(N).fill(0) as number[]
    if (step === 0) { dist[CENTER] = 1; return dist }
    for (let k = -step; k <= step; k += 2) {
      const idx = CENTER + k
      if (idx < 0 || idx >= N) continue
      let logp = -step * Math.log(2)
      const m = (step + k) / 2
      for (let i = 1; i <= m; i++) logp += Math.log(step - i + 1) - Math.log(i)
      dist[idx] = Math.exp(logp)
    }
    return dist
  }, [step])

  // Quantum: Hadamard walk
  const quantumDist = useMemo(() => {
    let amp0: Complex[] = Array.from({ length: N }, () => ({ re: 0, im: 0 }))
    let amp1: Complex[] = Array.from({ length: N }, () => ({ re: 0, im: 0 }))
    amp0[CENTER] = { re: 1 / Math.SQRT2, im: 0 }
    amp1[CENTER] = { re: 0, im: 1 / Math.SQRT2 }

    for (let s = 0; s < step; s++) {
      const newA0: Complex[] = Array.from({ length: N }, () => ({ re: 0, im: 0 }))
      const newA1: Complex[] = Array.from({ length: N }, () => ({ re: 0, im: 0 }))
      for (let i = 0; i < N; i++) {
        newA0[i] = { re: (amp0[i].re + amp1[i].re) / Math.SQRT2, im: (amp0[i].im + amp1[i].im) / Math.SQRT2 }
        newA1[i] = { re: (amp0[i].re - amp1[i].re) / Math.SQRT2, im: (amp0[i].im - amp1[i].im) / Math.SQRT2 }
      }
      const s0: Complex[] = Array.from({ length: N }, () => ({ re: 0, im: 0 }))
      const s1: Complex[] = Array.from({ length: N }, () => ({ re: 0, im: 0 }))
      for (let i = 0; i < N; i++) {
        if (i + 1 < N) s0[i + 1] = newA0[i]
        if (i - 1 >= 0) s1[i - 1] = newA1[i]
      }
      amp0 = s0; amp1 = s1
    }

    return amp0.map((a, i) =>
      a.re*a.re + a.im*a.im + amp1[i].re*amp1[i].re + amp1[i].im*amp1[i].im
    )
  }, [step])

  const barW = W / N
  const maxC = Math.max(...classicalDist, 0.001)
  const maxQ = Math.max(...quantumDist,   0.001)

  return (
    <div className="my-10 rounded-2xl border border-border bg-surface/20 p-6 flex flex-col gap-4">
      <p className="text-xs text-text-muted font-mono uppercase tracking-widest">
        passo {step} / {STEPS_MAX}
      </p>

      {/* Classical distribution */}
      <div>
        <p className="text-xs font-mono mb-2" style={{ color: '#ef4444' }}>
          CLÁSSICO · caminhada aleatória (moeda real)
        </p>
        <svg width="100%" style={{ maxWidth: W }} viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMid meet">
          <line x1="0" y1={H-1} x2={W} y2={H-1} stroke="#2d2d45" strokeWidth="0.6" />
          {classicalDist.map((p, i) => (
            <rect key={i}
                  x={i * barW} y={H - (p / maxC) * (H - 4)}
                  width={barW - 0.5} height={(p / maxC) * (H - 4)}
                  fill="#ef4444" opacity={0.85} />
          ))}
          <text x={W/2} y={H-6} textAnchor="middle"
                fill="#475569" fontFamily="ui-monospace,monospace" fontSize="10">posição = 0</text>
        </svg>
      </div>

      {/* Quantum distribution */}
      <div>
        <p className="text-xs font-mono mb-2" style={{ color: '#06b6d4' }}>
          QUÂNTICO · moeda de Hadamard (superposição)
        </p>
        <svg width="100%" style={{ maxWidth: W }} viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMid meet">
          <line x1="0" y1={H-1} x2={W} y2={H-1} stroke="#2d2d45" strokeWidth="0.6" />
          {quantumDist.map((p, i) => (
            <rect key={i}
                  x={i * barW} y={H - (p / maxQ) * (H - 4)}
                  width={barW - 0.5} height={(p / maxQ) * (H - 4)}
                  fill="#06b6d4" opacity={0.85} />
          ))}
        </svg>
      </div>

      {/* Controls */}
      <div className="flex gap-2 justify-center flex-wrap">
        <button
          onClick={() => { setStep(0); setRunning(true) }}
          className="px-4 py-2 rounded-lg text-sm font-medium bg-purple text-white"
        >▶ Recomeçar</button>
        <button
          onClick={() => setRunning(r => !r)}
          className="px-4 py-2 rounded-lg text-sm font-medium border border-border bg-surface text-text-secondary hover:border-purple/50 transition-colors"
        >{running ? '⏸ Pausar' : '▶ Continuar'}</button>
      </div>
    </div>
  )
}
```

- [ ] **Step 4: Run test — expect PASS**

```bash
npx vitest run components/mdx/__tests__/QuantumWalk.test.tsx
```

Expected: 2 tests pass.

- [ ] **Step 5: Commit**

```bash
git add components/mdx/QuantumWalk.tsx components/mdx/__tests__/QuantumWalk.test.tsx
git commit -m "feat: add QuantumWalk component (classical vs Hadamard walk comparison)"
```

---

## Task 7: Wire Up Exports and Page

**Files:**
- Modify: `components/mdx/index.tsx`
- Modify: `app/modulo/[slug]/page.tsx`

- [ ] **Step 1: Update `components/mdx/index.tsx`**

Add the 4 new exports after the existing ones:

```tsx
'use client'

import React, { useState } from 'react'
import { GLOSSARY } from '@/lib/glossary'

interface TermProps {
  id: string
  children?: React.ReactNode
}

export * from './BitVsQubit'
export * from './SuperdenseCoding'
export * from './MazeQuantum'
export * from './BlochSphere'
export * from './EntanglementBell'
export * from './DoubleSlit'
export * from './QuantumWalk'

// ... rest of file unchanged (Term, Callout, GlossaryIndex)
```

The exact edit: open `components/mdx/index.tsx` and add these 4 lines after `export * from './MazeQuantum'`:

```
export * from './BlochSphere'
export * from './EntanglementBell'
export * from './DoubleSlit'
export * from './QuantumWalk'
```

- [ ] **Step 2: Update `app/modulo/[slug]/page.tsx`**

Current imports at the top:

```tsx
import { Term, Callout, GlossaryIndex, BitVsQubit, SuperdenseCoding, MazeQuantum } from '@/components/mdx'
```

Change to:

```tsx
import {
  Term, Callout, GlossaryIndex,
  BitVsQubit, SuperdenseCoding, MazeQuantum,
  BlochSphere, EntanglementBell, DoubleSlit, QuantumWalk,
} from '@/components/mdx'
```

And update `mdxComponents`:

```tsx
const mdxComponents = {
  Term,
  Callout,
  GlossaryIndex,
  BitVsQubit,
  SuperdenseCoding,
  MazeQuantum,
  BlochSphere,
  EntanglementBell,
  DoubleSlit,
  QuantumWalk,
}
```

- [ ] **Step 3: Run full test suite — expect PASS**

```bash
npx vitest run
```

Expected: all existing tests pass plus the new component tests.

- [ ] **Step 4: Commit**

```bash
git add components/mdx/index.tsx app/modulo/[slug]/page.tsx
git commit -m "feat: register BlochSphere, EntanglementBell, DoubleSlit, QuantumWalk in MDX pipeline"
```

---

## Task 8: MDX Updates — Módulos 01 and 02

**Files:**
- Modify: `content/modules/01-a-nova-era-da-computacao.mdx`
- Modify: `content/modules/02-o-mundo-quantico.mdx`

### Módulo 01

- [ ] **Step 1: Find the `<BitVsQubit />` block in `01-a-nova-era-da-computacao.mdx`**

It is currently surrounded by:

```mdx
<Callout type="tip" title="O Poder do Paralelismo">
Isso permite que um computador quântico explore milhões de possibilidades simultaneamente...
</Callout>

<BitVsQubit />

## A Corrida Global
```

- [ ] **Step 2: Add text below `<BitVsQubit />`**

Insert this block between `<BitVsQubit />` and `## A Corrida Global`:

```mdx
Um bit clássico é uma chave binária: **0** ou **1**. Um qubit é um vetor de estado num espaço complexo bidimensional — e pode apontar para qualquer ponto da superfície de uma esfera. Os polos **|0⟩** e **|1⟩** são os únicos estados que existem no mundo clássico. Todo o resto — o equador, os meridianos, os pontos entre eles — é território exclusivamente quântico.

Matematicamente, qualquer estado de um qubit é:

```
|ψ⟩ = α|0⟩ + β|1⟩    com α, β ∈ ℂ e |α|² + |β|² = 1
```

Essa continuidade é o que permite algoritmos quânticos explorar muitas possibilidades simultaneamente. Mas atenção: **medir** um qubit colapsa esse estado de volta para 0 ou 1 — o resto desaparece.
```

(Use triple-backtick code block for the formula; replace the outer triple backticks with the actual markdown code fence in the file.)

- [ ] **Step 3: Verify `<BitVsQubit />` still renders correctly by running the dev server (optional, or do it after all MDX tasks)**

### Módulo 02

- [ ] **Step 4: Read the end of `02-o-mundo-quantico.mdx` to find a good insertion point for `<DoubleSlit />`**

The file already has a static SVG diagram of the double slit. The interactive component should be added **after** the existing static SVG section, at a natural paragraph break.

Read the rest of the file:

```bash
# In terminal / Read tool — find the end of the static SVG section around line 50+
```

- [ ] **Step 5: Add `<DoubleSlit />` and enrichment text to `02-o-mundo-quantico.mdx`**

Find the section ending `## O Colapso da Função de Onda` (or similar heading after the double-slit SVG) and insert before it:

```mdx
<DoubleSlit />

Feynman dizia que **"todo o mistério da mecânica quântica cabe nesse experimento"**. Ele tem razão: superposição, medição e colapso estão todos aqui numa imagem só.

O dado chocante não é a interferência em si — é o que a destrói. Não é o "olhar humano" que importa: é qualquer interação que **registre informação sobre o caminho**. Se essa informação existe em algum lugar do universo — mesmo completamente inacessível — as franjas desaparecem.

O padrão de interferência surge porque as amplitudes das duas rotas somam **antes** de elevar ao quadrado:

```
sem medição:   P(y) ∝ |ψ₁(y) + ψ₂(y)|²   → franjas
com medição:   P(y) = |ψ₁(y)|² + |ψ₂(y)|²  → dois borrões
```
```

- [ ] **Step 6: Commit**

```bash
git add content/modules/01-a-nova-era-da-computacao.mdx content/modules/02-o-mundo-quantico.mdx
git commit -m "content: enrich módulos 01 e 02 with animation text + DoubleSlit component"
```

---

## Task 9: MDX Updates — Módulo 03

**Files:**
- Modify: `content/modules/03-qubits-alem-do-bit.mdx`

This is the biggest MDX change: replace the static Bloch sphere SVG and GIF images with `<BlochSphere />`, replace the static Alice/Bob entanglement SVG with `<EntanglementBell />`, and enrich both sections.

- [ ] **Step 1: Replace the static Bloch sphere section**

Find and remove lines 26–85 (the two static GIF images and the static SVG `<svg viewBox="0 0 360 360"...`). Replace them with:

```mdx
<BlochSphere />

Dois ângulos descrevem completamente qualquer estado puro de 1 qubit na Esfera de Bloch:

- **θ** (polar, 0 a π): latitude — vai do polo |0⟩ ao polo |1⟩
- **φ** (azimutal, 0 a 2π): longitude — a fase relativa entre as amplitudes

```
|ψ⟩ = cos(θ/2)|0⟩ + e^(iφ) sin(θ/2)|1⟩
```

**Pontos notáveis:** |0⟩ e |1⟩ nos polos; |+⟩ e |−⟩ no eixo x (superposição com fases opostas); |+i⟩ e |−i⟩ no eixo y (fase ±90°). **Portas quânticas são rotações** nessa esfera: a porta X gira 180° em torno do eixo x (troca |0⟩ ↔ |1⟩); a porta H leva |0⟩ → |+⟩ (aponta o vetor para o equador).
```

- [ ] **Step 2: Remove the static Alice/Bob entanglement SVG and replace with `<EntanglementBell />`**

Find the block starting `<svg viewBox="0 0 700 200"` (around line 104) and ending at its closing `</svg>` (around line 134). Remove it and replace with:

```mdx
<EntanglementBell />
```

- [ ] **Step 3: Enrich the emaranhamento section text**

After `<EntanglementBell />`, add before the existing `> ⚠️ **Importante:**` blockquote:

```mdx
O estado de Bell preparado acima é **|Φ+⟩ = (|00⟩ + |11⟩) / √2** — os dois qubits estão em superposição e seus destinos estão amarrados:

```
P(00) = P(11) = 50%    P(01) = P(10) = 0
```

Medir Alice e obter 0 garante que Bob também verá 0 — mas Alice não controlou qual resultado saiu. Para Bob, olhar sozinho parece ruído 50/50. A correlação só aparece **depois** que os dois comparam notas via canal clássico.

Einstein chamou isso de *"ação fantasmagórica à distância"* e achou que a mecânica quântica estava incompleta. Os experimentos de Bell (1964), Aspect (1982) e o <Term id="nobel-2022">**Nobel de Física 2022**</Term> mostraram que a natureza é, de fato, fantasmagórica — não há variáveis ocultas locais que expliquem as correlações.
```

- [ ] **Step 4: Add Bell/CHSH and no-cloning notes to the Decoerência section**

After the decoerência table (end of file, before `<GlossaryIndex />`), add:

```mdx
## Desigualdade de Bell e Não-Clonagem

**Bell (1964)** formulou um teste estatístico que distingue correlações quânticas de qualquer teoria clássica de variáveis ocultas. No jogo CHSH, Alice e Bob escolhem perguntas aleatórias e tentam maximizar a concordância sem comunicação. A mecânica clássica permite no máximo 75% de concordância; a quântica chega a ≈ 85,4% — violando a desigualdade de Bell. Isso foi verificado experimentalmente com fótons, elétrons e átomos.

**Teorema da não-clonagem:** não existe operação quântica que copie um estado desconhecido |ψ⟩ para outro qubit sem destruir o original. A prova é direta pela linearidade da mecânica quântica — supor que a cópia existe leva a uma contradição com a unitariedade. Uma consequência: um espião não pode interceptar um qubit, copiar seu estado e repassá-lo sem deixar rastro — fundamento da segurança quântica.
```

- [ ] **Step 5: Commit**

```bash
git add content/modules/03-qubits-alem-do-bit.mdx
git commit -m "content: replace static Bloch/Bell SVGs with interactive components, enrich módulo 03"
```

---

## Task 10: MDX Updates — Módulos 05, 06, 08, 10

**Files:**
- Modify: `content/modules/05-portas-e-algoritmos-quanticos.mdx`
- Modify: `content/modules/06-o-desafio-da-construcao.mdx`
- Modify: `content/modules/08-a-ameaca-a-criptografia.mdx`
- Modify: `content/modules/10-alem-do-computador-quantico.mdx`

### Módulo 05 — Portas e Algoritmos

- [ ] **Step 1: Add content about gates as matrices and interference**

Find the heading `## Portas Quânticas` (or equivalent) and enrich after the existing content of that section. Add:

```mdx
Toda porta quântica é uma **matriz unitária** (U†U = I), o que garante reversibilidade — ao contrário das portas clássicas NAND/OR que são irreversíveis. Exemplos fundamentais:

| Porta | Matriz | Efeito na Esfera de Bloch |
|-------|--------|--------------------------|
| X (NOT quântico) | [[0,1],[1,0]] | Rotação 180° em torno do eixo x — troca |0⟩ ↔ |1⟩ |
| H (Hadamard) | [[1,1],[1,-1]]/√2 | Leva |0⟩ → |+⟩, cria superposição 50/50 |
| Z (fase) | [[1,0],[0,-1]] | Rotação 180° em torno do eixo z — inverte a fase de |1⟩ |
| CNOT | 4×4 | Porta de 2 qubits: inverte o alvo se o controle é |1⟩ |

**Interferência em circuitos:** aplicar H duas vezes cancela: H·H = I. As amplitudes dos caminhos somam (interferência construtiva) ou se cancelam (interferência destrutiva) antes de medir. Algoritmos quânticos exploram isso para amplificar os caminhos corretos e cancelar os errados.

**Busca de Grover:** encontrar um item em N não-estruturados em **√N** passos — contra N/2 clássico. A aceleração é quadrática, não exponencial, mas se aplica a qualquer problema de busca sem estrutura conhecida.
```

### Módulo 06 — O Desafio da Construção

- [ ] **Step 2: Enrich with decoherence times and error correction details**

Find an appropriate place (near content about decoerência e correção de erros) and add:

```mdx
**Tempo de coerência** é o tempo que um qubit mantém sua fase quântica antes de ser perturbado pelo ambiente. É medido por dois parâmetros: T₁ (tempo de relaxamento energético) e T₂ (tempo de defasagem). Máquinas modernas de supercondutores (IBM, Google) atingem T₂ de 100–500 microssegundos — tempo suficiente para centenas de portas, mas não para algoritmos complexos sem correção de erros.

**Surface code** é o esquema de correção de erros mais promissor. Organiza qubits em grade 2D e usa medições de paridade para detectar (mas não colapsar) erros. O *threshold* de erro físico é ~1% por porta — abaixo disso, adicionar mais qubits físicos **reduz** a taxa de erro lógico exponencialmente. O custo: ~1.000 qubits físicos por qubit lógico com taxa de erro confortável.

Isso explica o salto entre "qubits físicos" dos anúncios (IBM Eagle: 127, Condor: 1.121) e "qubits lógicos úteis" para algoritmos práticos — ainda décadas de distância para a maioria dos problemas.
```

### Módulo 08 — A Ameaça à Criptografia

- [ ] **Step 3: Add Shor's algorithm details and BB84 protocol**

Find an appropriate section and add:

```mdx
**Algoritmo de Shor (1994):** fatoração de N em **O((log N)³)** operações quânticas. Comparado ao melhor algoritmo clássico conhecido (crivo geral de campos de números: exponencial sub-quadrático), é uma aceleração exponencial. Para N de 2048 bits (chave RSA padrão atual), um computador quântico com ~4.000 qubits lógicos perfeitos quebraria em horas.

O mecanismo central: encontrar o período de f(x) = aˣ mod N usando a Transformada de Fourier Quântica — que calcula todos os períodos em superposição.

**BB84 — Distribuição Quântica de Chave:** protocolo de 1984 que distribui uma chave criptográfica usando fótons polarizados. A segurança é física, não computacional: qualquer espião que intercepte os fótons colapsa seus estados e introduz erros detectáveis. Alice e Bob verificam uma amostra — se a taxa de erro excede ~11%, abortam e assumem que a comunicação foi comprometida. BB84 não requer computador quântico — só canal quântico (fibra óptica ou link de satélite).
```

### Módulo 10 — Além do Computador Quântico

- [ ] **Step 4: Add teleportation protocol details and quantum walk with `<QuantumWalk />`**

Find the end of the module content (before references) and add:

```mdx
## Teleporte Quântico

O teleporte quântico transfere o **estado** de um qubit (não a matéria) para outro local em 3 passos:

1. Alice e Bob compartilham um par de Bell (emaranhamento preparado antecipadamente)
2. Alice realiza uma medição de Bell conjunta entre o qubit a teleportar e sua metade do par — obtém 2 bits clássicos de resultado
3. Alice envia esses 2 bits para Bob (canal clássico); Bob aplica uma correção condicional — e o estado original aparece no qubit de Bob

O estado original de Alice é destruído ao ser medido (teorema da não-clonagem respeitado). O resultado não viola a relatividade: os 2 bits clássicos precisam ser enviados antes que Bob possa reconstruir o estado — nenhuma informação viaja mais rápido que a luz.

## Caminhada Quântica

<QuantumWalk />

Na caminhada aleatória clássica com N passos, a posição se distribui como gaussiana com desvio padrão **σ ∼ √N** — dispersão difusiva. Na caminhada quântica com moeda de Hadamard, as amplitudes dos caminhos interferem e criam **dois picos balísticos** nas extremidades, com **σ ∼ N** — dispersão quadraticamente mais rápida.

As franjas visíveis dentro dos lobos quânticos são assinatura da interferência construtiva e destrutiva entre superposições de caminhos. Caminhadas quânticas são primitivas para algoritmos (busca em grafos em O(√N)), mostraram ser universais para computação quântica, e aparecem em modelos de transferência de energia em complexos de antena na fotossíntese.
```

- [ ] **Step 5: Commit all MDX changes**

```bash
git add content/modules/05-portas-e-algoritmos-quanticos.mdx \
        content/modules/06-o-desafio-da-construcao.mdx \
        content/modules/08-a-ameaca-a-criptografia.mdx \
        content/modules/10-alem-do-computador-quantico.mdx
git commit -m "content: enrich módulos 05, 06, 08, 10 with scene text from refs"
```

---

## Final Verification

- [ ] **Run full test suite**

```bash
npx vitest run
```

Expected output: all tests pass (existing + new). Count: 6 animation-helpers + 3 BitVsQubit + 2 BlochSphere + 3 EntanglementBell + 2 DoubleSlit + 2 QuantumWalk = 18 new tests, plus existing tests.

- [ ] **Start dev server and do visual spot-check**

```bash
npm run dev
```

Visit these routes and verify components render and are interactive:
- `http://localhost:3000/modulo/01-a-nova-era-da-computacao` — BitVsQubit animating
- `http://localhost:3000/modulo/02-o-mundo-quantico` — DoubleSlit toggles working
- `http://localhost:3000/modulo/03-qubits-alem-do-bit` — BlochSphere draggable, EntanglementBell buttons working
- `http://localhost:3000/modulo/10-alem-do-computador-quantico` — QuantumWalk advancing

- [ ] **Final commit (if any remaining changes)**

```bash
git add -A
git commit -m "chore: final visual polish and cleanup"
```
