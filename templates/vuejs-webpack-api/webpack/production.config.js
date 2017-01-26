const webpack = require('webpack')
var merge = require('webpack-merge')
var ExtractTextPlugin = require('extract-text-webpack-plugin')

const webpackBase = require('./base.config')

module.exports = merge.smart(webpackBase, {
  // production ready source maps
  devtool: 'sourcemap',

  module: {
    rules: [
      // override vue-loader to extract css
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            less: ExtractTextPlugin.extract({
              loader: 'css-loader!less-loader',
              fallbackLoader: 'vue-style-loader',
            }),
          },
        },
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
