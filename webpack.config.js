'use strict';

const dotenv = require('dotenv');
const webpack = require('webpack');
const CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;
const DefinePlugin = webpack.DefinePlugin;

dotenv.load({silent: true});

const WebpackConfig = {
  entry: {
    main: './src/Main.jsx'
  },

  // send to distribution
  output: {
    path: './public/dist',
    filename: '[name].js'
  },

  module: {
    preLoaders: [
      {
        test: /\.js(x)?$/,
        exclude: /node_modules/,
        loader: 'eslint-loader'
      }
    ],
    loaders: [
      {
        test: /\.js(x)?$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  },

  resolve: {
    extensions: ['.jsx', '.js', '.css', '']
  },

  plugins: [
    new CommonsChunkPlugin('bundle.js'),
    new webpack.DefinePlugin({
      'process.env': {
        // specify all variables manually here
        'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
      }
    })
  ],

  // linting
  eslint: {
    emitError: true,
    emitWarning: true,
    failOnError: true,
    failOnWarning: false
  }
};

module.exports = WebpackConfig;
