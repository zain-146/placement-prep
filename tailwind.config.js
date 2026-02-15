/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: 'hsl(245, 58%, 95%)',
          100: 'hsl(245, 58%, 90%)',
          200: 'hsl(245, 58%, 80%)',
          300: 'hsl(245, 58%, 70%)',
          400: 'hsl(245, 58%, 61%)',
          500: 'hsl(245, 58%, 51%)',
          600: 'hsl(245, 58%, 45%)',
          700: 'hsl(245, 58%, 38%)',
          800: 'hsl(245, 58%, 30%)',
          900: 'hsl(245, 58%, 20%)',
        },
      },
    },
  },
  plugins: [],
}
