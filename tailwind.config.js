module.exports = {
  purge: {
    content: ['./src/**/*.tsx'],
    options: {
      safelist: [/^bg-opacity-/],
    },
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {
      height: ['responsive', 'hover', 'focus'],
    },
  },
  plugins: [],
};
