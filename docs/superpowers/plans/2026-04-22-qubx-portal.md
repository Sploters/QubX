# QubX Portal Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a dark-themed educational portal about Quantum Computing with 6 progressive modules, free navigation, and localStorage-based progress tracking.

**Architecture:** Next.js 14 App Router with server-side MDX rendering via `next-mdx-remote/rsc`. Module metadata lives in `lib/modules.ts`; content lives in `.mdx` files under `content/modules/`. Progress is tracked client-side with a `useProgress` hook backed by `localStorage`. No backend.

**Tech Stack:** Next.js 14, TypeScript, Tailwind CSS, next-mdx-remote, Vitest + @testing-library/react (tests), Vercel (deploy)

---

## File Map

| File | Responsibility |
|------|---------------|
| `app/layout.tsx` | Root layout — wraps all pages with `<Header>` and global styles |
| `app/globals.css` | Tailwind base + custom CSS variables for theme colors |
| `app/page.tsx` | Home page — hero, CTA "Começar trilha" |
| `app/trilha/page.tsx` | Module list — renders all `<ModuleCard>` with progress state |
| `app/modulo/[slug]/page.tsx` | Individual module — loads MDX + renders `<ModuleLayout>` + `<Sidebar>` |
| `lib/modules.ts` | `MODULES` array, `getModuleBySlug()`, `getAdjacentModules()` |
| `lib/mdx.ts` | `getModuleContent(slug)` — reads `.mdx` file from disk |
| `hooks/useProgress.ts` | `useProgress()` — reads/writes visited slugs in `localStorage` |
| `components/Header.tsx` | Fixed top bar: logo + link to /trilha |
| `components/ModuleCard.tsx` | Card for /trilha — title, description, visited indicator |
| `components/Sidebar.tsx` | Collapsible sidebar in module pages — list of all modules |
| `components/ModuleLayout.tsx` | Module page layout — MDX content + sidebar + Prev/Next nav |
| `content/modules/*.mdx` | 6 MDX files, one per module |
| `public/images/` | Assets copied and renamed from `refs/` |
| `tailwind.config.ts` | Custom theme: dark background, purple + cyan accents |
| `next.config.mjs` | Enables MDX support |
| `vitest.config.ts` | Vitest + jsdom setup |

---

## Task 1: Project Scaffolding

**Files:**
- Create: `package.json`, `tsconfig.json`, `next.config.mjs`, `tailwind.config.ts`, `app/globals.css`, `app/layout.tsx`

- [ ] **Step 1: Bootstrap Next.js project**

Run inside `E:/Desktop/PROJETOS/QubX/`:
```bash
npx create-next-app@14 . --typescript --tailwind --eslint --app --src-dir=no --import-alias="@/*"
```
Answer `No` to all "would you like to use..." prompts beyond what's listed above. This creates the project in the existing directory.

- [ ] **Step 2: Install additional dependencies**

```bash
npm install next-mdx-remote
npm install -D vitest @vitejs/plugin-react @testing-library/react @testing-library/jest-dom jsdom
```

- [ ] **Step 3: Configure Vitest**

Create `vitest.config.ts`:
```typescript
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./vitest.setup.ts'],
  },
  resolve: {
    alias: { '@': path.resolve(__dirname, '.') },
  },
})
```

Create `vitest.setup.ts`:
```typescript
import '@testing-library/jest-dom'
```

- [ ] **Step 4: Add test script to package.json**

In `package.json`, add to `"scripts"`:
```json
"test": "vitest run",
"test:watch": "vitest"
```

- [ ] **Step 5: Configure next.config.mjs**

