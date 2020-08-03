const path = require('path')
const webpack = require('webpack');
const { merge } = require('webpack-merge');
const commonConfig = require('./webpack.common.js');

const devConfig = {
  mode: 'development',
  devtool: 'cheap-module-eval-source-map', // development
  devServer: {
    contentBase: './dist',
    // open: true,
    port: 8080,
    hot: true
  },
  optimization: {
    usedExports: true,
    splitChunks: {
      chunks: 'all', // 公用的类库差分(分隔代码)
    }
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, '../dist')
  }
}

module.exports = merge(commonConfig, devConfig);

