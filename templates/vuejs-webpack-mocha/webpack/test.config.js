const nodeExternals = require('webpack-node-externals')

module.exports = {
  // in order to ignore built-in modules like path, fs, etc.
  target: 'node',

  // in order to ignore all modules in node_modules folder
  externals: [nodeExternals()],

  output: {
    // use absolute paths in sourcemaps (important for debugging via IDE)
    devtoolModuleFilenameTemplate: '[absolute-resource-path]',
    devtoolFallbackModuleFilenameTemplate: '[absolute-resource-path]?[hash]',
  },

  // define your rules here
  module: {
    rules: [
      // basic babel loader (if using ES.Next)
      // { test: /\.js$/, loader: 'babel-loader' },
      { test: /\.json$/, loader: 'json-loader' },
      { test: /\.html$/, loader: 'html-loader' },
      { test: /\.vue$/, loader: 'vue-loader' },

      // don't process css/less files (much faster)
      { test: /\.less$/, loader: 'null-loader' },
      { test: /\.css$/, loader: 'null-loader' },
    ],
  },

  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.common.js',
    },
  },

  devtool: 'inline-cheap-module-source-map',
}
