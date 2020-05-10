const webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

// const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
// const TerserPlugin = require('terser-webpack-plugin');

const commonPaths = require('./paths');

module.exports = {
    mode: 'production',
    // output: {
    //     filename: `${commonPaths.jsFolder}/[name].[hash].js`,
    //     path: commonPaths.outputPath,
    //     chunkFilename: `${commonPaths.jsFolder}/[name].[chunkhash].js`,
    // },
    plugins: [
        new UglifyJSPlugin({
            sourceMap: true
        }),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        })
    ],
    devtool: 'source-map',
};