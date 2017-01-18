const config = require('./base')
var DashboardPlugin = require('webpack-dashboard/plugin')

config.module.rules.push(
    { test: /\.css$/, loader: 'style-loader!css-loader' }
    // { test: /\.scss$/, loader: 'style-loader!css-loader!sass-loader' },
)

config.plugins.push(
    new DashboardPlugin()
)

config.devServer = {
    historyApiFallback: true,
    noInfo: false,
    contentBase: 'app',
}

module.exports = config



