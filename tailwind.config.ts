import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/*/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    screens: {
      'max-1900': { max: '1800px' },
      'max-1800': { max: '1700px' },
      'max-1700': { max: '1700px' },
      'max-1600': { max: '1600px' },
      'max-1500': { max: '1500px' },
      'max-1400': { max: '1400px' },
      'max-1300': { max: '1300px' },
      'max-1200': { max: '1200px' },
      'max-1100': { max: '1100px' },
      'max-1000': { max: '1000px' },
      'max-900': { max: '900px' },
      'max-800': { max: '800px' },
      'max-700': { max: '700px' },
      'max-600': { max: '600px' },
      'max-500': { max: '500px' },
      'max-400': { max: '400px' },
      'max-300': { max: '300px' },
      'max-200': { max: '200px' },

      'min-1900': { min: '1800px' },
      'min-1800': { min: '1700px' },
      'min-1700': { min: '1700px' },
      'min-1600': { min: '1600px' },
      'min-1500': { min: '1500px' },
      'min-1400': { min: '1400px' },
      'min-1300': { min: '1300px' },
      'min-1200': { min: '1200px' },
      'min-1100': { min: '1100px' },
      'min-1000': { min: '1000px' },
      'min-900': { min: '900px' },
      'min-800': { min: '800px' },
      'min-700': { min: '700px' },
      'min-600': { min: '600px' },
      'min-500': { min: '500px' },
      'min-400': { min: '400px' },
      'min-300': { min: '300px' },
      'min-200': { min: '200px' }
    }
  },
  plugins: [require('tailwindcss-animate')]
}
export default config
