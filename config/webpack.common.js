const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin'); //  清除dist
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');  //  友好提示插件
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const MiniCssExtractPlugin = require('mini-css-extract-plugin') //  css 压缩

module.exports = {
  entry: {
    main: './src/index.js',
  },
  module: {
    rules: [
      {
        test: /\.ts|tsx$/,
        use: 'ts-loader',
        exclude: /node_modules/
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
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
      }, {
        test: /\.less$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2,
            }
          },
          'less-loader',
          'postcss-loader',
        ]
      }]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: 'src/index.html',
    }),
    new FriendlyErrorsWebpackPlugin(),
    function () {
      this.hooks.done.tap('done', status => {
        if (status.compilation.errors && status.compilation.errors.length && process.argv.indexOf(`--watch`) == -1) {
          console.log('build err')
          process.exit(1)
        }
      })
    },
    // new BundleAnalyzerPlugin({     //  显示构建内容大小
    //   analyzerHost: '127.0.0.1',
    //   analyzerPort: 8889,
    //   openAnalyzer: false
    // })
    new MiniCssExtractPlugin({
      filename: '[name].css', // 直接引用【index.html（入口文件） 引入的名字】
      chunkFilename: '[name].chunk.css' // 间接引用【其他地方引入使用的名字】
    }),
  ],
  // output: {
  //   filename: 'main.js',
  //   path: path.resolve(__dirname, '../dist')
  // },
  stats: 'errors-only',
}