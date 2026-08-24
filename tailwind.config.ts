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
      },
      fontFamily: {
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
    },
  },
  plugins: [],
}
export default config
