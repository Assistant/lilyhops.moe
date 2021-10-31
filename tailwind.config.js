module.exports = {
  purge: ['./components/**/*.tsx', './pages/**/*.tsx','./public/**/*.html'], //add this line
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      maxHeight: {
        'test': '1vh',
        '3/4': '75vh',
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
