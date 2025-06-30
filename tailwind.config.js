/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'display': ['Righteous', 'cursive'],
        'body': ['Plus Jakarta Sans', 'sans-serif'],
      },
      colors: {
        primary: '#E85D04',
        secondary: '#DC2F02',
        accent: '#FFBA08',
        surface: '#FAA307',
        background: '#FFEDD8',
        success: '#06A77D',
        warning: '#F77F00',
        error: '#D00000',
        info: '#005377',
      },
      animation: {
        'dice-roll': 'dice-roll 1s ease-in-out',
        'token-move': 'token-move 0.6s ease-in-out',
        'celebrate': 'celebrate 0.5s ease-in-out',
        'pulse-slow': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        'dice-roll': {
          '0%': { transform: 'rotate(0deg) scale(1)' },
          '25%': { transform: 'rotate(90deg) scale(1.1)' },
          '50%': { transform: 'rotate(180deg) scale(1.2)' },
          '75%': { transform: 'rotate(270deg) scale(1.1)' },
          '100%': { transform: 'rotate(360deg) scale(1)' },
        },
        'token-move': {
          '0%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.2)' },
          '100%': { transform: 'scale(1)' },
        },
        'celebrate': {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.2)' },
        },
      },
      boxShadow: {
        'game': '0 4px 16px rgba(220, 47, 2, 0.1)',
        'token': '0 2px 8px rgba(0, 0, 0, 0.2)',
        'dice': '0 6px 20px rgba(232, 93, 4, 0.3)',
      },
    },
  },
  plugins: [],
}