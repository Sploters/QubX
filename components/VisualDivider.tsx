'use client'

import { motion } from 'framer-motion'

interface VisualDividerProps {
  variant?: 'dots' | 'line' | 'wave'
}

function DotsDivider() {
  return (
    <div className="flex items-center justify-center gap-2 py-4">
      {[0, 1, 2, 3, 4].map((i) => (
        <motion.div
          key={i}
          className="w-1.5 h-1.5 rounded-full"
          style={{
            background: i % 2 === 0
              ? 'linear-gradient(135deg, #FF6B35, #FF2D78)'
              : 'linear-gradient(135deg, #00D4FF, #8b5cf6)',
          }}
          animate={{ scale: [1, 1.6, 1], opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 2, repeat: Infinity, delay: i * 0.3, ease: 'easeInOut' }}
        />
      ))}
    </div>
  )
}

function LineDivider() {
  return (
    <div className="relative py-5">
      <div className="absolute left-0 right-0 top-1/2 h-px bg-gradient-to-r from-transparent via-accent-orange/20 to-transparent" />
      <div className="relative flex justify-center">
        <motion.div
          className="w-2 h-2 rounded-full bg-accent-orange/40"
          animate={{ scale: [1, 1.4, 1], opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>
    </div>
  )
}

function WaveDivider() {
  return (
    <svg viewBox="0 0 200 20" className="w-full max-w-[200px] mx-auto my-4" aria-hidden="true">
      <motion.path
        d="M0,10 Q25,0 50,10 T100,10 T150,10 T200,10"
        fill="none"
        stroke="#FF6B35"
        strokeWidth="0.8"
        opacity="0.3"
        animate={{ d: [
          'M0,10 Q25,0 50,10 T100,10 T150,10 T200,10',
          'M0,10 Q25,20 50,10 T100,10 T150,10 T200,10',
          'M0,10 Q25,0 50,10 T100,10 T150,10 T200,10',
        ]}}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.path
        d="M0,12 Q25,2 50,12 T100,12 T150,12 T200,12"
        fill="none"
        stroke="#00D4FF"
        strokeWidth="0.5"
        opacity="0.15"
        animate={{ d: [
          'M0,12 Q25,2 50,12 T100,12 T150,12 T200,12',
          'M0,12 Q25,22 50,12 T100,12 T150,12 T200,12',
          'M0,12 Q25,2 50,12 T100,12 T150,12 T200,12',
        ]}}
        transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
      />
    </svg>
  )
}

export function VisualDivider({ variant = 'dots' }: VisualDividerProps) {
  if (variant === 'line') return <LineDivider />
  if (variant === 'wave') return <WaveDivider />
  return <DotsDivider />
}
