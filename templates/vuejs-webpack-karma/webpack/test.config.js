const webpack = require('webpack')

module.exports = {

  // define your rules here
  module: {
    rules: [
      // basic babel loader (if using ES.Next)
      { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
      { test: /\.json$/, loader: 'json-loader' },
      // { test: /\.html$/, loader: 'html-loader' },
      { test: /\.html$/, loader: 'vue-template-compiler-loader' },
      { test: /\.vue$/, loader: 'vue-loader' },

      // don't process css/less files (much faster)
      { test: /\.less$/, loader: 'null-loader' },
      { test: /\.css$/, loader: 'null-loader' },
    ],
  },

  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      'jQuery': 'jquery',
      'window.jQuery': 'jquery',
    }),
  ],

  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.common.js',
    },
  },

  devtool: 'inline-cheap-module-source-map',
}
