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
    expect(screen.getAllByText('|0⟩').length).toBeGreaterThan(0)
    expect(screen.getAllByText('|1⟩').length).toBeGreaterThan(0)
  })
})
