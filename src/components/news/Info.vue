<template>
  <div>
    <header>
      <h2>{{ info.title }}</h2>
      <p class="mui-ellipsis">
        <span>发表时间：{{ info.add_time | date }}</span>
        <span>点击次数：{{ info.click }}次</span>
      </p>
    </header>
    <div v-html="info.content" class="news-content"></div>


    <Comment :commentId="info.id"></Comment>


  </div>
</template>

<script>

import Comment from '../common/Comment.vue'

export default {
  created() {
    this.getNewsInfo()
  },

  data() {
    return {
      info: {},
      // 表示数据是否加载成功
      isLoaded: false
    }
  },

  methods: {
    getNewsInfo() {


      this.$http.get(`api/getnew/${this.$route.params.id}`)
        .then(res => {
          const body = res.body
          this.isLoaded = true

          if(body.status === 0) {
            this.info = body.message[0]
          }
        })
    }
  },

  // 在当前组件中，通过 components 来注册评论组件
  components: {
    Comment
  }
}
</script>

<style>


header {
  padding: 0 5px;
  border-bottom: 1px solid #ccc;
}

h2 {
  font-size: 18px;
}

.mui-ellipsis {
  color: #26a2ff;
  display: flex;
  justify-content: space-between;
}

.news-content {
  padding: 0 5px;
}
.news-content img {
  width: 100%;
}
</style>
