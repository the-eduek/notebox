/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        newsreader: `Newsreader, serif`,
        cerebri: `'Cerebri Sans', system-ui, Avenir, Helvetica, Arial, sans-serif`
      }
    },
  },
  plugins: [],
}