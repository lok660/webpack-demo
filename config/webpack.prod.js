const path = require('path')
const { merge } = require('webpack-merge');
const commonConfig = require('./webpack.common.js');

const prodConfig = {
  mode: 'production',
  devtool: 'cheap-module-source-map', // production
  externals: 'lodash',
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'library.js', // 打包出来的名字
    library: 'root', // 用 <script> 方式引入，全局的变量名
    libraryTarget: 'this', // 适用于 AMD、CommonJs、ES6 module引入方式
    libraryExport: 'default',
  }
}

module.exports = merge(commonConfig, prodConfig);