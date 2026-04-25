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
