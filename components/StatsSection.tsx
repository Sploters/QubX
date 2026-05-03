'use client'

import { motion } from 'framer-motion'

const stats = [
  { value: '11', label: 'Módulos', suffix: '' },
  { value: '7', label: 'Interativos', suffix: ' +' },
  { value: '20+', label: 'Conceitos', suffix: '' },
  { value: '100%', label: 'Gratuito', suffix: '' },
]

export function StatsSection() {
  return (
    <section className="relative py-16 md:py-20">
      <div className="mx-auto max-w-5xl px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="card p-6 md:p-8 text-center"
            >
              <div className="text-3xl md:text-4xl font-display font-bold text-gradient mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-text-muted">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