Replace the generated file:
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {}
export default nextConfig
```

- [ ] **Step 6: Commit**

```bash
git init
git add .
git commit -m "feat: bootstrap Next.js 14 project with Tailwind and Vitest"
```

---

## Task 2: Theme Configuration

**Files:**
- Modify: `tailwind.config.ts`
- Modify: `app/globals.css`
- Modify: `app/layout.tsx`

- [ ] **Step 1: Configure Tailwind with custom colors**

Replace `tailwind.config.ts`:
```typescript
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{ts,tsx,mdx}',
    './components/**/*.{ts,tsx}',
    './content/**/*.mdx',
  ],
  theme: {
    extend: {
      colors: {
        background: '#0a0a0f',
        surface: '#13131f',
        border: '#1e1e30',
        purple: {
          DEFAULT: '#8b5cf6',
          light: '#a78bfa',
          dark: '#6d28d9',
        },
        cyan: {
          DEFAULT: '#06b6d4',
          light: '#22d3ee',
        },
        text: {
          primary: '#f1f5f9',
          secondary: '#94a3b8',
          muted: '#475569',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
export default config
```

- [ ] **Step 2: Set up global CSS**

Replace `app/globals.css`:
```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  body {
    @apply bg-background text-text-primary font-sans;
  }

  h1 { @apply text-4xl font-bold; }
  h2 { @apply text-2xl font-semibold; }
  h3 { @apply text-xl font-semibold; }
  p  { @apply text-text-secondary leading-relaxed; }

  a {
    @apply text-purple hover:text-purple-light transition-colors;
  }

  code {
    @apply bg-surface text-cyan px-1.5 py-0.5 rounded text-sm font-mono;
  }
}
```

- [ ] **Step 3: Update root layout**

Replace `app/layout.tsx`:
```typescript
import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'QubX — Computação Quântica',
  description: 'Portal educativo sobre Computação Quântica, do básico ao técnico.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className="min-h-screen bg-background">
        {children}
      </body>
    </html>
  )
}
```

- [ ] **Step 4: Commit**

```bash
git add tailwind.config.ts app/globals.css app/layout.tsx vitest.config.ts vitest.setup.ts
git commit -m "feat: configure dark theme with purple/cyan accents"
```

---

## Task 3: Module Metadata + MDX Loader

**Files:**
- Create: `lib/modules.ts`
- Create: `lib/mdx.ts`
- Create: `lib/__tests__/modules.test.ts`

- [ ] **Step 1: Write failing tests**

Create `lib/__tests__/modules.test.ts`:
```typescript
import { describe, it, expect } from 'vitest'
import { MODULES, getModuleBySlug, getAdjacentModules } from '../modules'

describe('MODULES', () => {
  it('has exactly 6 modules', () => {
    expect(MODULES).toHaveLength(6)
  })

  it('each module has required fields', () => {
    for (const m of MODULES) {
      expect(m.slug).toBeTruthy()
      expect(m.order).toBeGreaterThan(0)
      expect(m.title).toBeTruthy()
      expect(m.description).toBeTruthy()
    }
  })

  it('orders are sequential starting at 1', () => {
    const orders = MODULES.map((m) => m.order)
    expect(orders).toEqual([1, 2, 3, 4, 5, 6])
  })
})

describe('getModuleBySlug', () => {
  it('returns the correct module', () => {
    const m = getModuleBySlug('01-o-que-e-computacao-quantica')
    expect(m?.order).toBe(1)
  })

  it('returns undefined for unknown slug', () => {
    expect(getModuleBySlug('nope')).toBeUndefined()
  })
})

describe('getAdjacentModules', () => {
  it('first module has no prev', () => {
    const { prev } = getAdjacentModules('01-o-que-e-computacao-quantica')
    expect(prev).toBeNull()
  })

  it('last module has no next', () => {
    const { next } = getAdjacentModules('06-aplicacoes-reais')
    expect(next).toBeNull()
  })

  it('middle module has both prev and next', () => {
    const { prev, next } = getAdjacentModules('03-representacao-da-informacao')
    expect(prev?.order).toBe(2)
    expect(next?.order).toBe(4)
  })
})
```

- [ ] **Step 2: Run tests — expect failure**

```bash
npm test
```
Expected: FAIL — "Cannot find module '../modules'"

- [ ] **Step 3: Implement lib/modules.ts**

Create `lib/modules.ts`:
```typescript
export interface Module {
  slug: string
  order: number
  title: string
  description: string
  videoUrl?: string
  images: string[]
}

export const MODULES: Module[] = [
  {
    slug: '01-o-que-e-computacao-quantica',
    order: 1,
    title: 'O que é Computação Quântica?',
    description: 'Entenda a diferença entre bits e qubits e por que a computação quântica representa uma nova era da computação.',
    videoUrl: 'https://www.youtube.com/embed/e3fz3dqhN44',
    images: ['/images/bit-vs-qubit.png', '/images/qubit-vs-bit.png'],
  },
  {
    slug: '02-fundamentos-quanticos',
    order: 2,
    title: 'Fundamentos Quânticos',
    description: 'Superposição, emaranhamento e a Esfera de Bloch — os três pilares da mecânica quântica aplicada.',
    videoUrl: 'https://www.youtube.com/embed/CfpvQFGNrXk',
    images: ['/images/esfera-de-bloch.png', '/images/quantum-bits-qubits1.gif'],
  },
  {
    slug: '03-representacao-da-informacao',
    order: 3,
    title: 'Representação da Informação',
    description: 'Notação de Dirac, vetores base e como representar estados quânticos matematicamente.',
    videoUrl: 'https://www.youtube.com/embed/videoseries?list=PLOFEBzvs-VvqKKMXX4vbi4EB1uaErFMSO',
    images: ['/images/dirac-notation.png', '/images/standard-basis-vectors.png', '/images/measuring-probabilistic-states.png'],
  },
  {
    slug: '04-circuitos-e-portas',
    order: 4,
    title: 'Circuitos e Portas Quânticas',
    description: 'Como funcionam as portas lógicas quânticas e como montar circuitos no IBM Quantum Composer.',
    videoUrl: 'https://www.youtube.com/embed/pwwuF-DaPk0',
    images: ['/images/superdense-coding.png', '/images/ibm-device.png'],
  },
  {
    slug: '05-programando-com-qiskit',
    order: 5,
    title: 'Programando com Qiskit',
    description: 'Introdução prática ao Qiskit, o SDK open-source da IBM para criar e executar circuitos quânticos.',
    videoUrl: 'https://www.youtube.com/embed/6qD9XElTpCE',
    images: ['/images/linguagem-quantica.png'],
  },
  {
    slug: '06-aplicacoes-reais',
    order: 6,
    title: 'Aplicações Reais',
    description: 'Empresas como Mercedes-Benz já usam computação quântica. Conheça os casos reais e o que está por vir.',
    videoUrl: 'https://www.youtube.com/embed/iaWpoPsSBf4',
    images: ['/images/IBM-Q-System-One-display.png', '/images/computador-quantico-IBM-1.png'],
  },
]

export function getModuleBySlug(slug: string): Module | undefined {
  return MODULES.find((m) => m.slug === slug)
}

export function getAdjacentModules(slug: string): { prev: Module | null; next: Module | null } {
  const index = MODULES.findIndex((m) => m.slug === slug)
  return {
    prev: index > 0 ? MODULES[index - 1] : null,
    next: index < MODULES.length - 1 ? MODULES[index + 1] : null,
  }
}
```

- [ ] **Step 4: Create lib/mdx.ts**

```typescript
import fs from 'fs'
import path from 'path'

export function getModuleContent(slug: string): string {
  const filePath = path.join(process.cwd(), 'content', 'modules', `${slug}.mdx`)
  return fs.readFileSync(filePath, 'utf-8')
}
```

- [ ] **Step 5: Run tests — expect pass**

```bash
npm test
```
Expected: PASS — 7 tests passing

- [ ] **Step 6: Commit**

```bash
git add lib/
git commit -m "feat: add module metadata and MDX loader"
```

---

## Task 4: useProgress Hook

**Files:**
- Create: `hooks/useProgress.ts`
- Create: `hooks/__tests__/useProgress.test.ts`

- [ ] **Step 1: Write failing tests**

Create `hooks/__tests__/useProgress.test.ts`:
```typescript
import { describe, it, expect, beforeEach, vi } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useProgress } from '../useProgress'

