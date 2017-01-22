const path = require('path')
const webpack = require('webpack')
const pkg = require('../package.json')

const env = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  VERSION: pkg.version,
}

module.exports = {
  entry: './app/main.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, '../app/bundle'),
    publicPath: '/bundle/',
  },
  module: {
    rules: [
      { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
      { test: /\.json$/, loader: 'json-loader' },
      // { test: /\.html$/, loader: 'html-loader' },
      { test: /\.html$/, loader: 'vue-template-compiler-loader' },
      { test: /\.vue$/, loader: 'vue-loader' },
      {
        test: /\.(eot|woff|woff2|ttf|svg|png|jpg)$/,
        loader: 'url-loader?limit=30000&name=[name]-[hash].[ext]',
      },
    ],
  },
  resolve: {
    // extensions: ['.js', '.scss', '.css'],
    alias: {
      'components': path.resolve(__dirname, '../app/components'),
      'vue': 'vue/dist/vue.js',
    },
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': JSON.stringify(env),
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',
    }),
  ],
  devtool: 'eval',
}

console.log('App Version: ', env.VERSION)
console.log('Build Env: ', env.NODE_ENV)
