/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary": "#15B097",
        "secondary": "#1A4A49",
        "white": "#ffffff",
        "alternate": "#FF5964"
      }
    },
  },
  plugins: [],
}