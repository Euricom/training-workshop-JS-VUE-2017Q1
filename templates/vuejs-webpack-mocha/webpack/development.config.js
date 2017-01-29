const webpack = require('webpack')
const merge = require('webpack-merge')

const webpackBase = require('./base.config')

module.exports = merge(webpackBase, {
  module: {
    rules: [
      { test: /\.css$/, loader: 'style-loader!css-loader' },
      { test: /\.less$/, loader: 'style-loader!css-loader!less-loader' }
    ],
  },

  plugins: [
    // don't emit code when there are errors
    new webpack.NoEmitOnErrorsPlugin(),
  ],

  devServer: {
    historyApiFallback: true,
    noInfo: false,
    contentBase: 'app',
  },
})
