/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'romantic-pink': '#ff85a1',
        'romantic-red': '#ff4d6d',
      },
      fontFamily: {
        'cursive': ['"Pacifico"', 'cursive'],
      }
    },
  },
  plugins: [],
}