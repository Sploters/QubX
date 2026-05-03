'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

interface ButtonProps {
  href?: string
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  children: React.ReactNode
  className?: string
  onClick?: () => void
  type?: 'button' | 'submit'
}

const variants = {
  primary: 'btn-primary',
  secondary: 'btn-secondary',
  ghost: 'inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl font-medium text-text-secondary hover:text-text-primary hover:bg-elevated active:scale-95 transition-all duration-200',
}

const sizes = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-lg',
}

export function Button({ href, variant = 'primary', size = 'md', children, className = '', onClick, type = 'button' }: ButtonProps) {
  const cls = `${variants[variant]} ${sizes[size]} ${className}`

  if (href) {
    return (
      <Link href={href} className={cls}>
        {children}
      </Link>
    )
  }

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.97 }}
      type={type}
      onClick={onClick}
      className={cls}
    >
      {children}
    </motion.button>
  )
}
