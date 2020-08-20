const path = require("path");
//path.resolve() 方法会把一个路径或路径片段的序列解析为一个绝对路径。
const VueLoaderPlugin = require("vue-loader/lib/plugin");
// const ExtractTextPlugin = require('extract-text-webpack-plugin')     //打包的css拆分,将一部分抽离出来  webpack4不支持这种了
const MiniCssExtractPlugin = require("mini-css-extract-plugin"); //css抽离出来
const HtmlWebpackPlugin = require("html-webpack-plugin"); //将html打包
function resolve(dir) {
  return path.join(__dirname, dir);
}
console.log(path.resolve(__dirname, "111111111111111111111")); //物理地址拼接
module.exports = {
  mode: "development",
  entry: "./src/main.js", //入口
  output: {
    //输出
    path: path.resolve(__dirname, "dist"), //输出的路径
    filename: "[name].[hash:7].js",
    // 主要文件为hash,引入的css文件为contentHash,第三方库为chunkHash
    // filename: "bundle.js", //输出的文件名
  },
  // 配置别名，增加加载速度
  resolve: {
    // Webpack 解析扩展名的配置
    extensions: [".js", "jsx", ".vue", ".json"],
    alias: {
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
  ],
};

// babel 继续完善  没有装npm i bael-polyfill -s  用的core-js https://www.babeljs.cn/docs/babel-polyfill
//eslint  检查完善
// postcss-loader： 进行前缀添加等其他处理 https://www.npmjs.com/package/postcss-loader
// vue-style-loader： 将生成 style 标签，将 css 内容插入 HTML
// post-css完善
