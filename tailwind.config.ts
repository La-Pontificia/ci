/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/prefer-ts-expect-error */
import type { Config } from 'tailwindcss'

// @ts-ignore
import animations from '@midudev/tailwind-animations'
const config: Config = {
  content: ['./src/*/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      fontFamily: {
        canela: ['Canela', 'sans-serif']
      }
    },
    animation: {
      'spin-slow': 'spin 3s linear infinite'
    }
  },
  darkMode: 'class',
  plugins: [animations]
}
export default config
