const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: ['@babel/polyfill', './frontend/client.js'],

  output: {
    path: path.join(__dirname, '/backend/server/static'),
    filename: 'main.js',
  },

  resolve: {
    modules: ['node_modules', 'frontend'],
  },

  module: {
    strictExportPresence: true,

    rules: [
      {
        test: /\.(js|jsx|mjs)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        }
      },
      {
        test: /\.css$/,
        use: [
          { loader: 'style-loader' },
          {
            loader: 'css-loader',
            options: {
              modules: true,
              localIdentName: '[local]--[hash:base64:5]',
            },
          },
        ],
      },
      {
        test: /\.(bmp|gif|jpg|jpeg|png|svg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              publicPath: 'static',
            },
          },
        ],
      },
    ],
  },
};
