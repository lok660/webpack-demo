```js
//开发环境使用
devtool:'souce-map' //错误检测
//babel 缓存
cacheDirectory:true
//devserver:
devServer{
//gzip 压缩
compress:true,
prot:3000,
hot:true,
//不显示日志
clientLogLevel:'silent',
//只打印基本信息
quiet:true,
//代理 跨域
proxy:{
'/api':{
target:'localhost:3000/api',
//发送请求路径重写
pathRewrite:{}
},
//忽略
watchOptions:{
ignored:/node_modules/
}
}
//生产环境
//文件缓存

[hash]:index.hash.js

[chunkhash]:长效缓存 ,如果打包来源相同 chunk hash 相同
[contenthash]:不同文件使用不同的 hash 比如 jscss 不同
```

# tree shaking

树摇:去除代码没有使用的代码

```js
必须 es6 模块化 生产环境
package.json
"sideEffects":["*.css"] #抽离 node_module
omtimization:{
splitChunks:{
chunks:'all'
}
}
```

# 懒加载 lazy-loadding

```js
预加载 webpackPrefetch:true //空闲提前加载
import(/_ webpackChunkName: "print",webpackPrefetch:true_/'./').then(()=>{})
```

# 多进程打包

```js
thread-loader
哪个 loader 用就配置哪个 常用于 babel
常用于大量代码
如:
use[
{
loader:'thread-loader',
options:{workers:2}//设置进程
},
{...loader}
]
```

## externals

```js
使用 cdn 代替
//webpack.config.js
externals:{
库名:npm 包名
Jquery:"jQuery"
}
然后在 html 引入 cdn
```

## dll

动态连接库 将多个库打包为一个 chunk

## resolve

```js
webpack.config.js
resolve:{
//配置路径别名
alias:{
$css:resolve(__dirname,'src/css/index.css')
    //import $css === import '...index.css'
}
//忽略文件名
extensions:['.js','.css']
告诉 webpack 哪里查找 node_modules
modules:[resolve(__dirname,'../../node_modules'),node_modules]
}
```

## optimization

```js

optimization:{
  splitChunks:{
    chunks:'all',
    minSize:30*1024, //分割代码大于30kb 小于不分割
    maxSize:0//无最大限制
    minChunks:1,至少引用一起才会被chunk
    maxAsyncRequests:5 //按需加载时并行加载的数量
    maxInitialRequests:3 //入口js最大并行请求数量
    automaticNameDelimiter:'~'//名称连接符号,xx~
    name:true //命名规则
    cacheGroups:{
      //分割规则
      vendors:{
        test:/node_modules/,//需要写成正则
          priority:-10
      }
    },
      //js压缩
     minimizer: [new TerserPlugin(
     cache:true,
     parallel:true
     )],
}
```

## code

```js
 optimization: {
    minimizer: [new OptimizeCSSAssetsPlugin({}),
    new terserwebpackplugin({
      cache: true,
      parallel: true
    })],
    runtimeChunk: {
      name: 'manifest',
    },
    splitChunks: {
      chunks: 'async',
      minSize: 30000,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      name: false,
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor',
          chunks: 'all',
        },
        styles: {
          name: 'styles',
          test: /\.(scss|css)$/,
          chunks: 'all',
          enforce: true
        }
      },
    },
  },
```





推荐阅读

https://juejin.im/post/6859888538004783118?utm_source=gold_browser_extension#heading-46