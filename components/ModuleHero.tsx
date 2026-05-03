'use client'

import { motion } from 'framer-motion'
import type { Module } from '@/lib/modules'

interface ModuleHeroProps {
  module: Module
}

function TimelineIllustration() {
  return (
    <svg viewBox="0 0 200 80" className="w-full h-full">
      <defs>
        <linearGradient id="tg1" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#FF6B35" />
          <stop offset="50%" stopColor="#FF2D78" />
          <stop offset="100%" stopColor="#00D4FF" />
        </linearGradient>
        <filter id="tglow"><feGaussianBlur stdDeviation="2" result="blur" /><feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
      </defs>
      <line x1="10" y1="40" x2="190" y2="40" stroke="#2A2E42" strokeWidth="2" strokeDasharray="4,4" />
      <motion.circle cx="30" cy="40" r="6" fill="#FF6B35" filter="url(#tglow)" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.1 }} />
      <motion.circle cx="70" cy="40" r="4" fill="#FF2D78" filter="url(#tglow)" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.3 }} />
      <motion.circle cx="110" cy="40" r="5" fill="#8b5cf6" filter="url(#tglow)" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.5 }} />
      <motion.circle cx="150" cy="40" r="7" fill="#00D4FF" filter="url(#tglow)" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.7 }} />
      <motion.circle cx="180" cy="40" r="3" fill="#FFD166" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.9 }}>
        <animate attributeName="opacity" values="1;0.3;1" dur="2s" repeatCount="indefinite" />
      </motion.circle>
      <text x="30" y="60" textAnchor="middle" fill="#6B6B80" fontSize="6">Clássico</text>
      <text x="180" y="60" textAnchor="middle" fill="#6B6B80" fontSize="6">Quântico</text>
    </svg>
  )
}

function GlobeIllustration() {
  return (
    <svg viewBox="0 0 200 80" className="w-full h-full">
      <defs>
        <radialGradient id="gg1"><stop offset="0%" stopColor="#00D4FF" stopOpacity="0.3" /><stop offset="100%" stopColor="#00D4FF" stopOpacity="0" /></radialGradient>
        <filter id="gglow"><feGaussianBlur stdDeviation="1.5" /></filter>
      </defs>
      <circle cx="100" cy="40" r="28" fill="none" stroke="#2A2E42" strokeWidth="1" />
      <ellipse cx="100" cy="40" rx="28" ry="8" fill="none" stroke="#2A2E42" strokeWidth="0.5" />
      <ellipse cx="100" cy="40" rx="8" ry="28" fill="none" stroke="#2A2E42" strokeWidth="0.5" />
      <motion.circle cx="78" cy="30" r="3" fill="#FF6B35" filter="url(#gglow)" animate={{ scale: [1, 1.4, 1] }} transition={{ repeat: Infinity, duration: 2 }} />
      <motion.circle cx="125" cy="35" r="2.5" fill="#FF2D78" filter="url(#gglow)" animate={{ scale: [1, 1.3, 1] }} transition={{ repeat: Infinity, duration: 2.5, delay: 0.5 }} />
      <motion.circle cx="90" cy="52" r="2" fill="#00D4FF" filter="url(#gglow)" animate={{ scale: [1, 1.5, 1] }} transition={{ repeat: Infinity, duration: 1.8, delay: 1 }} />
      <motion.circle cx="115" cy="48" r="3.5" fill="#FFD166" filter="url(#gglow)" animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 3, delay: 0.3 }} />
      <motion.circle cx="100" cy="28" r="2" fill="#8b5cf6" filter="url(#gglow)" animate={{ scale: [1, 1.4, 1] }} transition={{ repeat: Infinity, duration: 2.2, delay: 1.5 }} />
    </svg>
  )
}

