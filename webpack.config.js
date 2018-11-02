var path = require("path")
var webpack = require('webpack')

module.exports = {
  entry: './frontend/src/index.js',

  output: {
    path: path.join(__dirname, '/backend/server/static'),
    filename: 'main.js',
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        }
      }
    ]
  },
};
