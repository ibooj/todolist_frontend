const merge = require('webpack-merge');
const webpack = require('webpack');
const common = require('./webpack.common.js');


module.exports = merge(common, {
    devtool: 'inline-source-map',
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ],
    devServer: {
        contentBase: './dist',
        port: 3000,
        historyApiFallback: true,
        inline: true,
        hot: true,
        host: '127.0.0.1'
    }
});