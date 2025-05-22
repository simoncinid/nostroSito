/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#0f172a",
        secondary: "#1e293b",
        accent: "#3b82f6",
        dark: {
          DEFAULT: "#0f172a",
          lighter: "#1e293b",
          light: "#334155"
        },
        light: {
          DEFAULT: "#f8fafc",
          darker: "#e2e8f0",
          dark: "#cbd5e1"
        }
      },
    },
  },
  plugins: [],
} 