function WaveIllustration() {
  return (
    <svg viewBox="0 0 200 80" className="w-full h-full">
      <defs>
        <linearGradient id="wg1" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stopColor="#00D4FF" stopOpacity="0.4" /><stop offset="100%" stopColor="#00D4FF" stopOpacity="0" /></linearGradient>
      </defs>
      {[0, 1, 2, 3].map((i) => (
        <motion.path
          key={i}
          d={`M10,${70 - i * 12} Q${30 + i * 15},${30 - i * 8} 50,${70 - i * 12} T90,${70 - i * 12} T130,${70 - i * 12} T190,${70 - i * 12}`}
          fill="none"
          stroke={i === 0 ? '#00D4FF' : i === 1 ? '#FF6B35' : i === 2 ? '#FF2D78' : '#8b5cf6'}
          strokeWidth={1.5 - i * 0.2}
          opacity={1 - i * 0.2}
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 - i * 0.2 }}
          transition={{ duration: 1.5, delay: i * 0.2 }}
        />
      ))}
      <motion.circle cx="100" cy="70" r="12" fill="url(#wg1)" opacity={0.3} animate={{ r: [12, 16, 12] }} transition={{ repeat: Infinity, duration: 3 }} />
    </svg>
  )
}

function QubitIllustration() {
  return (
    <svg viewBox="0 0 200 80" className="w-full h-full">
      <defs>
        <radialGradient id="qbg"><stop offset="0%" stopColor="#FF6B35" stopOpacity="0.3" /><stop offset="100%" stopColor="#FF2D78" stopOpacity="0" /></radialGradient>
        <filter id="qglow"><feGaussianBlur stdDeviation="3" /></filter>
      </defs>
      <motion.circle cx="100" cy="40" r="25" fill="url(#qbg)" />
      <motion.circle cx="100" cy="40" r="12" fill="none" stroke="#FF6B35" strokeWidth="1.5" filter="url(#qglow)" animate={{ rotate: 360 }} style={{ transformOrigin: '100px 40px' }} transition={{ repeat: Infinity, duration: 8, ease: 'linear' }} />
      <motion.circle cx="100" cy="40" r="18" fill="none" stroke="#FF2D78" strokeWidth="1" filter="url(#qglow)" animate={{ rotate: -360 }} style={{ transformOrigin: '100px 40px' }} transition={{ repeat: Infinity, duration: 12, ease: 'linear' }} />
      <motion.circle cx="100" cy="40" r="6" fill="#FFD166" filter="url(#qglow)" animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 2 }} />
      <text x="68" y="22" fill="#6B6B80" fontSize="6" fontFamily="monospace">|0⟩</text>
      <text x="128" y="62" fill="#6B6B80" fontSize="6" fontFamily="monospace">|1⟩</text>
    </svg>
  )
}

function BraketIllustration() {
  return (
    <svg viewBox="0 0 200 80" className="w-full h-full">
      <defs>
        <filter id="bglow"><feGaussianBlur stdDeviation="2" /></filter>
        <linearGradient id="bg1"><stop offset="0%" stopColor="#00D4FF" /><stop offset="100%" stopColor="#8b5cf6" /></linearGradient>
      </defs>
      <motion.text x="40" y="50" textAnchor="middle" fill="url(#bg1)" fontSize="28" fontFamily="monospace" fontWeight="bold" filter="url(#bglow)" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>⟨ψ|</motion.text>
      <motion.text x="130" y="50" textAnchor="middle" fill="url(#bg1)" fontSize="28" fontFamily="monospace" fontWeight="bold" filter="url(#bglow)" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>|ψ⟩</motion.text>
      <motion.text x="85" y="30" textAnchor="middle" fill="#FF6B35" fontSize="10" fontFamily="monospace" fontWeight="bold" initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.6, type: 'spring' }}>α|0⟩ + β|1⟩</motion.text>
      <motion.circle cx="85" cy="65" r="1.5" fill="#FF2D78" animate={{ r: [1.5, 3, 1.5] }} transition={{ repeat: Infinity, duration: 2 }} />
    </svg>
  )
}

