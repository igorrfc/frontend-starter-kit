var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: './app/index',
  output: {
    filename: 'bundle.js',
  },
  resolve: {
    modules: [path.resolve('.'), path.resolve('node_modules')],
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['react', 'es2016']
        }
      }
    ]
  }
};
