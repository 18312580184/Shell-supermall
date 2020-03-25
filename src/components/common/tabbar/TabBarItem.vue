<template>
  <div class="tab-bar-item" @click="itemClick">
    <!-- 默认图标 -->
    <div v-if="!isActive"><slot name="item-icon1"></slot></div>
    <!-- 被点击图标 -->
    <div v-else><slot name="item-icon2"></slot></div>
    <!-- 标题 -->
    <div :style="ActiveStyle"><slot name="item-text"></slot></div>
  </div>
</template>

<script>
export default {
  name: "TabBarItem",
  props: {
    path: String,
    ActiveColor: {
      type: String,
      default: "red"
    }
  },
  computed: {
    isActive() {
      // $route 那个路由出于活跃就是指那个  动态决定路径，如果找到相应路径就位true其他三个就位false
      // home -> item1(/home) =true
      // home -> item2(/cart) =false
      // 点击的tabbar匹配path，匹配到就 (！==1)
      return this.$route.path.indexOf(this.path) !== -1;
    },
    ActiveStyle() {
      // 动态来指定Active活跃的 颜色
      return this.isActive ? { color: this.ActiveColor } : {};
    }
  },
  methods: {
    itemClick() {
      // 动态路径
      this.$router.push(this.path);
    }
  }
};
</script>

<style scoped>
.tab-bar-item {
  flex: 1;
  text-align: center;
  height: 49px;
  font-size: 14px;
  color: #707070;
}

.tab-bar-item img {
  width: 24px;
  height: 24px;
  margin-top: 4px;
  vertical-align: middle;
}
</style>
