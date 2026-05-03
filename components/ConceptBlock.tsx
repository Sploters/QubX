'use client'

import { motion } from 'framer-motion'

type ConceptVisual = 'superposition' | 'entanglement' | 'collapse' | 'interference' | 'qubit' | 'measurement' | 'gate' | 'wave'

interface ConceptBlockProps {
  visual: ConceptVisual
  title: string
  children: React.ReactNode
  className?: string
}

function SuperpositionVis() {
  return (
    <svg viewBox="0 0 120 60" className="w-full h-16">
      <defs>
        <radialGradient id="sp-glow"><stop offset="0%" stopColor="#00D4FF" stopOpacity="0.3" /><stop offset="100%" stopColor="#00D4FF" stopOpacity="0" /></radialGradient>
      </defs>
      <motion.circle cx="30" cy="30" r="10" fill="url(#sp-glow)" />
      <motion.circle cx="30" cy="30" r="4" fill="#00D4FF"
        animate={{ cx: [30, 90, 30] }}
        transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut' }} />
      <motion.circle cx="90" cy="30" r="10" fill="url(#sp-glow)" />
      <motion.circle cx="90" cy="30" r="4" fill="#FF2D78"
        animate={{ cx: [90, 30, 90] }}
        transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut' }} />
      <text x="24" y="52" fill="#6B6B80" fontSize="7" fontFamily="monospace" textAnchor="middle">|0⟩</text>
      <text x="96" y="52" fill="#6B6B80" fontSize="7" fontFamily="monospace" textAnchor="middle">|1⟩</text>
    </svg>
  )
}

function EntanglementVis() {
  return (
    <svg viewBox="0 0 120 60" className="w-full h-16">
      <defs>
        <linearGradient id="en-line" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#FF6B35" /><stop offset="100%" stopColor="#FF2D78" />
        </linearGradient>
      </defs>
      <motion.line x1="20" y1="30" x2="100" y2="30" stroke="url(#en-line)" strokeWidth="1.5" strokeDasharray="3,4"
        animate={{ strokeDashoffset: [0, -14] }}
        transition={{ repeat: Infinity, duration: 1, ease: 'linear' }} />
      <motion.circle cx="20" cy="30" r="6" fill="#FF6B35"
        animate={{ scale: [1, 1.15, 1] }}
        transition={{ repeat: Infinity, duration: 1.5, delay: 0 }} />
      <motion.circle cx="100" cy="30" r="6" fill="#FF2D78"
        animate={{ scale: [1, 1.15, 1] }}
        transition={{ repeat: Infinity, duration: 1.5, delay: 0.3 }} />
      <text x="20" y="50" fill="#6B6B80" fontSize="7" fontFamily="monospace" textAnchor="middle">A</text>
      <text x="100" y="50" fill="#6B6B80" fontSize="7" fontFamily="monospace" textAnchor="middle">B</text>
    </svg>
  )
}

function CollapseVis() {
  return (
    <svg viewBox="0 0 120 60" className="w-full h-16">
      <defs>
        <radialGradient id="co-glow"><stop offset="0%" stopColor="#FFD166" stopOpacity="0.3" /><stop offset="100%" stopColor="#FFD166" stopOpacity="0" /></radialGradient>
      </defs>
      {[0, 1, 2].map(i => (
        <motion.circle key={i} cx={30 + i * 30} cy="30" r="3" fill="#00D4FF" opacity="0.3"
          animate={{ opacity: [0.3, 0, 0.3], scale: [1, 0, 1] }}
          transition={{ repeat: Infinity, duration: 2, delay: i * 0.3 }} />
      ))}
      <motion.circle cx="60" cy="30" r="8" fill="url(#co-glow)" />
      <motion.circle cx="60" cy="30" r="4" fill="#FFD166"
        animate={{ scale: [0, 1.2, 1, 1] }}
        transition={{ repeat: Infinity, duration: 2.5, delay: 0.8 }} />
      <line x1="52" y1="48" x2="68" y2="48" stroke="#6B6B80" strokeWidth="0.5" />
      <text x="60" y="54" fill="#6B6B80" fontSize="6" fontFamily="monospace" textAnchor="middle">colapso</text>
    </svg>
  )
}

function InterferenceVis() {
  return (
    <svg viewBox="0 0 120 60" className="w-full h-16">
      <motion.path d="M10,30 Q30,10 50,30 T90,30 T110,30"
        fill="none" stroke="#00D4FF" strokeWidth="1" opacity="0.5"
        animate={{ d: ['M10,30 Q30,10 50,30 T90,30 T110,30', 'M10,30 Q30,50 50,30 T90,30 T110,30'] }}
        transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }} />
      <motion.path d="M10,30 Q30,50 50,30 T90,30 T110,30"
        fill="none" stroke="#FF2D78" strokeWidth="1" opacity="0.5"
        animate={{ d: ['M10,30 Q30,50 50,30 T90,30 T110,30', 'M10,30 Q30,10 50,30 T90,30 T110,30'] }}
        transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }} />
      <motion.circle cx="60" cy="30" r="2" fill="#FFD166"
        animate={{ scale: [1, 2, 1], opacity: [0.8, 0.3, 0.8] }}
        transition={{ repeat: Infinity, duration: 2 }} />
    </svg>
  )
}

