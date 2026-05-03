import type { Metadata } from 'next'
import './globals.css'
import { Header } from '@/components/Header'
import { BackgroundParticles } from '@/components/BackgroundParticles'

export const metadata: Metadata = {
  title: 'QubX — Computação Quântica',
  description: 'Portal educativo sobre Computação Quântica, do zero ao nível técnico. Aprenda com animações, interatividade e uma trilha progressiva.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className="min-h-screen bg-background">
        <BackgroundParticles />
        <Header />
        <main className="relative z-10 pt-16">
          {children}
        </main>
      </body>
    </html>
  )
}
