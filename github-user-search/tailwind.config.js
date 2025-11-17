/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        github: {
          dark: '#24292f',
          blue: '#0969da',
          green: '#2da44e',
          border: '#d0d7de',
          gray: '#656d76',
        }
      }
    },
  },
  plugins: [],
}