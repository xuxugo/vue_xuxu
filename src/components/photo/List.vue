<template>
  <div>
    <div id="slider" class="mui-slider mui-fullscreen">
			<div id="sliderSegmentedControl" class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
				<div class="mui-scroll">

					<a class="mui-control-item" :class="{'mui-active': item.id === 0}" href="#" data-wid="tab-top-subpage-1.html" v-for="item in categoryList" :key="item.id" @click.prevent="changeCategory(item.id)">
						{{ item.title }}
					</a>
				</div>
			</div>
		</div>


		<ul class="category-img-list">
			<li class="img-list-item" v-for="item in imgsList" :key="item.id" @click="goPhotoInfo(item.id)">
				<img v-lazy="item.img_url">
				<div>
					<h2>{{ item.title }}</h2>
					<p>{{item.zhaiyao}}</p>
				</div>
			</li>
		</ul>
  </div>
</template>

<script>


export default {
  mounted() {

    this.$mui(".mui-scroll-wrapper").scroll({
      deceleration: 0.0005
    });

    // 获取分类数据
    this.getImgCategory();
    // 获取分类对应的图片列表数据
    this.getImages();
  },

  data() {
    return {
      // 图片分类列表
      categoryList: [],
      // 图片分类id
      id: 0,
      // 分类的图片列表
      imgsList: []
    };
  },

  methods: {
    getImgCategory() {
      // 获取图片分类
      this.$http.get("api/getimgcategory").then(res => {
        const body = res.body;
        if (body.status === 0) {
          // 获取到数据，首先在最前面拼接一个全部分类，id为0（约定好的值）
          this.categoryList = [{ id: 0, title: "全部" }, ...body.message];
        }
      });
    },

    getImages() {
      // 获取指定分类的图片列表数据
      this.$http.get(`api/getimages/${this.id}`).then(res => {
        const body = res.body;

        if (body.status === 0) {
          this.imgsList = body.message;
        }
      });
    },

    changeCategory(id) {

      this.id = id;

      this.getImages();
    },

    goPhotoInfo(id) {
      this.$router.push({ name: 'photoinfo', params: { id } })
    }
  }
};
</script>

<style lang="scss">
.mui-slider-indicator.mui-segmented-control {
  background-color: #fff;
}

.mui-fullscreen {
  position: fixed;
  top: 40px;
  height: 38px;
}

/* scroll滚动警告的处理方式参考：http://www.jianshu.com/p/baf61adc8667 */
* {
  touch-action: none;
}

.category-img-list {
  list-style: none;
  padding: 5px;
  padding-top: 30px;

  .img-list-item {
    position: relative;
    margin-bottom: 5px;

    div {
      position: absolute;
      bottom: 0;
      background-color: rgba(0, 0, 0, 0.2);
      color: #fff;

      h2 {
        font-size: 16px;
      }

      p {
        color: #fff;
        margin-bottom: 0px;
      }
    }

    img {
      display: block;
      width: 100%;
    }
  }
}
</style>
