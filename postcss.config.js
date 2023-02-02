// postcss.config.js
// pour installer: npm install postcss-px-to-viewport -D
module.exports = {
  plugins: {
    'postcss-px-to-viewport': {
      viewportWidth: 375,
      selectorBlackList: ["favor"]
    },
  },
};
