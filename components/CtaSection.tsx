'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

export function CtaSection() {
  return (
    <section className="relative py-20 md:py-28">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent-orange/5 rounded-full blur-[150px]" />
      </div>
      <div className="relative mx-auto max-w-3xl px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-5xl font-display font-bold text-text-primary mb-6 leading-tight">
            Pronto para{' '}
            <span className="text-gradient">mergulhar</span> no
            mundo quântico?
          </h2>
          <p className="text-lg text-text-secondary mb-8 max-w-lg mx-auto">
            Sua jornada do zero ao algoritmo quântico começa agora.
            Não precisa de pré-requisitos — só curiosidade.
          </p>
          <Link href="/trilha" className="btn-primary text-lg px-10 py-4 no-underline">
            <svg width="22" height="22" viewBox="0 0 20 20" fill="currentColor">
              <path d="M3 3l14 7-14 7V3z" />
            </svg>
            Iniciar Jornada
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
