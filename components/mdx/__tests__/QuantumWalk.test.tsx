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
