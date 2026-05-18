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
        crimson: '#A0163B',
        'crimson-dark': '#7a1030',
        yellow: '#F5B800',
        'yellow-dark': '#d4a000',
        ink: '#1E1E1E',
        'ink-soft': '#2a2a2a',
      },
      fontFamily: {
        geist: ['var(--font-geist-sans)'],
      },
    },
  },
  plugins: [],
}
export default config
