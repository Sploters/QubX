'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

const features = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="14" cy="14" r="12" />
        <circle cx="14" cy="14" r="4" fill="currentColor" />
        <path d="M14 2v4M14 22v4M2 14h4M22 14h4" />
      </svg>
    ),
    title: 'Conceitos Visuais',
    description: 'Animações e simulações interativas que transformam abstrações quânticas em experiências visuais claras.',
    color: 'text-accent-orange',
    bg: 'bg-accent-orange/10',
    border: 'border-accent-orange/20',
    href: '/modulo/02-o-mundo-quantico',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="3" y="3" width="22" height="22" rx="3" />
        <path d="M9 9h10v10H9z" />
        <path d="M14 9v10M9 14h10" />
      </svg>
    ),
    title: 'Circuitos Interativos',
    description: 'Monte e experimente circuitos quânticos visualmente, vendo os resultados na esfera de Bloch em tempo real.',
    color: 'text-accent-cyan',
    bg: 'bg-accent-cyan/10',
    border: 'border-accent-cyan/20',
    href: '/modulo/05-portas-e-algoritmos-quanticos',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M4 20l6-6 4 4 10-10" />
        <path d="M20 8h4v4" />
      </svg>
    ),
    title: 'Trilha Progressiva',
    description: 'Do zero ao técnico: uma jornada estruturada que começa com os fundamentos e chega até Qiskit.',
    color: 'text-accent-pink',
    bg: 'bg-accent-pink/10',
    border: 'border-accent-pink/20',
    href: '/trilha',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M14 2L2 14l12 12 12-12L14 2z" />
        <path d="M10 10l8 8M18 10l-8 8" />
      </svg>
    ),
    title: 'Teatro Quântico',
    description: 'Cenas animadas que contam a história por trás dos conceitos — como se fosse um documentário interativo.',
    color: 'text-accent-yellow',
    bg: 'bg-accent-yellow/10',
    border: 'border-accent-yellow/20',
    href: '/modulo/03-qubits-alem-do-bit',
  },
]

export function FeatureCards() {
  return (
    <section className="relative py-16 md:py-20">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-0 w-64 h-64 bg-accent-cyan/5 rounded-full blur-[100px]" />
      </div>
      <div className="relative mx-auto max-w-5xl px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-display font-bold text-center text-text-primary mb-12"
        >
          O que você encontra no{' '}
          <span className="text-gradient">QubX</span>
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-4">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <Link
                href={feature.href}
                className="card-hover block p-6 no-underline group"
              >
                <div className={`w-12 h-12 rounded-xl ${feature.bg} ${feature.border} border flex items-center justify-center ${feature.color} mb-4`}>
                  {feature.icon}
                </div>
                <h3 className="text-lg font-display font-semibold text-text-primary mb-2 group-hover:text-gradient transition-all">
                  {feature.title}
                </h3>
                <p className="text-sm text-text-secondary leading-relaxed">
                  {feature.description}
                </p>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
