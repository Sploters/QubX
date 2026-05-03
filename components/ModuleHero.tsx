'use client'

import { motion } from 'framer-motion'
import type { Module } from '@/lib/modules'

interface ModuleHeroProps {
  module: Module
}

export function ModuleHero({ module }: ModuleHeroProps) {
  return (
    <div className="mb-8">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex items-center gap-3 mb-2">
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
          <h1 className="text-2xl md:text-3xl font-display font-bold text-text-primary">
            {module.title}
          </h1>
        </div>
        <p className="text-sm text-text-secondary leading-relaxed max-w-xl">
          {module.description}
        </p>
      </motion.div>
    </div>
  )
}
