var merge = require('webpack-merge')
var DashboardPlugin = require('webpack-dashboard/plugin')

const webpackBase = require('./base.config')

module.exports = merge(webpackBase, {

    module: {
        rules: [
            { test: /\.css$/, loader: 'style-loader!css-loader' },
            { test: /\.less$/, loader: 'style-loader!css-loader!less-loader' },
        ],
    },

    plugins: [
        // support or webpack dashboard
        new DashboardPlugin(),
    ],

    devServer: {
        historyApiFallback: true,
        noInfo: false,
        contentBase: 'app',
        proxy: {
            '/api': {
                target: 'http://localhost:3000'
            }
        }
    },
})



