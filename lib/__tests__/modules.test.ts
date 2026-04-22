import { describe, it, expect } from 'vitest'
import { MODULES, getModuleBySlug, getAdjacentModules } from '../modules'

describe('MODULES', () => {
  it('has exactly 10 modules', () => {
    expect(MODULES).toHaveLength(10)
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
    expect(orders).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
  })
})

describe('getModuleBySlug', () => {
  it('returns the correct module for first slug', () => {
    const m = getModuleBySlug('01-a-nova-era-da-computacao')
    expect(m?.order).toBe(1)
  })

  it('returns the correct module for last slug', () => {
    const m = getModuleBySlug('10-alem-do-computador-quantico')
    expect(m?.order).toBe(10)
  })

  it('returns undefined for unknown slug', () => {
    expect(getModuleBySlug('nope')).toBeUndefined()
  })
})

describe('getAdjacentModules', () => {
  it('first module has no prev', () => {
    const { prev } = getAdjacentModules('01-a-nova-era-da-computacao')
    expect(prev).toBeNull()
  })

  it('last module has no next', () => {
    const { next } = getAdjacentModules('10-alem-do-computador-quantico')
    expect(next).toBeNull()
  })

  it('middle module has both prev and next', () => {
    const { prev, next } = getAdjacentModules('05-portas-e-algoritmos-quanticos')
    expect(prev?.order).toBe(4)
    expect(next?.order).toBe(6)
  })

  it('returns both null for unknown slug', () => {
    const { prev, next } = getAdjacentModules('nonexistent-slug')
    expect(prev).toBeNull()
    expect(next).toBeNull()
  })
})
