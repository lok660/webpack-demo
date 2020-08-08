const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const devConfig = require('./webpack.dev.js');
const prodConfig = require('./webpack.prod.js');
const merge = require('webpack-merge');

const commonConfig = {
  entry: {
    main: "./src/index.js",
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              plugins: ["@babel/plugin-transform-runtime"]
            }
          }
        ]
      }, {
        test: /\.(png|jpg|gif)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[name]_[hash].[ext]',
            outputPath: 'images/',
          }
        }
      }, {
        test: /\.(eot|ttf|svg|woff|woff2)$/,
        use: {
          loader: 'file-loader',
        }
      }]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: 'src/index.html',
    }),
    // new BundleAnalyzerPlugin({
    // 	analyzerHost: '127.0.0.1',
    // 	analyzerPort: 8889,
    // 	openAnalyzer: false,
    // }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      _: 'lodash',
      _join: ['lodash', 'join']
    })
  ],
  optimization: {
    usedExports: true,
    runtimeChunk: {
      name: 'runtime',
    },
    //  代码分隔
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        //  第三方依赖
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: 1,  //  设置优先级,首先抽离第三方模块
          name: 'vendors',
          chunks: 'initial',
          minSize: 0,
          minChunks: 1 //  最少引入了1次
        },
        //  缓存组
        common: {
          //  公共模块
          chunks: 'initial',
          name: 'common',
          minSize: 100,  //  大小超过100个字节
          minChunks: 3,  //  最少引入了3次
        }
      }
    },
  },
  performance: false, // 关闭性能上的一些问题
}

module.exports = env => {
  console.log('env', env);
  if (env) {
    return merge(commonConfig, prodConfig);
  } else {
    return merge(commonConfig, devConfig);
  }
};