import { describe, expect, it } from 'vitest'

function suma(a: number, b: number): number {
  return a + b
}

describe('Función Suma', () => {
  it('Suma debe ser una función', () => {
    expect(typeof suma).toBe('function')
  })
})
