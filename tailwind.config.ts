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
        ivory: { 50: '#fbfbf7', 100: '#f7f7f1', 200: '#f2f2ec', 300: '#e8e8e0' },
        navy: { 700: '#303332', 800: '#1d1f1e', 900: '#0b0c0c', 950: '#050606' },
        gold: { 300: '#66ffa9', 400: '#33ff93', 500: '#00ff7d', 600: '#00d96b', 700: '#007f48' },
        ink: { 300: '#a7aaa6', 400: '#7d817d', 500: '#5f625f', 700: '#303331', 900: '#0b0c0c' },
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
