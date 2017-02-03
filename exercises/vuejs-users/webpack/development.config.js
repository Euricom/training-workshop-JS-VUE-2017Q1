// eslint-disable-next-line
const merge = require('webpack-merge')
const webpackBase = require('./base.config')

module.exports = merge.smart(webpackBase, {

  module: {
    rules: [
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader',
      },
      {
        test: /\.less$/,
        loader: 'style-loader!css-loader!less-loader',
      },
    ],
  },

  plugins: [
  ],

  devServer: {
    historyApiFallback: true,
    noInfo: false,
    contentBase: 'app',
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
      },
    },
  },
})
