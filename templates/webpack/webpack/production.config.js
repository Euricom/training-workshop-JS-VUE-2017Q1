const webpack = require('webpack')
var merge = require('webpack-merge')
var ExtractTextPlugin = require('extract-text-webpack-plugin')

const webpackBase = require('./base.config')

module.exports = merge(webpackBase, {
  // production ready source maps
  devtool: 'sourcemap',

  module: {
    rules: [
      // extract css to file
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract({
          fallbackLoader: 'style-loader',
          loader: 'css-loader',
        }),
      },
    ],
  },

  plugins: [
    // extract css to file
    new ExtractTextPlugin('styles.css'),

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
  ],
})
