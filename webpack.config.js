var webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');


const VENDOR_LIBS = [
    'axios', 'lodash', 'react', 'react-dom', 'react-redux', 'redux', 'redux-thunk'
];

module.exports = {
    entry: {
        bundle: './src/scripts/index.js',
        vendor: VENDOR_LIBS
    },
    output: {
        path: path.join(__dirname, 'public'),
        filename: '[name].[chunkhash].js',
    },
    module: {
        rules: [
            {
                use: 'babel-loader',
                test: /\.js$/,
                exclude: /node_modules/
            },
            {
                use: ['style-loader', 'css-loader', 'sass-loader'],
                test: /\.scss$/
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
        }),
        new webpack.optimize.CommonsChunkPlugin({
            names: ['vendor', 'manifest']
        }),
        new HtmlWebpackPlugin({
            template: 'src/scripts/index.html'
        })
    ]
};