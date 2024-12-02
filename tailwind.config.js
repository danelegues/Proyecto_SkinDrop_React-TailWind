/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'skin-primary': '#ff8c00',
        'skin-dark': '#141414',
      },
      fontFamily: {
        'bowlby': ['"Bowlby One"', 'cursive'],
      }
    },
  },
  plugins: [],
}

