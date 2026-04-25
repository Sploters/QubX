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
