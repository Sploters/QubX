interface KeyInsightProps {
  icon?: string
  title?: string
  children: React.ReactNode
  variant?: 'info' | 'tip' | 'warning'
}

const variants = {
  info: { bg: 'from-accent-cyan/5 to-accent-cyan/0', border: 'border-accent-cyan/15', icon: '💡' },
  tip: { bg: 'from-accent-orange/5 to-accent-orange/0', border: 'border-accent-orange/15', icon: '✨' },
  warning: { bg: 'from-accent-pink/5 to-accent-pink/0', border: 'border-accent-pink/15', icon: '⚠️' },
}

export function KeyInsight({ icon, title, children, variant = 'info' }: KeyInsightProps) {
  const v = variants[variant]
  return (
    <div className={`my-6 p-4 rounded-xl bg-gradient-to-br ${v.bg} border ${v.border} flex items-start gap-3`}>
      <span className="text-lg flex-shrink-0 mt-0.5">{icon || v.icon}</span>
      <div>
        {title && <h4 className="text-sm font-display font-semibold text-text-primary mb-1">{title}</h4>}
        <div className="text-sm text-text-secondary leading-relaxed">{children}</div>
      </div>
    </div>
  )
}
