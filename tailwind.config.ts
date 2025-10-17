import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['app/renderer/**/*.{html,tsx,ts}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        neon: {
          500: '#8B5CF6',
          600: '#7C3AED',
          700: '#5B21B6'
        },
        midnight: '#0f172a',
        sunset: '#f97316'
      },
      fontFamily: {
        display: ['\"Rajdhani\"', 'sans-serif'],
        sans: ['\"Inter\"', 'sans-serif']
      },
      boxShadow: {
        glow: '0 0 40px rgba(139, 92, 246, 0.45)'
      }
    }
  },
  plugins: []
};

export default config;
