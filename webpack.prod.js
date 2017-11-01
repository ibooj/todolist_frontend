const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = merge(common, {
    devtool: 'cheap-module-source-map',
    plugins: [
        new CleanWebpackPlugin(['dist']),
        new webpack.optimize.UglifyJsPlugin({
            minimize: true,
            sourceMap: true,
            compress: {
                warnings: false,
                pure_funcs: ['console.log', 'window.console.log.apply']
            },
        }),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        })
    ]
});