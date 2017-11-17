<template>
  <div class="mui-numbox" data-numbox-min="1">
    <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
    <input id="test" class="mui-input-numbox" type="number" v-model="initCount" @change="changeNum" ref="num">
    <button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
  </div>
</template>

<script>


export default {
  props: ['initCount', 'id'],

  mounted() {
    // 初始化 组件
    this.$mui('.mui-numbox').numbox()
  },

  methods: {
    changeNum() {
      const count = this.$refs.num.value - 0

      this.$store.commit('changeCart', { id: this.id, count })
    }
  }
}
</script>

<style scoped>
  .mui-numbox {
    height: 26px;
  }
</style>
