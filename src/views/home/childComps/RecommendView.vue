<template>
  <!-- 先来个根 推荐视图 recommendView -->
  <div class="recommend">
    <div class="recommend-item" v-for="item in recommends" :key="item.index">
      <a :href="item.link">
        <img :src="item.image" />
        <div>{{ item.title }}</div>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: "RecommendView",
  props: {
    recommends: {
      type: Array,
      default() {
        return [];
      }
    }
  }
};
</script>

<style scoped>
.recommend {
  font-size: 12px;
  text-align: center;
  display: flex;
  padding: 10px 0 24px; /* 上 左=右 下 */
  border-bottom: 10px solid #e6e6fa;
}

.recommend-item {
  flex: 1;
}

.recommend-item img {
  width: 65px;
  height: 65px;
  margin-bottom: 10px;
}
</style>
