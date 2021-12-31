module.exports = {
  content: ['./src/**/*.{ts,tsx}'],
  mode: "jit",
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#191923',
          light: '#343542',
        },
        body: {
          DEFAULT: '#151E29',
          secondary: '#404752',
          light: '#E6E9EE',
        },
        accent: {
          DEFAULT: '#f2305a'
        }
      }
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  }
}
