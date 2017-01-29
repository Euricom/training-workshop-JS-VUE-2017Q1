const path = require('path')

module.exports = {
  entry: './app/main.js',
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, 'bundle'),
    publicPath: '/bundle/',
  },
  module: {
    rules: [
        { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
        { test: /\.css$/, loader: 'style-loader!css-loader' },
    ],
  },
  devServer: {
    historyApiFallback: true,
    noInfo: false,
    contentBase: 'app',
  },
}
