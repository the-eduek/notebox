/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        bricolage: `'Bricolage Grotesque', sans-serif`,
        cerebri: `'Cerebri Sans', system-ui, Avenir, Helvetica, Arial, sans-serif`,
        newsreader: `Newsreader, serif`
      }
    },
  },
  plugins: [],
}