function QubitVis() {
  return (
    <svg viewBox="0 0 120 60" className="w-full h-16">
      <motion.circle cx="60" cy="30" r="14" fill="none" stroke="#FF6B35" strokeWidth="0.8"
        animate={{ rotate: 360 }}
        style={{ transformOrigin: '60px 30px' }}
        transition={{ repeat: Infinity, duration: 6, ease: 'linear' }} />
      <motion.circle cx="60" cy="30" r="8" fill="none" stroke="#00D4FF" strokeWidth="0.6"
        animate={{ rotate: -360 }}
        style={{ transformOrigin: '60px 30px' }}
        transition={{ repeat: Infinity, duration: 4, ease: 'linear' }} />
      <motion.circle cx="60" cy="30" r="3" fill="#FFD166"
        animate={{ scale: [1, 1.3, 1] }}
        transition={{ repeat: Infinity, duration: 1.5 }} />
      <text x="48" y="52" fill="#6B6B80" fontSize="6" fontFamily="monospace">|0⟩</text>
      <text x="72" y="52" fill="#6B6B80" fontSize="6" fontFamily="monospace">|1⟩</text>
    </svg>
  )
}

function MeasurementVis() {
  return (
    <svg viewBox="0 0 120 60" className="w-full h-16">
      <motion.circle cx="30" cy="30" r="8" fill="none" stroke="#8b5cf6" strokeWidth="0.8"
        animate={{ opacity: [1, 0.3, 1] }}
        transition={{ repeat: Infinity, duration: 3 }} />
      <motion.circle cx="90" cy="30" r="6" fill="#FF6B35"
        animate={{ scale: [1, 1, 0, 0, 1] }}
        transition={{ repeat: Infinity, duration: 3 }} />
      <motion.line x1="45" y1="30" x2="78" y2="30" stroke="#FFD166" strokeWidth="1"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: [0, 1, 0, 0] }}
        transition={{ repeat: Infinity, duration: 3 }} />
      <text x="30" y="50" fill="#6B6B80" fontSize="6" fontFamily="monospace" textAnchor="middle">|ψ⟩</text>
      <text x="90" y="50" fill="#6B6B80" fontSize="6" fontFamily="monospace" textAnchor="middle">resultado</text>
    </svg>
  )
}

function GateVis() {
  return (
    <svg viewBox="0 0 120 60" className="w-full h-16">
      <motion.rect x="42" y="16" width="36" height="28" rx="4" fill="none" stroke="#00D4FF" strokeWidth="1"
        animate={{ stroke: ['#00D4FF', '#FF6B35', '#FF2D78', '#00D4FF'] }}
        transition={{ repeat: Infinity, duration: 4 }} />
      <text x="60" y="34" fill="#F0F0F0" fontSize="12" fontFamily="monospace" fontWeight="bold" textAnchor="middle">H</text>
      <motion.line x1="10" y1="30" x2="42" y2="30" stroke="#2A2E42" strokeWidth="1" />
      <motion.line x1="78" y1="30" x2="110" y2="30" stroke="#2A2E42" strokeWidth="1" />
      <motion.circle cx="10" cy="30" r="3" fill="#00D4FF"
        animate={{ cx: [10, 110] }}
        transition={{ repeat: Infinity, duration: 3 }} />
    </svg>
  )
}

function WaveVis() {
  return (
    <svg viewBox="0 0 120 60" className="w-full h-16">
      {[0, 1, 2].map(i => (
        <motion.path key={i}
          d={`M10,${30 + i * 8} Q${30 + i * 10},${10 + i * 4} ${60 + i * 5},${30 + i * 8} T${110},${30 + i * 8}`}
          fill="none"
          stroke={i === 0 ? '#00D4FF' : i === 1 ? '#FF6B35' : '#FF2D78'}
          strokeWidth={0.8 - i * 0.2}
          opacity={0.5 - i * 0.12}
          initial={{ pathLength: 0 }}
          animate={{ pathLength: [0, 1, 0] }}
          transition={{ repeat: Infinity, duration: 3, delay: i * 0.4 }} />
      ))}
    </svg>
  )
}

const visualMap: Record<ConceptVisual, React.ReactNode> = {
  superposition: <SuperpositionVis />,
  entanglement: <EntanglementVis />,
  collapse: <CollapseVis />,
  interference: <InterferenceVis />,
  qubit: <QubitVis />,
  measurement: <MeasurementVis />,
  gate: <GateVis />,
  wave: <WaveVis />,
}

const accentColors: Record<ConceptVisual, string> = {
  superposition: 'from-accent-cyan/10 via-accent-cyan/5',
  entanglement: 'from-accent-orange/10 via-accent-pink/5',
  collapse: 'from-accent-yellow/10 via-accent-pink/5',
  interference: 'from-accent-cyan/10 via-accent-pink/5',
  qubit: 'from-accent-orange/10 via-accent-pink/5',
  measurement: 'from-purple/10 via-accent-pink/5',
  gate: 'from-accent-cyan/10 via-accent-purple/5',
  wave: 'from-accent-cyan/10 via-accent-blue/5',
}

const borderColors: Record<ConceptVisual, string> = {
  superposition: 'border-accent-cyan/20',
  entanglement: 'border-accent-orange/20',
  collapse: 'border-accent-yellow/20',
  interference: 'border-accent-cyan/20',
  qubit: 'border-accent-orange/20',
  measurement: 'border-purple/20',
  gate: 'border-accent-cyan/20',
  wave: 'border-accent-cyan/20',
}

export function ConceptBlock({ visual, title, children, className = '' }: ConceptBlockProps) {
  const bg = accentColors[visual]
  const border = borderColors[visual]

  return (
    <div className={`my-8 p-5 rounded-2xl bg-gradient-to-br ${bg} border ${border} ${className}`}>
      <div className="flex flex-col md:flex-row items-start gap-5">
        <div className="flex-shrink-0 w-full md:w-28 h-16 md:h-16 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="w-full"
          >
            {visualMap[visual]}
          </motion.div>
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-display font-semibold text-text-primary mb-1.5">
            {title}
          </h4>
          <div className="text-sm text-text-secondary leading-relaxed">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}
