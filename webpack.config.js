const path = require('path');

module.exports = {
  entry: {
    index: './src/index.js'
  },
  mode: 'development',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.xml$/i,
        use: 'raw-loader',
      },
    ],
  },
  watch: true
}