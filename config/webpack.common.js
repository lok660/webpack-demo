const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');

module.exports = {
  entry: {
    main: './src/index.js',
  },
  module: {
    rules: [
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
    }
  ],
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, '../dist')
  },
  stats: 'errors-only',
}