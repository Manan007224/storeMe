const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const asyncPlugin = require("babel-plugin-transform-async-to-generator");

module.exports = {
  entry: {
    main: ['babel-polyfill', './src/index.js']
  },
  output: {
    path: path.join(__dirname, '/dist'),
    filename: 'index_bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    })
  ]
};