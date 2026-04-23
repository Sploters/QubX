'use client'

import React, { useEffect, useState } from 'react'

export function BitVsQubit() {
  const [bitValue, setBitValue] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setBitValue(v => (v === 0 ? 1 : 0))
    }, 1400)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="my-10 flex flex-col md:flex-row items-stretch justify-center rounded-2xl overflow-hidden border border-border bg-surface/20">

      {/* ── BIT CLÁSSICO ── */}
      <div className="flex-1 flex flex-col items-center justify-center gap-6 p-8 border-b md:border-b-0 md:border-r border-border">
        <p className="text-[11px] font-bold uppercase tracking-widest text-cyan/60">Bit Clássico</p>

        <svg viewBox="0 0 160 160" className="w-32 h-32 drop-shadow-[0_0_18px_rgba(6,182,212,0.25)]">
          <defs>
            <radialGradient id="bitBg" cx="40%" cy="35%" r="65%">
              <stop offset="0%" stopColor="#0e7490" stopOpacity="0.45" />
              <stop offset="100%" stopColor="#042f3d" stopOpacity="0.15" />
            </radialGradient>
          </defs>
          <circle cx="80" cy="80" r="70" fill="url(#bitBg)" stroke="#0891b2" strokeWidth="2" />
          <circle cx="80" cy="80" r="55" fill="none" stroke="#0891b2" strokeWidth="0.8" strokeDasharray="4 3" opacity="0.35" />
          {/* Valor alternando */}
          <text
            key={bitValue}
            x="80" y="97"
            textAnchor="middle"
            fontSize="58"
            fontWeight="bold"
            fill="#06b6d4"
            fontFamily="monospace"
          >
            {bitValue}
          </text>
        </svg>

        <div className="text-center space-y-1">
          <p className="text-sm font-semibold text-text-primary">Apenas 0 ou 1</p>
          <p className="text-xs text-text-secondary">um estado definido por vez</p>
        </div>
      </div>

      {/* ── QUBIT QUÂNTICO ── */}
      <div className="flex-1 flex flex-col items-center justify-center gap-6 p-8">
        <p className="text-[11px] font-bold uppercase tracking-widest text-purple-light/60">Qubit Quântico</p>

        <svg viewBox="0 0 200 200" className="w-40 h-40 drop-shadow-[0_0_22px_rgba(139,92,246,0.35)]">
          <defs>
            <radialGradient id="qubitBg" cx="38%" cy="32%" r="65%">
              <stop offset="0%" stopColor="#5b21b6" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#1e1b4b" stopOpacity="0.15" />
            </radialGradient>
          </defs>

          {/* Esfera */}
          <circle cx="100" cy="100" r="68" fill="url(#qubitBg)" stroke="#7c3aed" strokeWidth="1.5" />

          {/* Equador tracejado */}
          <ellipse cx="100" cy="100" rx="68" ry="20" fill="none" stroke="#6d28d9" strokeWidth="1" strokeDasharray="4 3" opacity="0.55" />

          {/* Eixo vertical */}
          <line x1="100" y1="30" x2="100" y2="170" stroke="#6d28d9" strokeWidth="1" strokeDasharray="4 3" opacity="0.4" />

          {/* Polo Norte — label FORA da esfera (acima) */}
          <text x="100" y="20" textAnchor="middle" fontSize="13" fill="#06b6d4" fontFamily="monospace" fontWeight="bold">|0⟩</text>

          {/* Polo Sul — label FORA da esfera (abaixo) */}
          <text x="100" y="192" textAnchor="middle" fontSize="13" fill="#8b5cf6" fontFamily="monospace" fontWeight="bold">|1⟩</text>

          {/* Vetor de estado girando suavemente — agrupado para animar */}
          <g>
            <animateTransform
              attributeName="transform"
              type="rotate"
              from="0 100 100"
              to="360 100 100"
              dur="7s"
              repeatCount="indefinite"
            />
            <line x1="100" y1="100" x2="148" y2="58" stroke="#a78bfa" strokeWidth="3" strokeLinecap="round" />
            {/* Ponta brilhante */}
            <circle cx="148" cy="58" r="6" fill="#a78bfa" stroke="#c4b5fd" strokeWidth="1.5" />
            {/* Projeção sutil no equador */}
            <line x1="148" y1="58" x2="148" y2="100" stroke="#a78bfa" strokeWidth="0.8" strokeDasharray="3 2" opacity="0.4" />
            <circle cx="148" cy="100" r="3" fill="#6d28d9" opacity="0.5" />
          </g>

          {/* Label |ψ⟩ estático no canto */}
          <text x="160" y="46" fontSize="11" fill="#c4b5fd" fontFamily="monospace" opacity="0.8">|ψ⟩</text>
        </svg>

        <div className="text-center space-y-1">
          <p className="text-sm font-semibold text-text-primary">0, 1 e qualquer superposição</p>
          <p className="text-xs text-text-secondary">vetor de estado na Esfera de Bloch</p>
        </div>
      </div>

    </div>
  )
}
