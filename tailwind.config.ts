import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    colors: {
      'black': '#000',
      'c-transparent': '#00000000',
      'white': '#fff',
      'interactive': '#2C2B29',
      'base': '#1A1A1A',
      'primary': '#262626',
      'primary-buttons': '#5E35B1',
      'secondary-text': '#9A9A9A',
      'focus-text': '#D4D4D4',
    },
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}
export default config
