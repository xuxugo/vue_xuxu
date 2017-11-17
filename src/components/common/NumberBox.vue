<template>
  <div id="numbox" class="mui-numbox" data-numbox-min="1">
    <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
    <input id="test" class="mui-input-numbox" type="number" value="1" @change="changeNum">
    <button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
  </div>
</template>

<script>


export default {
  props: ['maxNum'],

  mounted() {

    this.$mui('#numbox').numbox()
  },

  methods: {
    changeNum() {

      const count = this.$mui('#numbox').numbox().getValue()
      // 触发父组件中的事件
      this.$emit('getCount', count)
    }
  },


  watch: {

    maxNum() {
      this.$mui('#numbox').numbox().setOption('max', this.maxNum)
    }
  }
}
</script>

<style>

</style>
