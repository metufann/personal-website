/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      keyframes: {
        'hero-shine-sweep': {
          '0%': { transform: 'translateX(-100%) skewX(-12deg)' },
          '100%': { transform: 'translateX(400%) skewX(-12deg)' },
        },
      },
      animation: {
        'hero-shine-sweep': 'hero-shine-sweep 0.6s ease-out forwards',
      },
      colors: {
        primary: '#1a1a1a',
        secondary: '#3b82f6',
        tertiary: '#2d2d2d',
        textPrimary: '#ffffff',
        textSecondary: '#9ca3af',
      },
    },
  },
  plugins: [],
} 