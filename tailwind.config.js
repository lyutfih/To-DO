/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  purge: [
    './src/**/*.{html,js}',
  ],
  theme: {
    extend: {
      fontFamily: {
            'inter': ['Inter', 'sans-serif']
      },
      colors: {
        "brand": {
          50: "#E4E5F7",
          100: "#C8CAEF",
          200: "#9195DE",
          300: "#5A60CE",
          400: "#343AAD",
          500: "#242878",
          600: "#1C205E",
          700: "#151847",
          800: "#0E102F",
          900: "#070818",
          950: "#04040C"
        },
      },
    },
  },
  plugins: [],
}



