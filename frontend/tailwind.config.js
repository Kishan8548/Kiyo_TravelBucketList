/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Poppins', 'sans-serif'],
      },
      colors: {
        violet: {
          DEFAULT: '#7C3AED',
          light: '#A78BFA',
        },
        amber: {
          DEFAULT: '#F59E0B',
          light: '#FCD34D',
        },
      },
    },
  },
  plugins: [],
}
