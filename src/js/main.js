// 1 导入 vue
import Vue from 'vue'

import axios from 'axios'
// 将 axios 添加到 Vue.prototype 中
Vue.prototype.$axios = axios

// 导入 vue-resource
import VueResource from 'vue-resource'
// 安装插件
Vue.use(VueResource)

// 导入 过滤器
import '../filters'


// 使用 MUI，直接导入样式即可

import '../lib/mui/css/mui.min.css'

import mui from '../lib/mui/js/mui.min.js'
// 将 mui 手动挂载到 Vue 的原型中去
Vue.prototype.$mui = mui

// 2 导入 项目的入口组件
import App from '../App.vue'

// --------------------MintUI的配置 开始------------------------
// 从 mint-ui 中导入组件
import { Header, Button, Swipe, SwipeItem, Indicator, Lazyload, Switch } from 'mint-ui'

// 注册组件
Vue.component(Header.name, Header)
Vue.component(Button.name, Button)
Vue.component(Swipe.name, Swipe)
Vue.component(SwipeItem.name, SwipeItem)
Vue.component(Switch.name, Switch)

// 安装lazyload插件
Vue.use(Lazyload)

// --------------------MintUI的配置 结束------------------------

// 导入 VueRouter
import router from '../router'

// 配置 vue-resource 公共请求接口地址
import config from '../config'

axios.defaults.baseURL = config.API_SERVER_URL

// 请求拦截器
axios.interceptors.request.use(function (config) {
  // 所有请求之前都要执行的操作
  if (config.method === 'get') {
    // 所有请求发送之前, 都要执行该函数
    Indicator.open({
      text: '数据加载中...',
      spinnerType: 'fading-circle'
    })
  }

  return config;
}, function (error) {
  // 错误处理

  return Promise.reject(error);
});

// 响应拦截器
axios.interceptors.response.use(function (response) {
  // 所有请求完成后都要执行的操作
  console.log(response);
  if (response.config.method === 'get') {
    // 所有请求完成之后, 都要执行该函数
    Indicator.close()
  }

  return response;
}, function (error) {
  // 错误处理

  return Promise.reject(error);
});



Vue.http.options.root = config.API_SERVER_URL


Vue.http.interceptors.push(function (request, next) {

  if (request.method === 'GET') {

    Indicator.open({
      text: '数据加载中...',
      spinnerType: 'fading-circle'
    })
  }

  next(function (response) {
    if (request.method === 'GET') {
      // 所有请求完成之后, 都要执行该函数
      Indicator.close()
    }
  });
});

// 图片预览插件
import VuePreview from 'vue-preview'
Vue.use(VuePreview)

// 导入 vuex
import store from '../store'

// 3 将Vue实例与 App 挂到一起
const vm = new Vue({
  el: '#app',
  router,
  // 将 vuex 与实例挂到一起
  store,
  render: c => c(App)
})