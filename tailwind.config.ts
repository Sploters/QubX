import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{ts,tsx,mdx}',
    './components/**/*.{ts,tsx}',
    './content/**/*.mdx',
  ],
  theme: {
    extend: {
      colors: {
        background: '#0B0D17',
        surface: '#1A1D2E',
        elevated: '#242840',
        border: '#2A2E42',
        accent: {
          orange: '#FF6B35',
          pink: '#FF2D78',
          cyan: '#00D4FF',
          yellow: '#FFD166',
        },
        text: {
          primary: '#F0F0F0',
          secondary: '#A0A0B0',
          muted: '#6B6B80',
        },
        purple: {
          DEFAULT: '#8b5cf6',
          light: '#a78bfa',
          dark: '#6d28d9',
        },
        cyan: {
          DEFAULT: '#06b6d4',
          light: '#22d3ee',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Space Grotesk', 'Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
        'particle-drift': 'particleDrift 20s linear infinite',
        'bounce-in': 'bounceIn 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards',
        'slide-up': 'slideUp 0.5s ease-out forwards',
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'spin-slow': 'spin 8s linear infinite',
        'wave': 'wave 2s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.4', filter: 'blur(60px)' },
          '50%': { opacity: '0.8', filter: 'blur(80px)' },
        },
        particleDrift: {
          '0%': { transform: 'translateY(0) translateX(0)' },
          '25%': { transform: 'translateY(-100px) translateX(50px)' },
          '50%': { transform: 'translateY(-200px) translateX(-30px)' },
          '75%': { transform: 'translateY(-100px) translateX(-80px)' },
          '100%': { transform: 'translateY(0) translateX(0)' },
        },
        bounceIn: {
          '0%': { opacity: '0', transform: 'scale(0.3)' },
          '50%': { transform: 'scale(1.05)' },
          '70%': { transform: 'scale(0.9)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        wave: {
          '0%, 100%': { transform: 'rotate(0deg)' },
          '25%': { transform: 'rotate(-5deg)' },
          '75%': { transform: 'rotate(5deg)' },
        },
      },
      backgroundImage: {
        'gradient-accent': 'linear-gradient(135deg, #FF6B35, #FF2D78)',
        'gradient-cyan': 'linear-gradient(135deg, #00D4FF, #8b5cf6)',
        'gradient-glow': 'radial-gradient(ellipse at center, rgba(255,107,53,0.15), transparent 70%)',
        'gradient-glow-cyan': 'radial-gradient(ellipse at center, rgba(0,212,255,0.1), transparent 70%)',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
export default config
