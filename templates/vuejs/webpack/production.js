const config = require('./base')
const webpack = require('webpack')
var ExtractTextPlugin = require('extract-text-webpack-plugin')


// add here your production config

config.devtool = 'sourcemap'

config.module.rules.push(
    {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract({
            fallbackLoader: 'style-loader',
            loader: 'css-loader',
        }),
    }
)

config.plugins.push(
    new ExtractTextPlugin('styles.css'),

    // uglify JS (obscure & minimize)
    new webpack.optimize.UglifyJsPlugin({
        sourceMap: true,
        compress: {
            warnings: false,
        },
    }),

    // minimize other files (css, ...)
    new webpack.LoaderOptionsPlugin({
        minimize: true,
    })
)

module.exports = config
