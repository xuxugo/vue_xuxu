<template>
  <ul class="mui-table-view mui-table-view-chevron">
    <li class="mui-table-view-cell mui-media" v-for="item in list" :key="item.id">

      <router-link :to="'/home/newsinfo/' + item.id" class="mui-navigate-right">
        <img class="mui-media-object mui-pull-left" :src="item.img_url">
        <div class="mui-media-body">
          {{ item.title }}
          <p class="mui-ellipsis">
            <span>发表时间：{{item.add_time | date}}</span>
            <span>点击次数：{{item.click}}次</span>
          </p>
        </div>
      </router-link>
    </li>
  </ul>
</template>

<script>
// import moment from 'moment'

export default {
  created() {
    this.getNewsList()
  },



  data() {
    return {
      list: []
    }
  },

  methods: {
    getNewsList() {
      this.$http.get('api/getnewslist')
        .then(res => {
          const body = res.body
          console.log(body);
          if(body.status === 0) {
            this.list = body.message
          }
        })
    }
  }
}
</script>

<style scoped>


.mui-table-view-chevron .mui-table-view-cell {
    padding-right: 55px;
}

.mui-ellipsis {
  color: #26a2ff;
  font-size: 12px;
  margin-top: 5px;
  display: flex;
  justify-content: space-between;
}

.mui-table-view-cell {
  padding-bottom: 8px;
}


.mui-table-view .mui-media, .mui-table-view .mui-media-body {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

</style>
