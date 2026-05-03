interface BadgeProps {
  children: React.ReactNode
  variant?: 'orange' | 'cyan' | 'pink' | 'yellow'
  className?: string
}

export function Badge({ children, variant = 'cyan', className = '' }: BadgeProps) {
  const cls = variant === 'orange' ? 'badge-orange' : variant === 'cyan' ? 'badge-cyan' : variant === 'pink' ? 'badge-pink' : 'badge-yellow'
  return (
    <span className={`${cls} ${className}`}>
      {children}
    </span>
  )
}
