module.exports = {
  purge: ['./components/**/*.tsx', './pages/**/*.tsx','./public/**/*.html'], //add this line
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        "green": {
          "light": "#94ec7c",
          "dark": "#36b24f",
          "darker": "#259847"
        },
        "blue": {
          "light": "#2fccf6",
          "dark": "#2daee2",
        },
      },
      maxWidth: {
        'video': 'min(100vw - 1rem, (100vh - 11rem) * 16 / 9)',
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
