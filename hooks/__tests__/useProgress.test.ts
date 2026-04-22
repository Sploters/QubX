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
