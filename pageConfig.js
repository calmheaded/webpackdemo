const glob = require("glob");
// 可以写一个配置文件读取
const pageConfig = {
    vue: {
      title: "Vue"
    },
    react: {
      title: "react"
    },
    mpvue: {
      title: "小程序"
    }
  };
  try {
    entries = glob("./Project/*/main.js", { sync: true });
  } catch (err) {
    entries = [];
    console.log("读取目录出错！");
    throw err;
  }
  let pages = {};
  let commonConfig = {
    template: "src/template/index.html"
  };
  entries.forEach(page => {
    let name = page.split("/")[2];
    console.log(name,'name')
    pages[name] = {
      entry: "Project/" + name + "/index.js",
      filename: name + ".html",
      title: pageConfig.hasOwnProperty(name) ? pageConfig[name].title : "",
      ...commonConfig
    };
  });
  console.log(entries, "entrys");
  module.exports = pages;