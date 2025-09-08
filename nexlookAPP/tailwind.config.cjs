/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#4A90E2',
          DEFAULT: '#357ABD',
          dark: '#2B639C'
        },
        secondary: {
          light: '#F5F7FA',
          DEFAULT: '#E4E7EB',
          dark: '#C5C6C7'
        }
      }
    },
  },
  darkMode: 'class',
  plugins: [],
}
