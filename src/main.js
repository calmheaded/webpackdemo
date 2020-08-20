// import bar from "./bar";
// bar();
import Vue from "vue";
import App from "./App.vue";
import number from './testhmr'
number()
// 测试热更新
console.log(module.hot,'module.hot')
new Vue({
  el: "#root",
  render: (h) => h(App),
});
