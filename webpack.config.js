const path = require('path');
const resolve = dir => path.resolve(__dirname, dir);
const ProgressBarPlugin = require('progress-bar-webpack-plugin');

module.exports = {
    mode: process.env.NODE_ENV,
    performance: {
        hints: false
    },
    entry: {
        index: resolve('./index.js')
    },
    output: {
        path: resolve('./lib'),
        filename: '[name].js',
        library: 'utils',
        libraryTarget: 'umd',
        globalObject: 'this',
        umdNamedDefine: true
    },
    optimization: {
        minimize: false
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                test: /\.js$/,
                enforce: 'pre',
                loader: 'eslint-loader',
                options: {
                    emitWarning: true
                }
            }
        ]
    },
    plugins: [
        new ProgressBarPlugin()
    ]
};