const STORAGE_KEY = 'qubx-progress'

beforeEach(() => {
  localStorage.clear()
  vi.clearAllMocks()
})

describe('useProgress', () => {
  it('starts with empty visited set when localStorage is empty', () => {
    const { result } = renderHook(() => useProgress())
    expect(result.current.visited.size).toBe(0)
  })

  it('loads existing progress from localStorage on mount', () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(['slug-1', 'slug-2']))
    const { result } = renderHook(() => useProgress())
    expect(result.current.visited.has('slug-1')).toBe(true)
    expect(result.current.visited.has('slug-2')).toBe(true)
  })

  it('markVisited adds slug to visited set', () => {
    const { result } = renderHook(() => useProgress())
    act(() => result.current.markVisited('slug-1'))
    expect(result.current.visited.has('slug-1')).toBe(true)
  })

  it('markVisited persists to localStorage', () => {
    const { result } = renderHook(() => useProgress())
    act(() => result.current.markVisited('slug-1'))
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]')
    expect(stored).toContain('slug-1')
  })

  it('markVisited does not duplicate slugs', () => {
    const { result } = renderHook(() => useProgress())
    act(() => result.current.markVisited('slug-1'))
    act(() => result.current.markVisited('slug-1'))
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]')
    expect(stored.filter((s: string) => s === 'slug-1')).toHaveLength(1)
  })
})
```

- [ ] **Step 2: Run tests — expect failure**

```bash
npm test
```
Expected: FAIL — "Cannot find module '../useProgress'"

- [ ] **Step 3: Implement useProgress hook**

Create `hooks/useProgress.ts`:
```typescript
'use client'

import { useState, useEffect, useCallback } from 'react'

const STORAGE_KEY = 'qubx-progress'

export function useProgress() {
  const [visited, setVisited] = useState<Set<string>>(new Set())

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) setVisited(new Set(JSON.parse(stored)))
    } catch {
      // localStorage unavailable — proceed with empty set
    }
  }, [])

  const markVisited = useCallback((slug: string) => {
    setVisited((prev) => {
      const next = new Set(prev)
      next.add(slug)
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify([...next]))
      } catch {
        // ignore write errors
      }
      return next
    })
  }, [])

  return { visited, markVisited }
}
```

- [ ] **Step 4: Run tests — expect pass**

```bash
npm test
```
Expected: PASS — all 5 useProgress tests passing

- [ ] **Step 5: Commit**

```bash
git add hooks/
git commit -m "feat: add useProgress hook with localStorage persistence"
```

---

## Task 5: Header Component

**Files:**
- Create: `components/Header.tsx`
- Modify: `app/layout.tsx`

- [ ] **Step 1: Create Header component**

Create `components/Header.tsx`:
```typescript
import Link from 'next/link'

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/80 backdrop-blur-sm">
      <div className="mx-auto max-w-6xl px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 no-underline">
          <span className="text-xl font-bold text-text-primary">
            Qub<span className="text-purple">X</span>
          </span>
        </Link>
        <nav>
          <Link
            href="/trilha"
            className="text-sm font-medium text-text-secondary hover:text-purple transition-colors no-underline"
          >
            Trilha de aprendizado
          </Link>
        </nav>
      </div>
    </header>
  )
}
```

- [ ] **Step 2: Add Header to root layout**

Update `app/layout.tsx`:
```typescript
import type { Metadata } from 'next'
import './globals.css'
import { Header } from '@/components/Header'

export const metadata: Metadata = {
  title: 'QubX — Computação Quântica',
  description: 'Portal educativo sobre Computação Quântica, do básico ao técnico.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className="min-h-screen bg-background">
        <Header />
        <main className="pt-16">
          {children}
        </main>
      </body>
    </html>
  )
}
```

- [ ] **Step 3: Commit**

```bash
git add components/Header.tsx app/layout.tsx
git commit -m "feat: add fixed header with QubX logo and nav link"
```

---

## Task 6: Home Page

**Files:**
- Modify: `app/page.tsx`

- [ ] **Step 1: Replace generated home page**

Replace `app/page.tsx`:
```typescript
import Link from 'next/link'

