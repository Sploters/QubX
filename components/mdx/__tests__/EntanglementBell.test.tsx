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
