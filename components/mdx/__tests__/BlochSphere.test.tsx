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
