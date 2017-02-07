/* eslint-disable */
const path = require('path')
const webpack = require('webpack')
var merge = require('webpack-merge')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
const webpackBase = require('./base.config')
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = merge(webpackBase, {
  // production ready source maps
  // remove this line if your don't want source maps
  devtool: 'sourcemap',

  output: {
    filename: 'bundle.[hash].js',
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/',
  },

  module: {
    rules: [
      // extract css to file
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader',
        }),
      },
    ],
  },

  plugins: [
    // extract css to file
    new ExtractTextPlugin('styles.[hash].css'),

    // uglify JS (obscure & minimize)
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: false,
      },
    }),

    // minimize other files (css, ...)
    new webpack.LoaderOptionsPlugin({
      minimize: true,
    }),

    // generate html file
    new HtmlWebpackPlugin({
      template: './app/index.templ.html'
    }),
  ],
})
