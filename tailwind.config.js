module.exports = {
  purge: ['./components/**/*.tsx', './pages/**/*.tsx','./public/**/*.html'], //add this line
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      maxHeight: {
        '3/4': '75vh',
       },
       maxWidth: {
        '3/4': '75vw',
        'video': 'min(100vw - 1rem, (100vh - 10rem) * 16 / 9)',
       },
      fontFamily: {
        title: ["'Varela Round'"]
      },
      margin: {
        '-15': '-3.75rem',
      }
    }
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/aspect-ratio')
  ],
}
