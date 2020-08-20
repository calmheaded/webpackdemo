// let pages = require("./pageConfig.js");
// console.log(pages,'pages')
const evn = process.env.NODE_ENV == "production" ? "production" : "development";
console.log(evn, "process.env.NODE_ENV");
const path = require("path");
const webpack = require("webpack"); //引入的webpack,使用lodash
//path.resolve() 方法会把一个路径或路径片段的序列解析为一个绝对路径。
const VueLoaderPlugin = require("vue-loader/lib/plugin");
// const ExtractTextPlugin = require('extract-text-webpack-plugin')     //打包的css拆分,将一部分抽离出来  webpack4不支持这种了
const MiniCssExtractPlugin = require("mini-css-extract-plugin"); //css抽离出来
// https://github.com/jantimon/html-webpack-plugin#options
const HtmlWebpackPlugin = require("html-webpack-plugin"); //将html打包
// 看到项目各模块的大小，可以按需优化
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;
function resolve(dir) {
  return path.join(__dirname, dir);
}
console.log(path.resolve(__dirname, "111111111111111111111")); //物理地址拼接
module.exports = {
  mode: "development",
  // https://webpack.js.org/configuration/devtool/#development
  // devtool: 'cheap-module-eval-source-map',//生产环境下去除devtool
  devtool: "none", //在开发者模式下，默认开启sourcemap,将其关闭
  //devtool:'source-map'//开启映射打包会变慢
  //devtool:'inline-source-map'//不单独生成.map文件，会将生成的映射文件以base64的形式插入到打包后的js文件的底部
  //devtool:'cheap-inline-source-map'//代码出错提示不用精确显示第几行的第几个字符出错，只显示第几行出错，会提高一些性能
  //devtool:'cheap-module-inline-source-map'//不仅管自己的业务代码出错，也管第三方模块和loader的一些报错
  //devtool:'eval'//执行效率最快，性能最好，但是针对比较复杂的代码的情况下，提示内容不全面
  //devtool: 'cheap-module-eval-source-map',//在开发环境推荐使用，提示比较全，打包速度比较快
  //devtool: 'cheap-module-source-map',//在生产环境中推荐使用，提示效果会好一些
  //开发环境推荐: cheap-module-eval-source-map
  //生产环境推荐: cheap-module-source-map
  //入口文件  在vue-cli main.js
  //   entry: "./src/main.js", //入口
//   entry: {
//     index: "./src/main.js", //对象形式vue入口文件
//     // another: "./src/another-module.js",
//   }, 
// entry 配置 https://segmentfault.com/a/1190000008288240
    entry: {
        index: "./src/main.js", //对象形式vue入口文件
    }, 
    // 多页面  有问题
    // entry:pages,

  output: {
    //输出
    path: path.resolve(__dirname, "dist"), //输出的路径
    // chunk 和bundle的区别 https://www.cnblogs.com/skychx/p/webpack-module-chunk-bundle.html
    // hash  chunkhash 的区别 https://blog.csdn.net/bubbling_coding/article/details/81561362
    filename: "[name].[hash:7].js",
    // chunkFilename: "[name].bundle.js", //没有生成这样的文件 https://webpack.js.org/configuration/output/#output-chunkfilename
    // 主要文件为hash,引入的css文件为contentHash,第三方库为chunkHash
    // filename: "bundle.js", //输出的文件名
    // publicPatch: "//【cdn】.com", //指定存放JS文件的CDN地址
  },
  // 配置别名，增加加载速度
  resolve: {
    // Webpack 解析扩展名的配置
    extensions: [".js", "jsx", ".vue", ".json"],
    alias: {
      //   vue$: "vue/dist/vue.esm.js",
      vue$: "vue/dist/vue.runtime.esm.js", //是否使用包含运行时编译器的 Vue 构建版本
      // "@": path.resolve(__dirname, "src"),
      "@": resolve("src"),
      // assets: resolve("assets"),
      // 'components': resolve('components'),
      // 'utils': resolve('utils'),
      // 'scss': resolve('scss'),
      // 'config': resolve('config')
    },
  },
  // 处理对应的模块  例如解读css,图片如何转换,压缩
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          // options:{
          //   presets: [
          //     ["@babel/preset-env",{
          //       //targets：表示编译出的代码想要支持的浏览器版本
          //       targets: {
          //         chrome: "67"
          //       }
          //     }]
          //   ]
          // }
        },
      },
      {
        test: /\.vue$/, //匹配到该的文件由该规则处理
        use: "vue-loader",
      },
      // 处理图片
      {
        // test: /\.(png|jpg|gif)$/, //正则匹配要使用相应loader的文件
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        use: {
          loader: "url-loader", //要用到的loader
          options: {
            //palceholder占位符
            name: "[name].[ext]", //打包后的图片名字，后缀和打包的之前的图片一样
            outputPath: "images/", //图片打包后的地址
            limit: 20480,
            esModule: false,
            // limit属性：当图片大小大于属性值时打包成图片输出到images目录下，否则打包成base64编码的图片注入bundle.js中
            //1024 == 1kb
            //小于20kb时打包成base64编码的图片否则单独打包成图片
          },
        },
      },

      // {
      //   test: /\.css$/,
      //   loader: "style-loader!css-loader",
      // },
      {
        test: /\.css$/,
        use: [
          // "style-loader", // 创建style标签，并将css添加进去
          MiniCssExtractPlugin.loader,
          // "vue-style-loader",
          "css-loader",
        ],
      },
    ],
  },
  plugins: [
    // new webpack.HotModuleReplacementPlugin(),//启用HMR, 会刷新
    // make sure to include the plugin!
    new VueLoaderPlugin(),
    new MiniCssExtractPlugin({
      // filename: "./css/[name].css", // 提取出来的css文件路径以及命名
      // filename: "[name].[hash].css",
      filename: "css/[name].[contenthash].css",
    }),
    new HtmlWebpackPlugin({
      title: "webpack",
      template: "./src/template/index.html", // html模板文件(在文件中写好title、meta等)
      // 输出的路径(包含文件名)
      // filename: "./index.html",
      //自动插入js脚本
      // true body head false 默认为true:script标签位于html文件的 body 底部
      inject: true,
      // 压缩html
      // minify: {
      //   // 移除注释
      //   removeComments: true,
      //   // 不要留下任何空格
      //   collapseWhitespace: true,
      //   // 当值匹配默认值时删除属性
      //   removeRedundantAttributes: true,
      //   // 使用短的doctype替代doctype
      //   useShortDoctype: true,
      //   // 移除空属性
      //   removeEmptyAttributes: true,
      //   // 从style和link标签中删除type="text/css"
      //   removeStyleLinkTypeAttributes: true,
      //   // 保留单例元素的末尾斜杠。
      //   keepClosingSlash: true,
      //   // 在脚本元素和事件属性中缩小JavaScript(使用UglifyJS)
      //   minifyJS: true,
      //   // 缩小CSS样式元素和样式属性
      //   minifyCSS: true,
      //   // 在各种属性中缩小url
      //   minifyURLs: true,
      // },
    }),
    new BundleAnalyzerPlugin({
      analyzerMode: "server",
      analyzerHost: "127.0.0.1",
      analyzerPort: 8886,
      reportFilename: "report.html",
      defaultSizes: "parsed",
      openAnalyzer: false,
      generateStatsFile: false,
      statsFilename: "stats.json",
      statsOptions: null,
      logLevel: "info",
    }),
  ],
  /*
   * 配置webpack-dev-server
   * contentBase：设置基本目录结构
   * compress：是否开启服务器压缩
   * port：配置服务器端口号
   * host：服务器的IP地址，可以使用IP也可以使用localhost
   * open：是否自动打开浏览器
   * hot：是否开启热更新， 启用 HMR
   * hotOnly：是否只开启热更新，如果设置为true,只有热更新，就禁用了自动刷新功能
   * */
  devServer: {
    port: "8888",
    contentBase: path.join(__dirname, "static"), //配置开发服务运行时的文件根目录
    hot:true,//启用 webpack 的模块热替换(热更新)特性：
    host: '0.0.0.0',// 服务器ip地址可以使用localhost 也可以使用ip地址
    // open: process.env.NODE_ENV === 'production' ? true : false,
    // compress: true, //  服务器压缩是否开启
    // hotOnly: true,//尽管html功能没有实现，也不让浏览器刷新
    progress: true, // 编译的进度条
    // historyApiFallback: true,//不跳转**
    // inline: true//实时刷新 **
    // 跨域配置
    //  proxy: {
    //       '/api': {
    //         target: 'https://scm-api-dev.sao.so',
    //         pathRewrite: {'^/api' : '/'},
    //         changeOrigin: true,

    //       }
    //     }
    stats: {
      colors: true,
    },
    watchOptions: {
      aggregateTimeout: 300,
      poll: 1000,
    },
    quiet: false,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers":
        "X-Requested-With,Content-Type,Accept-Ranges",
      "Access-Control-Allow-Methods":
        "GET,HEAD,POST,PUT,DELETE,TRACE,OPTIONS,PATCH",
    },
    host: "127.0.0.1",
    proxy: [
      {
        context: ["/api/v1/app-login"],
        target: "https://etest.riselinkedu.com/oauth",
        changeOrigin: true,
        pathRewrite: { "^/home/": "" },
      },
    ],
    //  proxy: [{
    //     context: ['/', '/api'],
    //     target: 'https://scm-api-dev.sao.so/',
    //   }]
    // historyApiFallback: true,//开发单页应用时有用，依赖于HTML5 history API，设为true时所有跳转将指向index.html
    // before: function (app, server, compiler) {
    //   app.get('/some/path', function (req, res) {
    //     res.json({ custom: 'response' });
    //   });
    // }
    // before: require('./src/Vue/mock/index.js')
  },
};

// babel 继续完善  没有装npm i bael-polyfill -s  用的core-js https://www.babeljs.cn/docs/babel-polyfill
//eslint  检查完善
// postcss-loader： 进行前缀添加等其他处理 https://www.npmjs.com/package/postcss-loader
// vue-style-loader： 将生成 style 标签，将 css 内容插入 HTML
// post-css完善
// 待完善
// https://webpack.js.org/configuration/devtool/#development
// https://www.webpackjs.com/concepts/
// https://juejin.im/post/5cc2cdc851882525041c6493#heading-1
// hmr有点反过来  https://juejin.im/post/6844903831306928142#heading-20
