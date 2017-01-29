const path = require('path')
const webpack = require('webpack')
const pkg = require('../package.json')

const env = process.env.NODE_ENV || 'development'

module.exports = {
  entry: './app/main.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, '../app/bundle'),
    publicPath: '/bundle/',
  },
  module: {
    rules: [
      // { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
      { test: /\.json$/, loader: 'json-loader' },
      { test: /\.html$/, loader: 'html-loader' },
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
      'process.env': {
        NODE_ENV: JSON.stringify(env),
        VERSION: JSON.stringify(pkg.version),
      },
    }),
  ],
  // https://webpack.js.org/configuration/devtool/
  devtool: 'eval-cheap-module-source-map',
}

console.log('App Version: ', env.VERSION)
console.log('Build Env: ', env.NODE_ENV)
