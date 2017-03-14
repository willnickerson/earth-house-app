const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
module.exports = {
    entry: './src/app.js',
    output: {
        path: '../server/public',
        filename: 'bundle.js'
    },

    devtool: 'source-map',
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        }),
        new webpack.EnvironmentPlugin(['API_URL'])
    ],

    module: {
        preLoaders: [{
            test: /\.js$/,
            loader: 'eslint-loader',
            exclude: /node_modules/
        }],
        loaders: [{
            test: /\.js$/,
            loader: 'babel-loader',
            exclude: /node_modules/,
            query: {
                presets: ['es2015']
            }
        }, {
            test: /\.scss$/,
            loader: 'style-loader!css-loader?sourceMap!sass-loader?sourceMap'
        }, {
            test: /\.html$/,
            loader: 'html-loader'
        }]
    },
    sassLoader: {
        includePaths: ['./src/scss/partials','./src/scss/fonts']
    }
};