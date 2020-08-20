// https://eslint.org/docs/user-guide/configuring
// * babel-eslint ：有些代码是没被 eslint 支持的（因为 babel 也是负责这种事情，转译不被支持的 js 语法），所以需要加上这个插件来保持兼容性。官方有详细介绍：https://github.com/babel/babel-eslint
// eslint-plugin-vue （支持对vue文件格式做代码见检查）
// eslint-plugin-html （支持对html文件格式做代码检查）
// 修复命令
//  ./node_modules/.bin/eslint --fix src/media/js/content/originalty/addcreate.js//修复特定某个文件
//  ./node_modules/.bin/eslint --fix ./src/**/**/*.js  //修复所有
//  第三种方式
//  npm run lint
module.exports = {
  root: true,
  parserOptions: {
    parser: "babel-eslint",
  },
  env: {
    browser: true,
    node: true,
  },
  extends: [
    // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
    // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
    "plugin:vue/essential",
    // https://github.com/standard/standard/blob/master/docs/RULES-en.md
    "standard",
    //remark
    // 'standard',//官方推荐标准规则
    // 'plugin:vue/essential',//vue插件的支持规则
    // 'plugin:prettier/recommended',//prettier插件支持的规则
  ],
  // required to lint *.vue files
  plugins: ["vue"],
  // add your custom rules here
  rules: {
    indent: 0,
    "no-console": 2,
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    // //
    semi: "off",
    // "quotes": "warn",
    // "space-before-function-paren": 0,
    quotes: [1, "single"], // 引号类型 `` "" ''
    "space-before-function-paren": [0, "always"], // 函数定义时括号前面要不要有空格
  },
};
