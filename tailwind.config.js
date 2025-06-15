/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
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