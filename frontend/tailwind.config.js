/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        medical: {
          50: '#F0F9FF',
          100: '#E0F2FE',
          500: '#2563EB', // Primary Medical Blue
          600: '#1D4ED8',
          700: '#1E40AF',
        },
        healthgreen: {
          50: '#ECFDF5',
          100: '#D1FAE5',
          500: '#10B981', // Secondary Healthcare Green
          600: '#059669',
          700: '#047857',
        },
        darkgray: '#1E293B',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Outfit', 'sans-serif'],
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.04)',
        'premium': '0 10px 30px -5px rgba(0, 0, 0, 0.05), 0 4px 12px -2px rgba(0, 0, 0, 0.03)',
      },
      backdropBlur: {
        'xs': '2px',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      }
    },
  },
  plugins: [],
}
