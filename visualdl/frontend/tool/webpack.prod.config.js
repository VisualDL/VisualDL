/**
 * @file webpack
 * @author abingblog@gmail.com
 */

const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');
const autoprefixer = require('autoprefixer');
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin');
const bizCss = new ExtractTextPlugin('biz.[chunkhash].css');
let merge = require('webpack-merge');
let baseWebpackConfig = require('./webpack.config');
const autoPrefixOptions = {
    browsers: [
        'iOS >= 7',
        'Android >= 4.0',
        'ExplorerMobile >= 10',
        'ie >= 9'
    ]
};

/**
 * 入口配置
 *
 * @type {Object}
 */

module.exports = merge(baseWebpackConfig, {
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': 'production'
            }
        }),

        new webpack.LoaderOptionsPlugin({
            test: /\.(styl|san)$/,
            san: {
                autoprefixer: autoPrefixOptions
            }
        }),

        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            filename: 'vendor.[chunkhash].js',
            minChunks: function (module, count) {
                const resPath = module.resource;
                return resPath && /\.js$/.test(resPath)
                    && resPath.indexOf(
                        path.join(__dirname, '../node_modules')
                    ) === 0;
            }
        }),

        // 为了避免业务代码改变也会改变 vendor 的 hash，把运行时代码提取出来来避免这个问题
        new webpack.optimize.CommonsChunkPlugin({
            name: 'manifest',
            minChunks: Infinity
        }),

        new webpack.optimize.UglifyJsPlugin({
            compress: {
                'screw_ie8': true, // 不需要支持 ie6/7/8
                'warnings': false
            },
            comments: false,
            sourceMap: false
        }),

        bizCss,

        // 优化样式，避免来自不同组件依赖相同样式合并时候存在重复
        new OptimizeCSSPlugin({
            cssProcessorOptions: {
                safe: true
            }
        })
    ]
});
