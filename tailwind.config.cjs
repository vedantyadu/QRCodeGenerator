/** @type {import('tailwindcss').Config} */

let plugin = require('tailwindcss/plugin')

module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}"
  ],
  theme: {
    colors: {
      
    },
    screens: {
      "sm": {"max": "600px"},
      "md": {"max": "900px"}
    },
    extend: {
      colors: {
        "grad-start": "#FFEBD3",
        "grad-end": "#25BAFA",
        "transparent": "#00000000",
        "grey": {
          900: "#101216",
          800: "#16171B",
          700: "#191B1F",
          600: "#24252B",
          500: "#36383C",
          400: "#6F7175"
        }
      }
    },
  },
  plugins: [],
}
