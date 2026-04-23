'use client'

import React from 'react'

export function SuperdenseCoding() {
  return (
    <div className="my-10 p-8 rounded-2xl bg-surface/30 border border-border overflow-hidden relative">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple/50 via-cyan/50 to-purple/50 opacity-20" />
      
      <svg viewBox="0 0 800 300" className="w-full h-auto">
        {/* Alice and Bob Labels */}
        <text x="100" y="40" fill="#f1f5f9" fontSize="16" fontWeight="bold" fontFamily="Inter, sans-serif">ALICE</text>
        <text x="700" y="40" fill="#f1f5f9" fontSize="16" fontWeight="bold" fontFamily="Inter, sans-serif" textAnchor="end">BOB</text>

        {/* Entanglement Source */}
        <g transform="translate(400, 240)">
          <circle r="30" fill="none" stroke="#8b5cf6" strokeWidth="2" strokeDasharray="4,2" className="animate-spin-slow" />
          <text y="5" textAnchor="middle" fill="#a78bfa" fontSize="10" fontWeight="bold">FONTE EPR</text>
          
          {/* Entangled lines */}
          <path d="M-30,0 L-300,-90" stroke="#8b5cf6" strokeWidth="1.5" strokeDasharray="5,5" opacity="0.4" />
          <path d="M30,0 L300,-90" stroke="#8b5cf6" strokeWidth="1.5" strokeDasharray="5,5" opacity="0.4" />
        </g>

        {/* Alice's Station */}
        <g transform="translate(100, 150)">
          <rect x="-40" y="-40" width="80" height="80" rx="12" fill="#1e1e30" stroke="#8b5cf6" strokeWidth="2" />
          <text y="5" textAnchor="middle" fill="#f1f5f9" fontSize="12" fontWeight="bold">Qubit A</text>
          
          {/* Input Bits */}
          <g transform="translate(0, -70)">
            <rect x="-25" y="-15" width="50" height="30" rx="6" fill="#06b6d4" opacity="0.2" stroke="#06b6d4" strokeWidth="1" />
            <text y="5" textAnchor="middle" fill="#06b6d4" fontSize="14" fontWeight="bold" fontFamily="monospace">01</text>
            <text y="-25" textAnchor="middle" fill="#94a3b8" fontSize="10">2 bits clássicos</text>
          </g>

          {/* Applied Operation */}
          <path d="M0,40 L0,70" stroke="#8b5cf6" strokeWidth="2" markerEnd="url(#arrowhead)" />
          <text x="10" y="65" fill="#a78bfa" fontSize="10">Aplica Porta (X, Z, iY ou I)</text>
        </g>

        {/* Quantum Channel */}
        <path d="M140,150 L660,150" stroke="url(#quantumGradient)" strokeWidth="3" strokeDasharray="10,5">
          <animate attributeName="stroke-dashoffset" from="100" to="0" dur="5s" repeatCount="indefinite" />
        </path>
        <text x="400" y="135" textAnchor="middle" fill="#a78bfa" fontSize="11" fontStyle="italic">Envia 1 Qubit pelo canal</text>

        {/* Bob's Station */}
        <g transform="translate(700, 150)">
          <rect x="-40" y="-40" width="80" height="80" rx="12" fill="#1e1e30" stroke="#06b6d4" strokeWidth="2" />
          <text y="5" textAnchor="middle" fill="#f1f5f9" fontSize="12" fontWeight="bold">Bell Measurement</text>
          
          {/* Output Bits */}
          <g transform="translate(0, -70)">
            <rect x="-25" y="-15" width="50" height="30" rx="6" fill="#06b6d4" stroke="#06b6d4" strokeWidth="2" />
            <text y="5" textAnchor="middle" fill="#f1f5f9" fontSize="14" fontWeight="bold" fontFamily="monospace">01</text>
            <text y="-25" textAnchor="middle" fill="#94a3b8" fontSize="10">Leitura final</text>
          </g>
        </g>

        {/* Definitions */}
        <defs>
          <linearGradient id="quantumGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#8b5cf6" />
            <stop offset="100%" stopColor="#06b6d4" />
          </linearGradient>
          <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="0" refY="3.5" orient="auto">
            <polygon points="0 0, 10 3.5, 0 7" fill="#8b5cf6" />
          </marker>
        </defs>
      </svg>
      
      <div className="mt-6 grid grid-cols-2 gap-4 text-[11px] text-text-secondary">
        <div className="p-3 rounded-lg bg-purple/5 border border-purple/10">
          <strong className="text-purple-light block mb-1">Passo Alice:</strong>
          Codifica 2 bits clássicos (00, 01, 10, 11) aplicando uma transformação local no seu qubit emaranhado.
        </div>
        <div className="p-3 rounded-lg bg-cyan/5 border border-cyan/10">
          <strong className="text-cyan-light block mb-1">Passo Bob:</strong>
          Ao receber o qubit de Alice, Bob realiza uma medição conjunta (Bell) para extrair ambos os bits.
        </div>
      </div>
    </div>
  )
}
