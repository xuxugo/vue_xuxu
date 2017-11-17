// 1 导入 vue
import Vue from 'vue'
// 2 导入 vuex
import Vuex from 'vuex'
// 安装 vuex 插件
Vue.use(Vuex)

// 进入页面从 localstorage 中取出存储的商品数据
const cart = JSON.parse(localStorage.getItem('cart')) || []

const store = new Vuex.Store({

  state: {
    cart
  },

  // 用来操作数据的方法

  mutations: {
    addGoods(state, payload) {

      const isExist = state.cart.some(item => {
        item.id = item.id - 0
        payload.id = payload.id - 0

        // 注意：item.id 和 payload.id 类型的问题，又可能是字符串有可能是数值
        if(item.id === payload.id) {
          item.count += payload.count
          return true
        }
      })

      // 没有的情况
      if(!isExist) {
        // state.cart.push( payload )
        state.cart.push( payload )
      }

      // 处理state中的cart后，将数据存储到 localstorage 中
      localStorage.setItem('cart', JSON.stringify(state.cart))
    },


    changeCart(state, payload) {
      state.cart.some(item => {
        if(item.id == payload.id) {
          item.count = payload.count
          return true
        }
      })

      localStorage.setItem('cart', JSON.stringify(state.cart))
    },

    del(state, id) {
      state.cart.some((item, index) => {
        if(item.id == id) {
          state.cart.splice(index, 1)
          return true
        }
      })

      localStorage.setItem('cart', JSON.stringify(state.cart))
    }
  }
})

export default store