/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        ivc: {
          bg: "#ffffff",
          card: "#f3f4f6", // gray-100
          text: "#1f2937", // gray-800
          primary: "#14B8A6", // Teal
          secondary: "#2563eb", // Blue
          accent: "#0891b2", // Cyan-600
          // Dark theme colors
          "dark-bg": "#000000",
          "dark-card": "#0f0f16", // Slightly lighter than black for cards
          "dark-text": "#F5F5F5",
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
