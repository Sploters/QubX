'use client'

import { motion } from 'framer-motion'

interface SectionProps {
  children: React.ReactNode
  className?: string
  id?: string
  glow?: boolean
}

export function Section({ children, className = '', id, glow = true }: SectionProps) {
  return (
    <section id={id} className={`relative py-16 md:py-24 ${glow ? 'section-gradient' : ''} ${className}`}>
      {children}
    </section>
  )
}

export function SectionHeader({ title, subtitle, tag }: { title: string; subtitle?: string; tag?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5 }}
      className="text-center mb-12 md:mb-16"
    >
      {tag && (
        <span className="badge-cyan mb-4 inline-block">{tag}</span>
      )}
      <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">{title}</h2>
      {subtitle && (
        <p className="text-lg text-text-secondary max-w-2xl mx-auto">{subtitle}</p>
      )}
    </motion.div>
  )
}
