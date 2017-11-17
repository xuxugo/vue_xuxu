<template>
  <div>
    <div class="comment">
      <h2>发表评论</h2>
      <textarea cols="30" rows="3" placeholder="请输入评论内容，最多输入120字" v-model="content"></textarea>
      <mt-button type="primary" size="large" @click="commit">发表评论</mt-button>

      <ul class="comment-list">
        <li class="comment-item" v-for="(item, index) in list" :key="index">
          <div class="comment-item-header">
            <span>第{{index + 1}}楼</span>
            <span>用户：{{item.user_name}}</span>
            <span>发表时间：{{item.add_time | date}}</span>
          </div>
          <div class="comment-item-content">
            {{ item.content }}
          </div>
        </li>
      </ul>
      <mt-button type="primary" size="large" plain @click="loadMore">加载更多</mt-button>
    </div>
  </div>
</template>

<script>
import { Toast } from 'mint-ui'

export default {

  props: ['commentId'],

  created() {
    this.getComments()
  },

  data() {
    return {
      // 评论数据
      list: [],
      // 当前评论页码
      curPage: 1,
      // 获取评论内容
      content: ''
    }
  },

  methods: {
    getComments() {
      if(!this.commentId) {
        return
      }

      const url = `api/getcomments/${this.commentId}?pageindex=${this.curPage}`

      this.$axios.get(url)
        .then(res => {
          const body = res.data
          if(body.status === 0) {
            this.list = [...this.list, ...body.message]
          }
        })
    },

    loadMore() {
      // 加载更多评论数据
      this.curPage++

      this.getComments()
    },

    commit() {
      // 发表评论
      if(this.content.trim() === '') {
        return Toast({
          message: '评论内容不能为空',
          duration: 1000
        })
      }

      const url = `api/postcomment/${this.commentId}`
      this.$axios.post(url, `content=${this.content}`)
        .then(res => {
          const body = res.data
          if(body.status === 0) {
            this.list.unshift({
              add_time: new Date(),
              content: this.content,
              user_name: '匿名用户'
            })

            Toast({
              message: '恭喜，发表成功',
              duration: 500
            })

            this.content = ''
          }
        })
    }
  },

  watch: {
    commentId() {
      this.getComments()
    }
  }
}
</script>

<style lang="scss" scoped>
  .comment {
    padding: 10px;
    border-top: 1px solid #ccc;

    h2 {
      font-size: 20px;
    }
  }

  .comment-list {
    list-style: none;
    padding: 0;
    margin: 0;
    margin-top: 5px;

    .comment-item-header {
      display: flex;
      justify-content: space-between;
      font-size: 13px;
      background-color: #eee;
      line-height: 26px;
      align-items: center;
    }

    .comment-item-content {
      padding: 10px;
      font-size: 14px;
    }
  }
</style>