function GatesIllustration() {
  return (
    <svg viewBox="0 0 200 80" className="w-full h-full">
      <defs>
        <filter id="gglow2"><feGaussianBlur stdDeviation="1.5" /></filter>
      </defs>
      {['H', 'X', 'Z', 'S'].map((gate, i) => (
        <motion.g key={gate} initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.15 }}>
          <rect x={18 + i * 46} y="22" width="36" height="36" rx="6" fill={['#FF6B35', '#00D4FF', '#FF2D78', '#FFD166'][i]} opacity={0.2} />
          <rect x={20 + i * 46} y="24" width="32" height="32" rx="5" fill="none" stroke={['#FF6B35', '#00D4FF', '#FF2D78', '#FFD166'][i]} strokeWidth="1.5" filter="url(#gglow2)" />
          <text x={36 + i * 46} y="46" textAnchor="middle" fill={['#FF6B35', '#00D4FF', '#FF2D78', '#FFD166'][i]} fontSize="14" fontFamily="monospace" fontWeight="bold">{gate}</text>
        </motion.g>
      ))}
      <motion.line x1="20" y1="65" x2="180" y2="65" stroke="#2A2E42" strokeWidth="1" strokeDasharray="2,3" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.8, duration: 0.5 }} />
    </svg>
  )
}

function HardwareIllustration() {
  return (
    <svg viewBox="0 0 200 80" className="w-full h-full">
      <defs>
        <linearGradient id="hg1" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stopColor="#00D4FF" stopOpacity="0.3" /><stop offset="100%" stopColor="#00D4FF" stopOpacity="0" /></linearGradient>
      </defs>
      <motion.rect x="55" y="18" width="90" height="50" rx="8" fill="none" stroke="#2A2E42" strokeWidth="1.5" initial={{ opacity: 0 }} animate={{ opacity: 1 }} />
      <motion.rect x="65" y="28" width="28" height="28" rx="4" fill="none" stroke="#00D4FF" strokeWidth="1" filter="url(#gglow2)" animate={{ stroke: ['#00D4FF', '#8b5cf6', '#00D4FF'] }} transition={{ repeat: Infinity, duration: 4 }} />
      <motion.rect x="107" y="28" width="28" height="28" rx="4" fill="none" stroke="#FF6B35" strokeWidth="1" filter="url(#gglow2)" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} />
      <motion.circle cx="79" cy="42" r="4" fill="#00D4FF" animate={{ scale: [1, 1.3, 1] }} transition={{ repeat: Infinity, duration: 2 }} />
      <motion.circle cx="121" cy="42" r="4" fill="#FF6B35" animate={{ scale: [1, 1.3, 1] }} transition={{ repeat: Infinity, duration: 2.5, delay: 0.5 }} />
      <motion.line x1="55" y1="75" x2="145" y2="75" stroke="#2A2E42" strokeWidth="0.5" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.5 }} />
      {[0, 1, 2, 3].map((i) => (
        <motion.line key={i} x1={65 + i * 28} y1="68" x2={65 + i * 28} y2="75" stroke="#2A2E42" strokeWidth="0.5" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.6 + i * 0.1 }} />
      ))}
    </svg>
  )
}

function RaceIllustration() {
  return (
    <svg viewBox="0 0 200 80" className="w-full h-full">
      <motion.path d="M10,60 Q50,20 100,55 Q150,80 190,45" fill="none" stroke="#2A2E42" strokeWidth="2" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1 }} />
      <motion.circle cx="190" cy="45" r="5" fill="#FF6B35" filter="url(#gglow)" animate={{ cx: [190, 10] }} transition={{ repeat: Infinity, duration: 4, ease: 'linear' }}>
        <animate attributeName="opacity" values="1;0.5;1" dur="0.5s" repeatCount="indefinite" />
      </motion.circle>
      <motion.circle cx="150" cy="55" r="3" fill="#00D4FF" animate={{ cx: [150, 10, 150] }} transition={{ repeat: Infinity, duration: 5, ease: 'linear', delay: 0.5 }} />
      <motion.circle cx="100" cy="37" r="3.5" fill="#FF2D78" animate={{ cx: [100, 10, 100] }} transition={{ repeat: Infinity, duration: 6, ease: 'linear', delay: 1 }} />
      <defs><radialGradient id="rgg"><stop offset="0%" stopColor="#FF6B35" stopOpacity="0.3" /><stop offset="100%" stopColor="#FF6B35" stopOpacity="0" /></radialGradient></defs>
      <circle cx="190" cy="45" r="10" fill="url(#rgg)" />
    </svg>
  )
}

