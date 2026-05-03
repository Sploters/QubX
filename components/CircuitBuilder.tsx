'use client'

import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

type GateType = 'H' | 'X' | 'Z' | 'CNOT' | 'measure'

interface Gate {
  type: GateType
  id: string
  targetQubit: number
}

const GATES: { type: GateType; label: string; color: string }[] = [
  { type: 'H', label: 'Hadamard', color: 'from-accent-cyan to-accent-cyan/80' },
  { type: 'X', label: 'Pauli-X', color: 'from-accent-orange to-accent-orange/80' },
  { type: 'Z', label: 'Pauli-Z', color: 'from-accent-pink to-accent-pink/80' },
  { type: 'CNOT', label: 'CNOT', color: 'from-accent-yellow to-accent-yellow/80' },
  { type: 'measure', label: 'Medir', color: 'from-purple to-purple/80' },
]

interface CircuitBuilderProps {
  qubits?: number
  className?: string
}

export function CircuitBuilder({ qubits = 2, className = '' }: CircuitBuilderProps) {
  const [gates, setGates] = useState<Gate[]>([])

  const addGate = useCallback((type: GateType) => {
    setGates((prev) => [...prev, { type, id: `${type}-${Date.now()}`, targetQubit: 0 }])
  }, [])

  const clearCircuit = useCallback(() => {
    setGates([])
  }, [])

  const removeGate = useCallback((id: string) => {
    setGates((prev) => prev.filter((g) => g.id !== id))
  }, [])

  const getResult = () => {
    if (gates.length === 0) return null
    const hCount = gates.filter((g) => g.type === 'H').length
    const xCount = gates.filter((g) => g.type === 'X').length
    const hasMeasure = gates.some((g) => g.type === 'measure')

    return {
      superposition: hCount > 0,
      flipped: xCount % 2 === 1,
      measured: hasMeasure,
    }
  }

  const result = getResult()

  return (
    <div className={`card overflow-hidden ${className}`}>
      <div className="p-5">
        <div className="flex items-center justify-between mb-4">
          <h4 className="font-display font-semibold text-text-primary flex items-center gap-2">
            <svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-accent-cyan">
              <rect x="2" y="2" width="16" height="16" rx="2" />
              <path d="M7 2v16M13 2v16M2 7h16M2 13h16" />
            </svg>
            Construtor de Circuitos
          </h4>
          {gates.length > 0 && (
            <button type="button" onClick={clearCircuit} className="text-xs text-text-muted hover:text-accent-pink transition-colors">
              Limpar
            </button>
          )}
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {GATES.map(({ type, label, color }) => (
            <motion.button
              key={type}
              type="button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => addGate(type)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium text-white bg-gradient-to-r ${color} shadow-lg`}
            >
              {label}
            </motion.button>
          ))}
        </div>

        <div className="bg-elevated/30 rounded-xl border border-white/5 p-4 min-h-[120px]">
          {Array.from({ length: qubits }, (_, qi) => (
            <div key={qi} className="flex items-center gap-3 py-2 border-b border-white/5 last:border-0">
              <span className="text-xs font-mono text-text-muted w-8">q{qi}</span>
              <div className="flex-1 h-8 flex items-center gap-1">
                <AnimatePresence>
                  {gates.filter((g) => g.targetQubit === qi).map((gate) => (
                    <motion.button
                      key={gate.id}
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.5 }}
                      onClick={() => removeGate(gate.id)}
                      className="w-8 h-8 rounded-lg text-xs font-bold text-white bg-gradient-to-br from-accent-cyan to-purple cursor-pointer hover:opacity-80 transition-opacity"
                      title="Clique para remover"
                    >
                      {gate.type === 'measure' ? 'M' : gate.type}
                    </motion.button>
                  ))}
                </AnimatePresence>
                {gates.filter((g) => g.targetQubit === qi).length === 0 && (
                  <span className="text-xs text-text-muted italic">---</span>
                )}
              </div>
            </div>
          ))}
        </div>

        {result && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 grid grid-cols-3 gap-2"
          >
            <div className={`p-3 rounded-xl text-center text-xs border ${
              result.superposition ? 'bg-accent-cyan/10 border-accent-cyan/20 text-accent-cyan' : 'bg-elevated/50 border-white/5 text-text-muted'
            }`}>
              <div className="font-semibold mb-0.5">Superposição</div>
              <div>{result.superposition ? '✨ Ativa' : '—'}</div>
            </div>
            <div className={`p-3 rounded-xl text-center text-xs border ${
              result.flipped ? 'bg-accent-orange/10 border-accent-orange/20 text-accent-orange' : 'bg-elevated/50 border-white/5 text-text-muted'
            }`}>
              <div className="font-semibold mb-0.5">Inversão</div>
              <div>{result.flipped ? '⚡ Sim' : '—'}</div>
            </div>
            <div className={`p-3 rounded-xl text-center text-xs border ${
              result.measured ? 'bg-purple/10 border-purple/20 text-purple' : 'bg-elevated/50 border-white/5 text-text-muted'
            }`}>
              <div className="font-semibold mb-0.5">Medição</div>
              <div>{result.measured ? '📊 Sim' : '—'}</div>
            </div>
          </motion.div>
        )}

        {!result && (
          <p className="text-xs text-text-muted text-center mt-4 italic">
            Adicione portas ao circuito para ver o resultado
          </p>
        )}
      </div>
    </div>
  )
}
