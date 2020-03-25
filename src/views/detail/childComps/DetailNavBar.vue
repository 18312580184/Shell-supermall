<template>
  <div>
    <NavBar>
      <!-- 顶部导航返回图标 -->
      <div slot="left" class="img-item" @click="backClick">
        <img src="~assets/img/common/back.svg" />
      </div>
      <!-- 获取到 商品, 参数, 评论, 推荐-->
      <div slot="center" class="title">
        <div class="title-item" v-for="(item, index) in titles" :key="index" :class="{ active: index === currentIndex }" @click="titleClick(index)">
          {{ item }}
        </div>
      </div>
    </NavBar>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar"; /* 顶部导航 */
export default {
  name: "DetailNavBar",
  components: {
    NavBar
  },
  data() {
    return {
      titles: ["商品", "参数", "评论", "推荐"],
      currentIndex: 0
    };
  },
  methods: {
    // 顶部导航动态变色
    titleClick(index) {
      this.currentIndex = index;
      // 子传父才能把index发给Detail组件使用
      this.$emit("titleClick", index);
    },

    // 返回到首页
    backClick() {
      this.$router.back();
    }
  }
};
</script>

<style>
.title {
  font-size: 13px;
  display: flex;
}
.title-item {
  flex: 1;
}
.active {
  color: var(--color-high-text);
}
.img-item {
  margin-top: 9px;
}
</style>
