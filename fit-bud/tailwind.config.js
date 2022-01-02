const tokens = require('./src/styles/build/tokens.json');

module.exports = {
  content: [
    './src/**/*.tsx',
  ],
  theme: {
    extend: {
      colors: {...tokens.color}
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  }
}
