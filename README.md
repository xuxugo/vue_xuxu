# Vue 项目

## 技术
```
vue + vue-router + axios(vue-resource) + vuex
MintUI + MUI
webpack + ES6
```

## 项目依赖
```
---- 开发依赖 ----
npm i -D webpack webpack-dev-server html-webpack-plugin style-loader css-loader sass-loader node-sass url-loader file-loader babel-core babel-loader babel-plugin-transform-runtime babel-preset-es2015 babel-preset-stage-0 vue-loader vue-template-compiler

组件按需加载插件
npm install babel-plugin-component -D
---

---- 项目依赖 ----
npm i -S babel-runtime
npm i -S vue vue-router vue-resource mint-ui
npm i -S mint-ui mui
npm uni -S mui

---

---- 后续安装包 ----
npm i -S axios vuex
npm i -D clean-webpack-plugin extract-text-webpack-plugin optimize-css-assets-webpack-plugin
```

## 项目功能
- 1 App组件（项目入口）搭建
  + header（mint-ui）
  + footer（注意MUI样式覆盖的问题 - tabbar）
  + content（路由的使用，别忘了use注册路由）
- 2 首页
  + 轮播图（mint-ui）
  + 九宫格（grid-default）
- 3 新闻咨询
  + 新闻列表（media-list）
  + 新闻详情
  + 评论
- 4 图片分享
  + 图片列表（tab-top-webview-main）
  + 图片详情（mint-ui）
  + 图片详情预览（npm i -S vue-preview）
- 5 商品购买
  + 商品列表
  + 商品详情（card、numbox）
- 6 购物车
  + 每个商品（card）
  + 开关（mint-ui switch）
  + 购物车商品总数 和 总价
  + 商品删除

```css
/* 文字内容超过长度以后省略号显示 */
.text {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
```

```js
// main.js
// vue-resource 拦截器：
Vue.http.interceptors.push((request, next) => {
  // 请求发送前，调用的回调函数
  let toast = Toast({
    message: '数据加载中...'
  })

  // 请求成功后，调用的回调函数
  next(response => {
    toast.close()
  })
})
```

```css
/* scroll滚动警告的处理方式参考：http://www.jianshu.com/p/baf61adc8667 */
* {
  touch-action: none;
}
```

```js
// vue-router 编程式导航：
// https://router.vuejs.org/zh-cn/essentials/navigation.html
showInfo(id) {
  this.$router.push('/home/photoinfo/' + id)
}
```




## Vuex
> Vuex 是一个专为 Vue.js 应用程序开发的`状态管理`模式。它采用集中式存储管理应用的所有组件的状态，并以相应的规则保证状态以一种可预测的方式发生变化。

- 安装：`npm install vuex --save`
- 此处的状态即：数据（data中的属性）
- 特点：集中式
- vuex中 store 就是数据（state）存储的容器
- 注意：
  + **通过 store.count 来获取仓库中的数据（状态）**
  + **必须通过 mutations 中提供的方法来修改数据（状态）**

```
当一个大型项目功能变得越来越复杂，项目中的组件越来越多
此时，各个组件之间都可能存在相互通讯的问题，如果不处理，那么各个组件之间就会相互传递数据
导致的结果就是，我们项目中的数据就不可预测了。也就是：各个组件相互影响，不知道是哪一个组件在什么情况下修改数据

```
