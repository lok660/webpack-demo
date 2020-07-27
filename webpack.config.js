const path = require('path');

module.exports = {
  //  模式:开发或生产
  mode: 'development',
  //  打包文件入口
  entry: {
    main: './src/index.js'
  },
  //  使用的loader
  module: {
    rules: [
      {
        // 命中less文件
        test: /\.less$/,
        //  从右到左依次采用 less-loader,css-loader,style-loader
        //  当使用post-loader时候,会去读取posts.config.js配置文件,并执行autoprefixer这个插件
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              //  通过在less里面引入的文件,还需要走下面的两个loader
              //  保证了不管是js还是less引入,都会从下到上依次走四个loader
              importLoaders: 2
            }
          },
          'less-loader',
          'postcss-loader',
          // {
          //   loader: 'px2rem-loader',
          //   options: {
          //     remUnit: 75, // rem 相对 px 转换的单位，1rem = 75px
          //     remPrecision: 8 // px 转化为 rem 小数点的位数
          //   }
          // }
        ],
        //  排除node_moudles下面的less文件
        exclude: path.resolve(__dirname, 'node_modules')
      },
      {
        //  命中字体,图片文件
        test: /\.(gif|png|jpe?g|eot|woff|ttf|svg|pdf)$/,
        //  采用file-loader加载,并给file-loader传入
        //  相应的配置参数,通过placeholders指定输出的名字
        use: {
          loader: 'file-loader',
          options: {
            name: '[name]_[hash].[ext]',
            outputPath: 'images/',
            //  当大于limit的时候,会将图片直接打包到images文件夹
            //  当小于limit的时候,会将图片转换成base64的格式打包到.js文件中
            limit: 10240
          }
        }
      }
    ]
  },
  //  打包文件的出口
  output: {
    //  采用cdn
    publicPath: 'http://cdn.com.cn',
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist')
  }

}