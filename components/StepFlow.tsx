'use client'

import { motion } from 'framer-motion'

interface StepFlowProps {
  steps: string[]
  labels?: string[]
  className?: string
  variant?: 'horizontal' | 'vertical'
}

export function StepFlow({ steps, labels, className = '', variant = 'horizontal' }: StepFlowProps) {
  const isHorizontal = variant === 'horizontal'

  return (
    <div className={`my-6 ${className}`}>
      <div className={`flex ${isHorizontal ? 'flex-row items-start' : 'flex-col items-start'} gap-0`}>
        {steps.map((step, i) => (
          <div key={i} className={`flex ${isHorizontal ? 'flex-col items-center flex-1' : 'flex-row items-center w-full'}`}>
            <div className={`flex ${isHorizontal ? 'flex-col items-center' : 'flex-row items-center'}`}>
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, type: 'spring', stiffness: 300 }}
                className="w-9 h-9 rounded-xl flex items-center justify-center text-xs font-bold font-display text-white flex-shrink-0"
                style={{
                  background: i === steps.length - 1
                    ? 'linear-gradient(135deg, #FF6B35, #FF2D78)'
                    : 'linear-gradient(135deg, #00D4FF, #8b5cf6)',
                  boxShadow: i === steps.length - 1
                    ? '0 0 20px rgba(255,107,53,0.3)'
                    : '0 0 20px rgba(0,212,255,0.2)',
                }}
              >
                {i + 1}
              </motion.div>
              {labels && (
                <span className={`text-[10px] font-medium text-text-muted uppercase tracking-wider ${isHorizontal ? 'mt-2 text-center' : 'ml-3'}`}>
                  {labels[i]}
                </span>
              )}
            </div>
            <div className={`${isHorizontal ? 'mt-3 text-center px-2' : 'ml-4 flex-1'}`}>
              <p className="text-xs text-text-secondary leading-relaxed">{step}</p>
            </div>
            {i < steps.length - 1 && (
              <div className={`flex items-center justify-center ${isHorizontal ? 'w-8 mt-4' : 'ml-[18px] my-2 h-6'}`}>
                <motion.div
                  animate={{ opacity: [0.3, 0.7, 0.3], scaleY: [1, 1.2, 1] }}
                  transition={{ repeat: Infinity, duration: 2, delay: i * 0.3 }}
                >
                  <svg width={isHorizontal ? 24 : 10} height={isHorizontal ? 10 : 24} viewBox={isHorizontal ? "0 0 24 10" : "0 0 10 24"} fill="none" stroke="#2A2E42" strokeWidth="1.5">
                    {isHorizontal
                      ? <path d="M2 5h20M18 2l4 3-4 3" />
                      : <path d="M5 2v20M2 18l3 4 3-4" />
                    }
                  </svg>
                </motion.div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
