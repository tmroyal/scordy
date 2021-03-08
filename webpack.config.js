const path = require('path');

module.exports = {
  module: {
    rules: [
      {
        test: /\.xml$/,
        use: 'raw-loader',
      },
    ]
  },
  entry: {
    index: './src/index.js'
  },
  mode: 'development',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist')
  },
  watch: true
}