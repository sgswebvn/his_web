/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./data/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        imperial: {
          50: '#fdfbf7',
          100: '#f9f4ea',
          200: '#f2e5cc',
          300: '#e7d0a5',
          400: '#d7af68',
          500: '#c29438',
          600: '#a7762a',
          700: '#875822',
          800: '#6f4621',
          900: '#5c3a1e',
        },
        royal: {
          red: '#881337',
          maroon: '#7f1d1d',
          darkRed: '#450a0a',
          gold: '#c29438',
          emerald: '#0f766e',
          jade: '#047857',
        },
        heritage: {
          bg: '#fbf7ee',
          card: '#ffffff',
          dark: '#1c1917',
          text: '#291a10',
          muted: '#6b7280',
          border: '#e7d8c5',
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      }
    },
  },
  plugins: [],
}

