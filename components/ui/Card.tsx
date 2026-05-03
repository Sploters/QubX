'use client'

import { motion } from 'framer-motion'

interface CardProps {
  children: React.ReactNode
  className?: string
  hover?: boolean
  glow?: 'orange' | 'cyan' | 'pink' | 'none'
  delay?: number
}

export function Card({ children, className = '', hover = false, glow = 'none', delay = 0 }: CardProps) {
  const glowClass = glow === 'orange' ? 'glow-orange' : glow === 'cyan' ? 'glow-cyan' : ''

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay }}
      className={`${hover ? 'card-hover' : 'card'} ${glowClass} ${className}`}
    >
      {children}
    </motion.div>
  )
}
