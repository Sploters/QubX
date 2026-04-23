'use client'

import React from 'react'

export function MazeQuantum() {
  return (
    <div className="my-8 grid grid-cols-1 md:grid-cols-2 gap-6 p-6 rounded-2xl bg-background border border-border">
      {/* Classic Side */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-text-secondary" />
          <h5 className="text-xs font-bold uppercase tracking-widest text-text-secondary">Abordagem Clássica</h5>
        </div>
        
        <div className="relative aspect-video rounded-xl bg-surface/50 border border-border p-4 overflow-hidden">
          <svg viewBox="0 0 200 120" className="w-full h-full">
            {/* Simple Maze Walls */}
            <g stroke="#1e1e30" strokeWidth="2" fill="none">
              <rect x="10" y="10" width="180" height="100" rx="4" />
              <path d="M40 10 v40 h40 M120 110 v-40 h-40 M80 60 h40" />
            </g>
            
            {/* Classic "Cursor" trying paths */}
            <circle cx="25" cy="95" r="3" fill="#f1f5f9">
              <animate attributeName="cx" values="25;25;60;60;25;25;140;140;175" keyTimes="0;0.1;0.3;0.4;0.6;0.7;0.8;0.9;1" dur="4s" repeatCount="indefinite" />
              <animate attributeName="cy" values="95;30;30;95;95;30;30;95;95" keyTimes="0;0.1;0.3;0.4;0.6;0.7;0.8;0.9;1" dur="4s" repeatCount="indefinite" />
            </circle>
            
            <path d="M25 95 V30 H60 V95" stroke="#475569" strokeWidth="1" strokeDasharray="2,2" opacity="0.5" />
          </svg>
          <div className="absolute bottom-2 left-4 text-[10px] text-text-muted font-mono italic">Sequencial: Um caminho por vez</div>
        </div>
        <p className="text-xs text-text-secondary leading-relaxed">
          O computador clássico testa cada ramificação individualmente. Se encontrar um beco sem saída, ele precisa retornar e recomeçar.
        </p>
      </div>

      {/* Quantum Side */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-purple animate-pulse" />
          <h5 className="text-xs font-bold uppercase tracking-widest text-purple-light">Abordagem Quântica</h5>
        </div>
        
        <div className="relative aspect-video rounded-xl bg-surface/50 border border-purple/20 p-4 overflow-hidden">
          <svg viewBox="0 0 200 120" className="w-full h-full">
            {/* Simple Maze Walls */}
            <g stroke="#1e1e30" strokeWidth="2" fill="none">
              <rect x="10" y="10" width="180" height="100" rx="4" />
              <path d="M40 10 v40 h40 M120 110 v-40 h-40 M80 60 h40" />
            </g>
            
            {/* Quantum "Fog" spreading */}
            <rect x="15" y="15" width="170" height="90" fill="url(#quantumFog)" rx="2">
              <animate attributeName="opacity" values="0.2;0.6;0.2" dur="3s" repeatCount="indefinite" />
            </rect>

            <defs>
              <radialGradient id="quantumFog" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.2" />
              </radialGradient>
            </defs>

            {/* Path highlights */}
            <path d="M25 95 V30 H140 V95 H175" stroke="#a78bfa" strokeWidth="2" fill="none" opacity="0.8" />
            <circle cx="175" cy="95" r="4" fill="#a78bfa" className="animate-ping" />
          </svg>
          <div className="absolute bottom-2 left-4 text-[10px] text-purple-light/70 font-mono italic">Paralelo: Todos os caminhos agora</div>
        </div>
        <p className="text-xs text-text-secondary leading-relaxed">
          Graças à superposição, o sistema explora todas as rotas simultaneamente. A interferência destrutiva cancela erros e a construtiva reforça a resposta correta.
        </p>
      </div>
    </div>
  )
}
