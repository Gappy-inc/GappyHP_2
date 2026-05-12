import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Luxury palette (from reference site)
        ivory: {
          50:  '#fdfcf8',
          100: '#faf8f1',
          200: '#f4f0e4',
          300: '#ede6d2',
        },
        navy: {
          700: '#1f2f5c',
          800: '#152448',
          900: '#0b1632',
          950: '#070e22',
        },
        gold: {
          300: '#e5cb87',
          400: '#d4b463',
          500: '#c9a961',
          600: '#b6924a',
          700: '#8e6e32',
        },
        ink: {
          300: '#a8a8ae',
          400: '#7e7e85',
          500: '#5a5a60',
          700: '#2a2a30',
          900: '#0e0e10',
        },
        // Legacy aliases
        'gappy-navy':   '#1A1A2E',
        'gappy-teal':   '#0A7E5C',
        'gappy-bg':     '#FAFAF8',
        'gappy-bg-alt': '#F5F4F0',
        'gappy-border': '#E5E3DC',
        'gappy-green':  '#0A7E5C',
        'gappy-dark':   '#1A1A2E',
      },
      fontFamily: {
        'serif-en': ['var(--font-cormorant)', 'serif'],
        'serif-jp': ['var(--font-noto-serif-jp)', 'serif'],
        'sans-jp':  ['var(--font-noto-sans-jp)', 'sans-serif'],
        mono:       ['var(--font-dm-mono)', 'monospace'],
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-down': {
          '0%': { opacity: '0', transform: 'translateY(-16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'fade-in': 'fade-in 0.7s ease-out forwards',
        'fade-up': 'fade-up 0.7s ease-out forwards',
        'fade-down': 'fade-down 0.7s ease-out forwards',
      },
      dropShadow: {
        'gold': '0 8px 24px rgba(201,169,97,0.25)',
        'navy': '0 24px 60px rgba(11,22,50,0.22)',
      },
    },
  },
  plugins: [],
}
export default config
