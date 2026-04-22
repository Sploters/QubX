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

  it('returns both null for unknown slug', () => {
    const { prev, next } = getAdjacentModules('nonexistent-slug')
    expect(prev).toBeNull()
    expect(next).toBeNull()
  })
})