function ShieldIllustration() {
  return (
    <svg viewBox="0 0 200 80" className="w-full h-full">
      <defs>
        <linearGradient id="sg1"><stop offset="0%" stopColor="#FF6B35" /><stop offset="100%" stopColor="#FF2D78" /></linearGradient>
        <filter id="sglow"><feGaussianBlur stdDeviation="3" /></filter>
      </defs>
      <motion.path d="M100,12 L155,25 L155,45 Q155,65 100,72 Q45,65 45,45 L45,25 Z" fill="none" stroke="url(#sg1)" strokeWidth="1.5" filter="url(#sglow)" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1 }} />
      <motion.path d="M80,42 L95,57 L120,32" fill="none" stroke="#00D4FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.5, duration: 0.5 }} />
      <motion.circle cx="100" cy="42" r="18" fill="none" stroke="#FFD166" strokeWidth="0.5" strokeDasharray="2,3" animate={{ rotate: 360 }} style={{ transformOrigin: '100px 42px' }} transition={{ repeat: Infinity, duration: 15, ease: 'linear' }} />
    </svg>
  )
}

function CodeIllustration() {
  return (
    <svg viewBox="0 0 200 80" className="w-full h-full">
      <rect x="15" y="15" width="170" height="55" rx="6" fill="#1A1D2E" stroke="#2A2E42" strokeWidth="1" />
      {[0, 1, 2, 3].map((i) => (
        <motion.line key={i} x1={28} y1={28 + i * 12} x2={170} y2={28 + i * 12} stroke="#2A2E42" strokeWidth="0.5" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: i * 0.2 }} />
      ))}
      <motion.text x="30" y="34" fill="#00D4FF" fontSize="6" fontFamily="monospace" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>from qiskit import QuantumCircuit</motion.text>
      <motion.text x="30" y="46" fill="#FFD166" fontSize="6" fontFamily="monospace" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>qc = QuantumCircuit(2, 2)</motion.text>
      <motion.text x="30" y="58" fill="#FF6B35" fontSize="6" fontFamily="monospace" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}>qc.h(0); qc.cx(0, 1)</motion.text>
      <motion.circle cx="178" cy="58" r="2" fill="#00D4FF" animate={{ opacity: [1, 0, 1] }} transition={{ repeat: Infinity, duration: 1 }} />
    </svg>
  )
}

function NetworkIllustration() {
  return (
    <svg viewBox="0 0 200 80" className="w-full h-full">
      {[
        [20, 40, 90, 30],
        [90, 30, 160, 35],
        [20, 40, 100, 55],
        [160, 35, 100, 55],
        [100, 55, 120, 65],
        [90, 30, 50, 55],
      ].map(([x1, y1, x2, y2], i) => (
        <motion.line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#2A2E42" strokeWidth="0.8" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: i * 0.1, duration: 0.5 }} />
      ))}
      {[
        [20, 40],
        [90, 30],
        [160, 35],
        [100, 55],
        [50, 55],
        [120, 65],
      ].map(([x, y], i) => (
        <motion.circle key={i} cx={x} cy={y} r={i === 0 || i === 3 ? 5 : 3} fill={['#00D4FF', '#FF6B35', '#FF2D78', '#FFD166', '#8b5cf6', '#00D4FF'][i]} filter="url(#gglow)" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.3 + i * 0.1, type: 'spring' }}>
          {i < 2 && <animate attributeName="opacity" values="1;0.4;1" dur={`${2 + i}s`} repeatCount="indefinite" />}
        </motion.circle>
      ))}
    </svg>
  )
}

