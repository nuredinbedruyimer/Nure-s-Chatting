import type { Config } from 'tailwindcss'


const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {

      
    
    fontFamily: {
      sans: ['Graphik', 'sans-serif'],
      serif: ['Merriweather', 'serif'],
    },
    borderRadius: {
      'sm': '0.5rem',
      'md': '1rem',
      'lg':'1.5rem',
      '4xl': '2rem',
    },
        screens: {
      'sm': '600px',
      // => @media (min-width: 640px) { ... }

      'md': '780px',
      // => @media (min-width: 768px) { ... }

      'lg': '102px',
      // => @media (min-width: 1024px) { ... }

      'xl': '1280px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1530px',
      // => @media (min-width: 1536px) { ... }
      
    }
  },
  plugins: [require('@tailwindcss/forms')({
    strategy:'class'
  })],
}
export default config