export default function HomePage() {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center px-4 text-center">
      {/* Decorative glow */}
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full opacity-10 blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(circle, #8b5cf6, #06b6d4)' }}
      />

      <div className="relative z-10 max-w-2xl">
        <p className="text-sm font-medium text-cyan tracking-widest uppercase mb-4">
          Portal Educativo
        </p>

        <h1 className="text-5xl md:text-6xl font-bold text-text-primary mb-6 leading-tight">
          Bem-vindo ao{' '}
          <span className="text-transparent bg-clip-text"
            style={{ backgroundImage: 'linear-gradient(135deg, #8b5cf6, #06b6d4)' }}>
            QubX
          </span>
        </h1>

        <p className="text-lg text-text-secondary mb-10 max-w-xl mx-auto">
          Explore a Computação Quântica do zero ao nível técnico. Uma trilha progressiva
          construída a partir de pesquisa acadêmica real.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/trilha"
            className="inline-block px-8 py-3 rounded-lg font-semibold text-white no-underline transition-all hover:opacity-90 hover:scale-[1.02]"
            style={{ background: 'linear-gradient(135deg, #8b5cf6, #06b6d4)' }}
          >
            Começar trilha
          </Link>
          <Link
            href="/modulo/01-o-que-e-computacao-quantica"
            className="inline-block px-8 py-3 rounded-lg font-semibold text-text-secondary border border-border hover:border-purple hover:text-purple no-underline transition-all"
          >
            Primeiro módulo →
          </Link>
        </div>

        <div className="mt-16 grid grid-cols-3 gap-8 text-center">
          {[
            { label: 'Módulos', value: '6' },
            { label: 'Nível', value: 'Zero ao técnico' },
            { label: 'Acesso', value: 'Gratuito' },
          ].map(({ label, value }) => (
            <div key={label}>
              <div className="text-2xl font-bold text-purple">{value}</div>
              <div className="text-sm text-text-muted mt-1">{label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Run dev server and verify visually**

```bash
npm run dev
```
Open `http://localhost:3000`. Verify: dark background, gradient title "QubX", two buttons, 3 stats at the bottom.

- [ ] **Step 3: Commit**

```bash
git add app/page.tsx
git commit -m "feat: add home page with hero section"
```

---

## Task 7: ModuleCard + Trilha Page

**Files:**
- Create: `components/ModuleCard.tsx`
- Create: `app/trilha/page.tsx`

- [ ] **Step 1: Create ModuleCard component**

Create `components/ModuleCard.tsx`:
```typescript
'use client'

import Link from 'next/link'
import type { Module } from '@/lib/modules'

interface ModuleCardProps {
  module: Module
  visited: boolean
}

export function ModuleCard({ module, visited }: ModuleCardProps) {
  return (
    <Link
      href={`/modulo/${module.slug}`}
      className="group block p-6 rounded-xl border border-border bg-surface hover:border-purple transition-all no-underline"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <span
            className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold"
            style={{
              background: visited
                ? 'linear-gradient(135deg, #8b5cf6, #06b6d4)'
                : 'transparent',
              border: visited ? 'none' : '1px solid #1e1e30',
              color: visited ? 'white' : '#475569',
            }}
          >
            {visited ? '✓' : module.order}
          </span>
          <h3 className="text-text-primary group-hover:text-purple transition-colors font-semibold">
            {module.title}
          </h3>
        </div>
        <span className="text-text-muted text-sm flex-shrink-0 mt-1">→</span>
      </div>
      <p className="text-text-secondary text-sm mt-3 ml-11 leading-relaxed">
        {module.description}
      </p>
    </Link>
  )
}
```

- [ ] **Step 2: Create trilha page**

Create `app/trilha/page.tsx`:
```typescript
'use client'

import { MODULES } from '@/lib/modules'
import { ModuleCard } from '@/components/ModuleCard'
import { useProgress } from '@/hooks/useProgress'

export default function TrilhaPage() {
  const { visited } = useProgress()
  const completedCount = MODULES.filter((m) => visited.has(m.slug)).length

  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <div className="mb-10">
        <p className="text-sm text-cyan tracking-widest uppercase mb-2">Trilha de aprendizado</p>
        <h1 className="text-3xl font-bold text-text-primary mb-3">Computação Quântica</h1>
        <p className="text-text-secondary">
          {completedCount === 0
            ? 'Comece por onde quiser ou siga a trilha sugerida.'
            : `Você visitou ${completedCount} de ${MODULES.length} módulos.`}
        </p>

        {/* Progress bar */}
        <div className="mt-4 h-1.5 bg-border rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{
              width: `${(completedCount / MODULES.length) * 100}%`,
              background: 'linear-gradient(90deg, #8b5cf6, #06b6d4)',
            }}
          />
        </div>
      </div>

      <div className="flex flex-col gap-3">
        {MODULES.map((module) => (
          <ModuleCard
            key={module.slug}
            module={module}
            visited={visited.has(module.slug)}
          />
        ))}
      </div>
    </div>
  )
}
```

- [ ] **Step 3: Verify in browser**

```bash
npm run dev
```
Navigate to `http://localhost:3000/trilha`. Verify: 6 module cards, empty progress bar, numbers shown (no checkmarks yet).

- [ ] **Step 4: Commit**

```bash
git add components/ModuleCard.tsx app/trilha/
git commit -m "feat: add trilha page with module cards and progress bar"
```

---

## Task 8: Sidebar Component

**Files:**
- Create: `components/Sidebar.tsx`

- [ ] **Step 1: Create Sidebar**

Create `components/Sidebar.tsx`:
```typescript
'use client'

import Link from 'next/link'
import { useState } from 'react'
import { MODULES } from '@/lib/modules'

interface SidebarProps {
  currentSlug: string
  visited: Set<string>
}

export function Sidebar({ currentSlug, visited }: SidebarProps) {
  const [open, setOpen] = useState(false)

  return (
    <>
      {/* Mobile toggle */}
      <button
        onClick={() => setOpen(!open)}
        className="lg:hidden fixed bottom-6 right-6 z-40 w-12 h-12 rounded-full flex items-center justify-center text-white shadow-lg"
        style={{ background: 'linear-gradient(135deg, #8b5cf6, #06b6d4)' }}
        aria-label="Toggle menu"
      >
        {open ? '✕' : '☰'}
      </button>

      {/* Overlay on mobile */}
      {open && (
        <div
          className="lg:hidden fixed inset-0 bg-black/60 z-30"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar panel */}
      <aside
        className={`
          fixed top-16 right-0 h-[calc(100vh-4rem)] w-64 z-30
          bg-surface border-l border-border overflow-y-auto
          transition-transform duration-200
          ${open ? 'translate-x-0' : 'translate-x-full'}
          lg:translate-x-0 lg:static lg:h-auto lg:w-56 lg:border-l-0 lg:bg-transparent
        `}
      >
        <div className="p-4">
          <p className="text-xs font-medium text-text-muted uppercase tracking-widest mb-3">
            Módulos
          </p>
          <nav className="flex flex-col gap-1">
            {MODULES.map((module) => {
              const isCurrent = module.slug === currentSlug
              const isVisited = visited.has(module.slug)

              return (
                <Link
                  key={module.slug}
                  href={`/modulo/${module.slug}`}
                  onClick={() => setOpen(false)}
                  className={`
                    flex items-center gap-2 px-3 py-2 rounded-lg text-sm no-underline transition-all
                    ${isCurrent
                      ? 'bg-purple/20 text-purple font-medium'
                      : 'text-text-secondary hover:text-text-primary hover:bg-border/40'
                    }
                  `}
                >
                  <span
                    className={`w-5 h-5 rounded-full flex items-center justify-center text-xs flex-shrink-0 ${
                      isVisited ? 'bg-purple text-white' : 'border border-border text-text-muted'
                    }`}
                  >
                    {isVisited ? '✓' : module.order}
                  </span>
                  <span className="truncate">{module.title}</span>
                </Link>
              )
            })}
          </nav>
        </div>
      </aside>
    </>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add components/Sidebar.tsx
git commit -m "feat: add sidebar with module navigation and visited indicators"
```

---

## Task 9: MDX Content Files

**Files:**
- Create: `content/modules/01-o-que-e-computacao-quantica.mdx`
- Create: `content/modules/02-fundamentos-quanticos.mdx`
- Create: `content/modules/03-representacao-da-informacao.mdx`
- Create: `content/modules/04-circuitos-e-portas.mdx`
- Create: `content/modules/05-programando-com-qiskit.mdx`
- Create: `content/modules/06-aplicacoes-reais.mdx`

- [ ] **Step 1: Create content directory**

```bash
mkdir -p content/modules
```

- [ ] **Step 2: Create Module 1**

Create `content/modules/01-o-que-e-computacao-quantica.mdx`:
```mdx
## O que é um computador quântico?

Um computador quântico é um tipo de computador que aproveita os fenômenos da **mecânica quântica** — como superposição e emaranhamento — para processar informações de forma radicalmente diferente dos computadores clássicos.

Enquanto computadores clássicos processam informação em **bits** (0 ou 1), computadores quânticos usam **qubits**, que podem existir em uma combinação de 0 e 1 ao mesmo tempo.

## Bit vs Qubit

![Comparação bit vs qubit](/images/bit-vs-qubit.png)

Um **bit clássico** é como um interruptor de luz: ou está ligado (1) ou desligado (0).

Um **qubit** é como um ponteiro giroscópico: ele pode apontar para cima (|0⟩), para baixo (|1⟩), ou para qualquer direção intermediária — ao mesmo tempo.

![Representação visual de qubit](/images/qubit-vs-bit.png)

Essa propriedade é chamada de **superposição**, e é o que dá aos computadores quânticos seu poder de processamento paralelo.

## Por que isso importa?

Para certos problemas — como fatoração de números enormes, simulação molecular e otimização logística — computadores quânticos podem ser exponencialmente mais rápidos que os clássicos.

Empresas como IBM, Google, e Microsoft já investem bilhões nessa tecnologia. A corrida quântica é real.

## Linha do tempo

| Ano | Marco |
|-----|-------|
| 1981 | Richard Feynman propõe computadores quânticos para simulação física |
| 1994 | Peter Shor cria algoritmo quântico para fatoração (ameaça à criptografia RSA) |
| 2019 | Google anuncia "supremacia quântica" com o processador Sycamore |
| 2023 | IBM lança processador de 1.121 qubits (Condor) |
| Hoje | Computadores quânticos acessíveis via nuvem (IBM Quantum) |
```

- [ ] **Step 3: Create Module 2**

Create `content/modules/02-fundamentos-quanticos.mdx`:
```mdx
## Superposição

Um qubit em superposição existe em uma combinação de |0⟩ e |1⟩ simultaneamente. Matematicamente:

```
|ψ⟩ = α|0⟩ + β|1⟩
```

onde α e β são números complexos e |α|² + |β|² = 1.

Quando medimos o qubit, ele "colapsa" para 0 com probabilidade |α|² ou para 1 com probabilidade |β|².

![Animação de qubit em superposição](/images/quantum-bits-qubits1.gif)

## Emaranhamento

Dois qubits podem ser **emaranhados**: o estado de um afeta instantaneamente o estado do outro, independente da distância física. Einstein chamou isso de "ação fantasmagórica à distância".

Essa propriedade é fundamental para protocolos como a **Codificação Superdensa** e a **Teleportação Quântica**.

## A Esfera de Bloch

A Esfera de Bloch é a representação visual do estado de um qubit. Cada ponto na superfície da esfera representa um estado quântico possível.

![Esfera de Bloch](/images/esfera-de-bloch.png)

- **Polo norte** → estado |0⟩
- **Polo sul** → estado |1⟩
- **Equador** → superposição igual (50/50)
- **Qualquer outro ponto** → superposição com diferentes probabilidades

Portas quânticas são operações que **rotacionam** o qubit na esfera.

## Decoerência

O maior desafio da computação quântica é a **decoerência**: a tendência dos qubits de perder seu estado quântico ao interagir com o ambiente. É por isso que computadores quânticos reais precisam operar perto do zero absoluto (≈ −273°C).
```

- [ ] **Step 4: Create Module 3**

Create `content/modules/03-representacao-da-informacao.mdx`:
```mdx
## Notação de Dirac (Bra-ket)

A notação de Dirac é a linguagem padrão da mecânica quântica para descrever estados.

![Notação de Dirac](/images/dirac-notation.png)

- **Ket** `|ψ⟩` — representa um estado quântico (vetor coluna)
- **Bra** `⟨ψ|` — representa o conjugado transposto (vetor linha)
- **Braket** `⟨φ|ψ⟩` — produto interno (probabilidade de transição entre estados)

## Vetores Base

Os estados computacionais de um qubit são representados pelos vetores base:

![Vetores base](/images/standard-basis-vectors.png)

```
|0⟩ = [1]    |1⟩ = [0]
      [0]          [1]
```

Um estado geral é uma combinação linear desses vetores:
```
|ψ⟩ = α|0⟩ + β|1⟩ = [α]
                      [β]
```

## Estados Probabilísticos

Quando medimos um qubit, o resultado é probabilístico. Para o estado `|ψ⟩ = α|0⟩ + β|1⟩`:

- Probabilidade de medir 0 = |α|²
- Probabilidade de medir 1 = |β|²

![Medindo estados probabilísticos](/images/measuring-probabilistic-states.png)

A medição **destrói** a superposição — após medir, o qubit está definitivamente em 0 ou 1.

## Informação Clássica vs Quântica

| Aspecto | Clássico | Quântico |
|---------|----------|---------|
| Unidade básica | Bit (0 ou 1) | Qubit (superposição) |
| Cópia | Trivial | Impossível (No-Cloning Theorem) |
| Medição | Não perturba | Colapsa o estado |
| n bits de informação | 2ⁿ estados possíveis, 1 por vez | 2ⁿ estados simultâneos |
```

- [ ] **Step 5: Create Module 4**

Create `content/modules/04-circuitos-e-portas.mdx`:
```mdx
## O que são portas quânticas?

Assim como computadores clássicos usam portas lógicas (AND, OR, NOT), computadores quânticos usam **portas quânticas** para manipular qubits.

Toda porta quântica é:
- **Reversível** — ao contrário de AND e OR clássicos
- **Representada por uma matriz unitária** — preserva a normalização do estado
- **Uma rotação na Esfera de Bloch**

## Portas Fundamentais

**Porta X (NOT quântico)**
```
X = [0 1]   X|0⟩ = |1⟩   X|1⟩ = |0⟩
    [1 0]
```

**Porta H (Hadamard) — cria superposição**
```
H = 1/√2 × [1  1]   H|0⟩ = (|0⟩ + |1⟩)/√2
            [1 -1]
```

**Porta CNOT — emaranha dois qubits**
```
CNOT|00⟩ = |00⟩
CNOT|01⟩ = |01⟩
CNOT|10⟩ = |11⟩
CNOT|11⟩ = |10⟩
```

## Dispositivo IBM de 4 Qubits

![Dispositivo IBM com 4 qubits e barramento](/images/ibm-device.png)

O dispositivo acima mostra a arquitetura física de um chip quântico com 4 qubits conectados por um barramento de ressonadores supercondutores.

## Codificação Superdensa

![Diagrama de Codificação Superdensa](/images/superdense-coding.png)

A Codificação Superdensa permite transmitir **2 bits clássicos** usando apenas **1 qubit** (desde que os dois qubits estejam previamente emaranhados). É uma das primeiras aplicações práticas do emaranhamento.

## IBM Quantum Composer

O IBM Quantum Composer é um editor visual gratuito de circuitos quânticos, acessível pelo navegador.

👉 Acesse: [quantum-computing.ibm.com/composer](https://quantum-computing.ibm.com/composer/files/new)

Experimente criar um circuito com uma porta H seguida de uma medição — você verá o resultado oscilando entre 0 e 1 com 50% de probabilidade cada.
```

- [ ] **Step 6: Create Module 5**

Create `content/modules/05-programando-com-qiskit.mdx`:
```mdx
## O que é Qiskit?

Qiskit é o SDK open-source da IBM para computação quântica. Com ele você pode:

- Criar circuitos quânticos em Python
- Simular localmente
- Executar em hardware quântico real via IBM Quantum Cloud

![Linguagem de programação quântica](/images/linguagem-quantica.png)

## Instalação

```bash
pip install qiskit
pip install qiskit-aer          # simulador local
pip install qiskit-ibm-runtime  # acesso ao hardware IBM
```

## Primeiro Circuito: Superposição

```python
from qiskit import QuantumCircuit
from qiskit_aer import AerSimulator

# Cria um circuito com 1 qubit e 1 bit clássico
qc = QuantumCircuit(1, 1)

# Aplica Hadamard — coloca o qubit em superposição
qc.h(0)

# Mede o qubit
qc.measure(0, 0)

# Simula 1000 vezes
sim = AerSimulator()
job = sim.run(qc, shots=1000)
result = job.result()

print(result.get_counts())
# Output esperado: {'0': ~500, '1': ~500}
```

## Segundo Circuito: Emaranhamento (Bell State)

```python
from qiskit import QuantumCircuit
from qiskit_aer import AerSimulator

qc = QuantumCircuit(2, 2)

# Hadamard no qubit 0
qc.h(0)

# CNOT com controle=0, alvo=1 (cria emaranhamento)
qc.cx(0, 1)

# Mede ambos
qc.measure([0, 1], [0, 1])

sim = AerSimulator()
result = sim.run(qc, shots=1000).result()

print(result.get_counts())
# Output esperado: {'00': ~500, '11': ~500}
# Nunca 01 ou 10 — os qubits estão correlacionados!
```

## Recursos para continuar

- 📚 [Qiskit Textbook](https://qiskit.org/learn) — curso completo gratuito
- 🖥️ [IBM Quantum](https://quantum-computing.ibm.com) — acesso a hardware real
- 🎥 Playlist "Understanding Quantum Information" no YouTube (Qiskit oficial)
```

- [ ] **Step 7: Create Module 6**

Create `content/modules/06-aplicacoes-reais.mdx`:
```mdx
## Computação Quântica no Mundo Real

A computação quântica deixou de ser teoria. Empresas de setores completamente diferentes já estão investindo e aplicando.

![IBM Q System One](/images/IBM-Q-System-One-display.png)

O IBM Q System One é o primeiro computador quântico integrado para uso comercial, lançado em 2019. Ele fica dentro de um cilindro hermético para manter a temperatura próxima do zero absoluto.

## Mercedes-Benz

A Mercedes-Benz usa computação quântica para:

- **Otimização de rotas de produção** — redução de custos na cadeia de suprimentos
- **Simulação de materiais para baterias** — acelerando o desenvolvimento de baterias de próxima geração para veículos elétricos
- **Otimização de tráfego** — modelos de mobilidade urbana

> "Estamos explorando ativamente casos de uso quânticos que poderiam transformar nossa cadeia de valor inteira." — Mercedes-Benz Research Team

## Criptografia

O algoritmo de Shor pode quebrar a criptografia RSA (base da segurança da internet) em tempo polinomial. Isso impulsionou o desenvolvimento da **criptografia pós-quântica** — algoritmos clássicos resistentes a ataques quânticos.

O NIST (Instituto Nacional de Padrões dos EUA) padronizou os primeiros algoritmos pós-quânticos em 2024.

## Descoberta de Medicamentos

Simular moléculas complexas é exponencialmente difícil para computadores clássicos. Computadores quânticos podem simular interações moleculares com precisão química, acelerando o desenvolvimento de novos fármacos.

## Música Quântica

![IBM Quantum](/images/computador-quantico-IBM-1.png)

Pesquisadores da University of Melbourne criaram o **qMuVi** — um sistema que sonifica estados quânticos em música. Cada nota corresponde a um estado probabilístico de qubits. A música gerada é literalmente aleatória no sentido quântico, não pseudoaleatório.

## O que vem por aí?

| Horizonte | Expectativa |
|-----------|------------|
| 2025–2027 | Vantagem quântica em problemas de otimização específicos |
| 2028–2032 | Quebra prática de criptografia RSA-2048 (com correção de erros) |
| 2030+ | Simulação molecular completa para design de fármacos |
| Futuro distante | Computação quântica de uso geral |

A janela para aprender computação quântica está aberta agora — as empresas que investirem cedo terão vantagem competitiva significativa.
```

- [ ] **Step 8: Commit**

```bash
git add content/
git commit -m "feat: add MDX content for all 6 quantum computing modules"
```

---

## Task 10: ModuleLayout + Module Page

**Files:**
- Create: `components/ModuleLayout.tsx`
- Create: `app/modulo/[slug]/page.tsx`

- [ ] **Step 1: Create ModuleLayout component**

Create `components/ModuleLayout.tsx`:
```typescript
'use client'

import Link from 'next/link'
import { useEffect } from 'react'
import type { Module } from '@/lib/modules'
import { Sidebar } from './Sidebar'
import { useProgress } from '@/hooks/useProgress'

interface ModuleLayoutProps {
  module: Module
  prev: Module | null
  next: Module | null
  children: React.ReactNode
}

export function ModuleLayout({ module, prev, next, children }: ModuleLayoutProps) {
  const { visited, markVisited } = useProgress()

  useEffect(() => {
    markVisited(module.slug)
  }, [module.slug, markVisited])

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <div className="flex gap-8">
        {/* Main content */}
        <article className="flex-1 min-w-0">
          {/* Module header */}
          <div className="mb-8">
            <Link href="/trilha" className="text-sm text-text-muted hover:text-purple no-underline">
              ← Trilha
            </Link>
            <div className="flex items-center gap-3 mt-3">
              <span
                className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-white flex-shrink-0"
                style={{ background: 'linear-gradient(135deg, #8b5cf6, #06b6d4)' }}
              >
                {module.order}
              </span>
              <h1 className="text-3xl font-bold text-text-primary">{module.title}</h1>
            </div>
            <p className="text-text-secondary mt-3 ml-11">{module.description}</p>
          </div>

          {/* MDX content */}
          <div className="prose prose-invert max-w-none
            prose-headings:text-text-primary prose-headings:font-semibold
            prose-p:text-text-secondary prose-p:leading-relaxed
            prose-a:text-purple prose-a:no-underline hover:prose-a:text-purple-light
            prose-code:text-cyan prose-code:bg-surface prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm
            prose-pre:bg-surface prose-pre:border prose-pre:border-border
            prose-img:rounded-xl prose-img:border prose-img:border-border prose-img:w-full
            prose-table:text-sm prose-th:text-text-primary prose-td:text-text-secondary
            prose-strong:text-text-primary
            prose-blockquote:border-purple prose-blockquote:text-text-secondary
          ">
            {children}
          </div>

          {/* Embedded video */}
          {module.videoUrl && (
            <div className="mt-10">
              <h2 className="text-xl font-semibold text-text-primary mb-4">Vídeo recomendado</h2>
              <div className="relative aspect-video rounded-xl overflow-hidden border border-border">
                <iframe
                  src={module.videoUrl}
                  title={`Vídeo: ${module.title}`}
                  className="absolute inset-0 w-full h-full"
                  allowFullScreen
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                />
              </div>
            </div>
          )}

          {/* Prev / Next navigation */}
          <nav className="mt-12 flex gap-4">
            {prev ? (
              <Link
                href={`/modulo/${prev.slug}`}
                className="flex-1 p-4 rounded-xl border border-border bg-surface hover:border-purple transition-all no-underline group"
              >
                <div className="text-xs text-text-muted mb-1">← Anterior</div>
                <div className="text-sm font-medium text-text-primary group-hover:text-purple transition-colors">
                  {prev.title}
                </div>
              </Link>
            ) : (
              <div className="flex-1" />
            )}

            {next ? (
              <Link
                href={`/modulo/${next.slug}`}
                className="flex-1 p-4 rounded-xl border border-border bg-surface hover:border-purple transition-all no-underline text-right group"
              >
                <div className="text-xs text-text-muted mb-1">Próximo →</div>
                <div className="text-sm font-medium text-text-primary group-hover:text-purple transition-colors">
                  {next.title}
                </div>
              </Link>
            ) : (
              <div className="flex-1 p-4 rounded-xl border border-border bg-surface/50 text-right">
                <div className="text-xs text-text-muted mb-1">Fim da trilha</div>
                <Link href="/trilha" className="text-sm font-medium text-purple no-underline">
                  Ver progresso →
                </Link>
              </div>
            )}
          </nav>
        </article>

        {/* Sidebar */}
        <div className="hidden lg:block w-56 flex-shrink-0">
          <div className="sticky top-24">
            <Sidebar currentSlug={module.slug} visited={visited} />
          </div>
        </div>
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Create module dynamic page**

Create `app/modulo/[slug]/page.tsx`:
```typescript
import { notFound } from 'next/navigation'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { MODULES, getModuleBySlug, getAdjacentModules } from '@/lib/modules'
import { getModuleContent } from '@/lib/mdx'
import { ModuleLayout } from '@/components/ModuleLayout'
import type { Metadata } from 'next'

interface PageProps {
  params: { slug: string }
}

export async function generateStaticParams() {
  return MODULES.map((m) => ({ slug: m.slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const module = getModuleBySlug(params.slug)
  if (!module) return {}
  return {
    title: `${module.title} — QubX`,
    description: module.description,
  }
}

export default function ModulePage({ params }: PageProps) {
  const module = getModuleBySlug(params.slug)
  if (!module) notFound()

  const { prev, next } = getAdjacentModules(params.slug)
  const content = getModuleContent(params.slug)

  return (
    <ModuleLayout module={module} prev={prev} next={next}>
      <MDXRemote source={content} />
    </ModuleLayout>
  )
}
```

- [ ] **Step 3: Install @tailwindcss/typography for prose styles**

```bash
npm install -D @tailwindcss/typography
```

Add plugin to `tailwind.config.ts`:
```typescript
plugins: [require('@tailwindcss/typography')],
```

- [ ] **Step 4: Run dev and verify a module page**

```bash
npm run dev
```
Navigate to `http://localhost:3000/modulo/01-o-que-e-computacao-quantica`. Verify: module title, MDX content rendered, sidebar visible on desktop, Prev/Next nav at bottom.

- [ ] **Step 5: Commit**

```bash
git add components/ModuleLayout.tsx app/modulo/
git commit -m "feat: add module page with MDX rendering, sidebar, and Prev/Next nav"
```

---

## Task 11: Copy Image Assets

**Files:**
- Create: `public/images/` (copy and rename from `refs/`)

- [ ] **Step 1: Copy and rename assets**

Run from the project root (`E:/Desktop/PROJETOS/QubX/`):
```bash
mkdir -p public/images

# Module 1
cp "refs/bit-vs-qubit.png"                   "public/images/bit-vs-qubit.png"
cp "refs/qubit-vs-bit_tbmnl_en-us.png"       "public/images/qubit-vs-bit.png"

# Module 2
cp "refs/Esfera de Bloch.png"                "public/images/esfera-de-bloch.png"
cp "refs/quantum-bits-qubits1.gif"           "public/images/quantum-bits-qubits1.gif"
cp "refs/quantum-bits-qubits2.gif"           "public/images/quantum-bits-qubits2.gif"

# Module 3
cp "refs/Dirac notation (first part).png"    "public/images/dirac-notation.png"
cp "refs/standard basis vectors.png"         "public/images/standard-basis-vectors.png"
cp "refs/Measuring probabilistic states.png" "public/images/measuring-probabilistic-states.png"

# Module 4
cp "refs/SuperDense Coding.png"              "public/images/superdense-coding.png"
cp "refs/4_Qubit2C_4_Bus2C_4_Resonator_IBM_Device_28Jay_M.png" "public/images/ibm-device.png"

# Module 5
cp "refs/Linguagem de Programação Voltada para Computação Quântica.png" "public/images/linguagem-quantica.png"

# Module 6
cp "refs/IBM-Q-System-One-display.png"       "public/images/IBM-Q-System-One-display.png"
cp "refs/computador-quantico-IBM-1.png"      "public/images/computador-quantico-IBM-1.png"
```

- [ ] **Step 2: Verify images load**

Navigate to `http://localhost:3000/modulo/02-fundamentos-quanticos`. Verify: Esfera de Bloch image and GIF render correctly.

- [ ] **Step 3: Add public/images to .gitignore or commit selectively**

Commit the images (they're part of the project content):
```bash
git add public/images/
git commit -m "feat: add image assets for all 6 modules"
```

---

## Task 12: Final Check + Vercel Deploy

**Files:**
- Create: `.gitignore` (verify node_modules excluded)

- [ ] **Step 1: Run full test suite**

```bash
npm test
```
Expected: all tests passing (modules + useProgress)

- [ ] **Step 2: Run production build locally**

```bash
npm run build
```
Expected: Build completes with no errors. All 6 module pages listed as static routes.

- [ ] **Step 3: Push to GitHub**

Create a new repo at github.com (name: `qubx`), then:
```bash
git remote add origin https://github.com/<your-username>/qubx.git
git branch -M main
git push -u origin main
```

- [ ] **Step 4: Deploy on Vercel**

1. Go to [vercel.com](https://vercel.com) → New Project
2. Import the `qubx` GitHub repo
3. Framework: **Next.js** (auto-detected)
4. Build command: `npm run build` (default)
5. Output directory: `.next` (default)
6. Click **Deploy**

Vercel assigns a free domain: `qubx.vercel.app` (or similar).

- [ ] **Step 5: Verify live deploy**

Open the Vercel URL. Test:
- [ ] Home page loads
- [ ] `/trilha` shows all 6 modules
- [ ] Navigate through a module, verify MDX content and images
- [ ] Progress persists after page refresh (localStorage)
- [ ] Sidebar navigation works
- [ ] Mobile layout (hamburger menu) works

- [ ] **Step 6: Final commit**

```bash
git add .
git commit -m "chore: production-ready QubX portal"
git push
```
