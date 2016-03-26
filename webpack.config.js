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

    // @TODO!! check eslint for all the new code
    preLoaders: [
      {
        test: /\.js(x)?$/,
        exclude: /node_modules/,
        loader: 'eslint-loader'
      }
    ],

    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react']
        }
      }
    ]
  },

  resolve: {
    extensions: ['.jsx', '.js', '.css', '']
  },

  plugins: [
    // separate common code
    new CommonsChunkPlugin('bundle.js'),
    new DefinePlugin({
      'process.env': Object.keys(process.env).reduce(function(o, k) {
        o[k] = JSON.stringify(process.env[k]);
        return o;
      }, {})
    })
  ],

  // for linting purposes
  eslint: {
    emitError: true,
    emitWarning: true,
    failOnError: true,
    failOnWarning: false
  }
};

module.exports = WebpackConfig;
