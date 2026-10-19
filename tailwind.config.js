/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Geist', 'sans-serif'],
        display: ['Special Elite', 'serif'],
      },
      colors: {
        wandor: {
          dark: '#0a0a0a',
          text: '#1a1a1a',
          muted: '#767676',
          prompt: '#905831',
        },
        carnet: {
          forest: '#173a32',
          sage: '#476b5e',
          ivory: '#f6f2e9',
          gold: '#ac8960',
          earth: '#905831',
        },
      },
      boxShadow: {
        liquid: '0 0 4px 0 rgba(0,0,0,.15), 0 20px 70px rgba(20,38,31,.12)',
        floating: '0 18px 60px rgba(19,36,31,.2)',
      },
    },
  },
  plugins: [],
};
