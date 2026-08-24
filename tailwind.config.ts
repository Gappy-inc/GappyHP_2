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
        ivory: { 50: '#fafaf7', 100: '#f5f6f2', 200: '#f1f2ee', 300: '#e7e9e4' },
        navy: { 700: '#343834', 800: '#222522', 900: '#101210', 950: '#080a08' },
        gold: { 300: '#66ffa9', 400: '#33ff93', 500: '#00ff7d', 600: '#00d96b', 700: '#007f48' },
        ink: { 300: '#a9ada9', 400: '#777d78', 500: '#656b66', 700: '#343834', 900: '#101210' },
      },
      fontFamily: {
        'sans-jp': ['var(--font-noto-sans-jp)', 'sans-serif'],
        mono: ['var(--font-dm-mono)', 'monospace'],
      },
    },
  },
  plugins: [],
}

export default config
