'use client'

import React from 'react'

export function BitVsQubit() {
  return (
    <div className="my-10 flex flex-col md:flex-row items-center justify-around gap-8 p-8 rounded-2xl bg-surface/30 border border-border overflow-hidden relative">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan/50 via-purple/50 to-cyan/50 opacity-20" />
      
      {/* Bit Clássico */}
      <div className="flex flex-col items-center gap-4 group">
        <div className="relative w-32 h-32 flex items-center justify-center">
          <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_0_15px_rgba(6,182,212,0.3)]">
            <circle 
              cx="50" cy="50" r="45" 
              fill="transparent" 
              stroke="currentColor" 
              strokeWidth="2" 
              className="text-cyan/20"
            />
            <circle 
              cx="50" cy="50" r="45" 
              fill="url(#bitGradient)" 
              stroke="currentColor" 
              strokeWidth="1.5" 
              className="text-cyan"
            />
            <defs>
              <radialGradient id="bitGradient" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                <stop offset="0%" stopColor="rgba(6,182,212,0.1)" />
                <stop offset="100%" stopColor="rgba(6,182,212,0.05)" />
              </radialGradient>
            </defs>
            <text 
              x="50" y="58" 
              textAnchor="middle" 
              fontSize="28" 
              fontWeight="bold" 
              fill="currentColor" 
              className="text-cyan font-mono animate-pulse"
            >
              0
            </text>
          </svg>
          <div className="absolute -bottom-2 px-3 py-1 bg-cyan/10 border border-cyan/30 rounded-full text-[10px] uppercase tracking-widest text-cyan font-bold">
            Binário
          </div>
        </div>
        <div className="text-center">
          <h4 className="text-text-primary font-bold">Bit Clássico</h4>
          <p className="text-xs text-text-secondary">Apenas 0 ou 1</p>
        </div>
      </div>

      {/* Divisor */}
      <div className="hidden md:block h-24 w-[1px] bg-gradient-to-b from-transparent via-border to-transparent" />

      {/* Qubit Quântico */}
      <div className="flex flex-col items-center gap-4 group">
        <div className="relative w-40 h-40 flex items-center justify-center">
          <svg viewBox="0 0 120 120" className="w-full h-full drop-shadow-[0_0_20px_rgba(139,92,246,0.4)]">
            {/* Esfera de Bloch */}
            <circle 
              cx="60" cy="60" r="50" 
              fill="url(#qubitGradient)" 
              stroke="currentColor" 
              strokeWidth="0.5" 
              className="text-purple/30"
            />
            
            {/* Elipses (Eixos) */}
            <ellipse 
              cx="60" cy="60" rx="50" ry="15" 
              fill="transparent" 
              stroke="currentColor" 
              strokeWidth="0.5" 
              strokeDasharray="2,2" 
              className="text-purple/40"
            />
            <ellipse 
              cx="60" cy="60" rx="15" ry="50" 
              fill="transparent" 
              stroke="currentColor" 
              strokeWidth="0.5" 
              strokeDasharray="2,2" 
              className="text-purple/40"
            />

            {/* Vetor de Estado */}
            <line 
              x1="60" y1="60" x2="95" y2="35" 
              stroke="currentColor" 
              strokeWidth="2.5" 
              className="text-purple-light"
            />
            <circle cx="95" cy="35" r="4" fill="currentColor" className="text-purple-light shadow-lg" />
            
            {/* Partículas de Brilho */}
            <circle cx="30" cy="40" r="1" fill="currentColor" className="text-purple animate-ping" />
            <circle cx="80" cy="85" r="1" fill="currentColor" className="text-purple animate-ping [animation-delay:1s]" />

            <defs>
              <radialGradient id="qubitGradient" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="rgba(139,92,246,0.2)" />
                <stop offset="70%" stopColor="rgba(139,92,246,0.05)" />
                <stop offset="100%" stopColor="transparent" />
              </radialGradient>
            </defs>

            <text x="60" y="10" textAnchor="middle" fontSize="10" fill="currentColor" className="text-purple/60 font-mono">|0⟩</text>
            <text x="60" y="118" textAnchor="middle" fontSize="10" fill="currentColor" className="text-purple/60 font-mono">|1⟩</text>
          </svg>
          <div className="absolute -bottom-2 px-3 py-1 bg-purple/10 border border-purple/30 rounded-full text-[10px] uppercase tracking-widest text-purple-light font-bold">
            Superposição
          </div>
        </div>
        <div className="text-center">
          <h4 className="text-text-primary font-bold">Qubit</h4>
          <p className="text-xs text-text-secondary">0, 1 e ambos ao mesmo tempo</p>
        </div>
      </div>
    </div>
  )
}