const illustrations: Record<string, React.ReactNode> = {
  '00-a-genese-do-mundo-quantico': <TimelineIllustration />,
  '01-a-nova-era-da-computacao': <GlobeIllustration />,
  '02-o-mundo-quantico': <WaveIllustration />,
  '03-qubits-alem-do-bit': <QubitIllustration />,
  '04-a-linguagem-quantica': <BraketIllustration />,
  '05-portas-e-algoritmos-quanticos': <GatesIllustration />,
  '06-o-desafio-da-construcao': <HardwareIllustration />,
  '07-a-corrida-quantica': <RaceIllustration />,
  '08-a-ameaca-a-criptografia': <ShieldIllustration />,
  '09-programando-com-qiskit': <CodeIllustration />,
  '10-alem-do-computador-quantico': <NetworkIllustration />,
}

const moduleGradients: Record<string, string> = {
  '00-a-genese-do-mundo-quantico': 'from-accent-cyan/10 via-purple/10 to-transparent',
  '01-a-nova-era-da-computacao': 'from-accent-orange/10 via-accent-pink/5 to-transparent',
  '02-o-mundo-quantico': 'from-accent-cyan/10 via-accent-blue-500/5 to-transparent',
  '03-qubits-alem-do-bit': 'from-accent-orange/10 via-accent-pink/10 to-transparent',
  '04-a-linguagem-quantica': 'from-accent-cyan/10 via-accent-purple/10 to-transparent',
  '05-portas-e-algoritmos-quanticos': 'from-accent-orange/10 via-accent-yellow/5 to-transparent',
  '06-o-desafio-da-construcao': 'from-accent-cyan/10 via-accent-blue-500/5 to-transparent',
  '07-a-corrida-quantica': 'from-accent-orange/10 via-accent-pink/5 to-transparent',
  '08-a-ameaca-a-criptografia': 'from-accent-pink/10 via-accent-orange/5 to-transparent',
  '09-programando-com-qiskit': 'from-accent-cyan/10 via-accent-green-500/5 to-transparent',
  '10-alem-do-computador-quantico': 'from-accent-cyan/10 via-accent-pink/5 to-transparent',
}

const moduleIcons: Record<string, string> = {
  '00-a-genese-do-mundo-quantico': '⏳',
  '01-a-nova-era-da-computacao': '🌍',
  '02-o-mundo-quantico': '🌊',
  '03-qubits-alem-do-bit': '⚛️',
  '04-a-linguagem-quantica': '⟨ψ|',
  '05-portas-e-algoritmos-quanticos': '🔲',
  '06-o-desafio-da-construcao': '🔧',
  '07-a-corrida-quantica': '🏎️',
  '08-a-ameaca-a-criptografia': '🛡️',
  '09-programando-com-qiskit': '💻',
  '10-alem-do-computador-quantico': '🌐',
}

export function ModuleHero({ module }: ModuleHeroProps) {
  const illustration = illustrations[module.slug]
  const gradient = moduleGradients[module.slug] || 'from-accent-cyan/10 to-transparent'
  const icon = moduleIcons[module.slug] || '📘'

  return (
    <div className={`relative overflow-hidden rounded-2xl mb-8 bg-gradient-to-br ${gradient} border border-white/5`}>
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-bl from-white/5 to-transparent rounded-full blur-3xl" />
      </div>

      <div className="relative p-6 md:p-8 flex flex-col md:flex-row items-center gap-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, type: 'spring' }}
          className="flex-shrink-0 w-full md:w-48 h-20 md:h-24"
        >
          {illustration || (
            <div className="w-full h-full flex items-center justify-center">
              <span className="text-4xl">{icon}</span>
            </div>
          )}
        </motion.div>

        <div className="flex-1 min-w-0">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex items-center gap-3 mb-2"
          >
            <span
              className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold font-display text-white flex-shrink-0"
              style={{
                background: module.order === 0
                  ? 'linear-gradient(135deg, #00D4FF, #8b5cf6)'
                  : 'linear-gradient(135deg, #FF6B35, #FF2D78)',
              }}
            >
              {String(module.order).padStart(2, '0')}
            </span>
            <span className="text-xs text-text-muted font-medium uppercase tracking-wider">Módulo {module.order}</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-2xl md:text-3xl font-display font-bold text-text-primary"
          >
            {module.title}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-sm text-text-secondary mt-1 leading-relaxed max-w-xl"
          >
            {module.description}
          </motion.p>
        </div>
      </div>
    </div>
  )
}
