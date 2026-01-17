/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{jsx,js,ts,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        active: "#009ad8",
        brandblue: "#1e202b"
      },
      keyframes: {
        'pulse-glow-large': {
          '0%': { boxShadow: '0 0 0 0 rgba(0, 154, 216, 0.4)' },
          '30%': { boxShadow: '0 0 30px 30px rgba(0, 154, 216, 0.3)' },
          '100%': { boxShadow: '0 0 30px 30px rgba(0, 154, 216, 0)' },
        },
      },
      animation: {
        'pulse-glow-large': 'pulse-glow-large 0.8s ease-out forwards',
      },
    },
  },
  plugins: [],
}
