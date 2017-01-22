const webpack = require('webpack')
const merge = require('webpack-merge')
const DashboardPlugin = require('webpack-dashboard/plugin')

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
    // support for webpack dashboard
    new DashboardPlugin(),
  ],

  devServer: {
    historyApiFallback: true,
    noInfo: false,
    contentBase: 'app',
  },
})
