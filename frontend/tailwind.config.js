/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: '#2563eb', // Blue 600
        secondary: '#4f46e5', // Indigo 600
        accent: '#db2777', // Pink 600
        neutral: '#4b5563', // Gray 600
        'base-100': '#ffffff',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
};