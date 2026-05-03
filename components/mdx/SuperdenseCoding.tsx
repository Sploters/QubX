'use client'

export function SuperdenseCoding() {
  const glowFilter = 'url(#sd-glow)'

  return (
    <div className="my-10 p-6 md:p-8 rounded-2xl bg-gradient-to-br from-surface/60 to-background border border-white/5 overflow-hidden relative">
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-accent-orange/30 to-transparent" />

      <svg viewBox="0 0 800 300" className="w-full h-auto">
        <defs>
          <linearGradient id="quantumGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#FF6B35" />
            <stop offset="50%" stopColor="#FF2D78" />
            <stop offset="100%" stopColor="#00D4FF" />
          </linearGradient>
          <linearGradient id="aliceGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FF6B35" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#FF2D78" stopOpacity="0.05" />
          </linearGradient>
          <linearGradient id="bobGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00D4FF" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.05" />
          </linearGradient>
          <filter id="sd-glow">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>

        <text x="100" y="40" fill="#F0F0F0" fontSize="16" fontWeight="bold" fontFamily="Space Grotesk, sans-serif">ALICE</text>
        <text x="700" y="40" fill="#F0F0F0" fontSize="16" fontWeight="bold" fontFamily="Space Grotesk, sans-serif" textAnchor="end">BOB</text>

        <g transform="translate(400, 240)">
          <circle r="30" fill="none" stroke="#8b5cf6" strokeWidth="1.5" strokeDasharray="4,3" className="animate-spin-slow" />
          <circle r="30" fill="#8b5cf6" opacity="0.05" />
          <text y="4" textAnchor="middle" fill="#a78bfa" fontSize="9" fontWeight="bold" fontFamily="monospace">FONTE EPR</text>
          <path d="M-30,0 L-300,-90" stroke="#8b5cf6" strokeWidth="1.2" strokeDasharray="5,5" opacity="0.3" />
          <path d="M30,0 L300,-90" stroke="#8b5cf6" strokeWidth="1.2" strokeDasharray="5,5" opacity="0.3" />
        </g>

        <g transform="translate(100, 150)">
          <rect x="-45" y="-45" width="90" height="90" rx="14" fill="url(#aliceGrad)" stroke="#FF6B35" strokeWidth="1.5" filter={glowFilter} />
          <text y="5" textAnchor="middle" fill="#F0F0F0" fontSize="11" fontWeight="bold" fontFamily="Space Grotesk">Qubit A</text>

          <g transform="translate(0, -75)">
            <rect x="-30" y="-16" width="60" height="32" rx="8" fill="#FF6B35" opacity="0.15" stroke="#FF6B35" strokeWidth="1" />
            <text y="5" textAnchor="middle" fill="#FF6B35" fontSize="14" fontWeight="bold" fontFamily="monospace">01</text>
            <text y="-26" textAnchor="middle" fill="#6B6B80" fontSize="9">2 bits clássicos</text>
          </g>

          <path d="M0,45 L0,70" stroke="#FF6B35" strokeWidth="1.5" markerEnd="url(#arrowAlice)" />
          <text x="12" y="65" fill="#FF6B35" fontSize="9">Aplica Porta (X, Z, iY ou I)</text>
        </g>

        <path d="M150,150 L650,150" stroke="url(#quantumGradient)" strokeWidth="2.5" strokeDasharray="10,6" filter={glowFilter}>
          <animate attributeName="stroke-dashoffset" from="100" to="0" dur="4s" repeatCount="indefinite" />
        </path>
        <text x="400" y="135" textAnchor="middle" fill="#a78bfa" fontSize="10" fontFamily="monospace">Envia 1 qubit pelo canal quântico</text>

        <g transform="translate(700, 150)">
          <rect x="-45" y="-45" width="90" height="90" rx="14" fill="url(#bobGrad)" stroke="#00D4FF" strokeWidth="1.5" filter={glowFilter} />
          <text y="5" textAnchor="middle" fill="#F0F0F0" fontSize="11" fontWeight="bold" fontFamily="Space Grotesk">Bell Meas.</text>

          <g transform="translate(0, -75)">
            <rect x="-30" y="-16" width="60" height="32" rx="8" fill="#00D4FF" opacity="0.15" stroke="#00D4FF" strokeWidth="1" />
            <text y="5" textAnchor="middle" fill="#00D4FF" fontSize="14" fontWeight="bold" fontFamily="monospace">01</text>
            <text y="-26" textAnchor="middle" fill="#6B6B80" fontSize="9">Leitura final</text>
          </g>
        </g>

        <marker id="arrowAlice" markerWidth="10" markerHeight="7" refX="0" refY="3.5" orient="auto">
          <polygon points="0 0, 10 3.5, 0 7" fill="#FF6B35" />
        </marker>
      </svg>

      <div className="mt-6 grid grid-cols-2 gap-3 text-[11px]">
        <div className="p-3 rounded-xl bg-accent-orange/5 border border-accent-orange/10">
          <strong className="text-accent-orange block mb-1 font-display">Passo Alice:</strong>
          <span className="text-text-secondary">Codifica 2 bits clássicos (00, 01, 10, 11) aplicando uma transformação local no seu qubit emaranhado.</span>
        </div>
        <div className="p-3 rounded-xl bg-accent-cyan/5 border border-accent-cyan/10">
          <strong className="text-accent-cyan block mb-1 font-display">Passo Bob:</strong>
          <span className="text-text-secondary">Ao receber o qubit de Alice, Bob realiza uma medição conjunta (Bell) para extrair ambos os bits.</span>
        </div>
      </div>
    </div>
  )
}
