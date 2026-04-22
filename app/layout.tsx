import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'QubX — Computação Quântica',
  description: 'Portal educativo sobre Computação Quântica, do básico ao técnico.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className="min-h-screen bg-background">
        {children}
      </body>
    </html>
  )
}
