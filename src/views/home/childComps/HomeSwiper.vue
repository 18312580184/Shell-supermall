<template>
  <Swiper>
    <SwiperItem v-for="(item, index) in banners" :key="index">
      <a :href="item.link">
        <img :src="item.image" @load="imageLoad" />
      </a>
    </SwiperItem>
  </Swiper>
</template>

<script>
// 把轮播图 Swiper 和 SwiperItem 封装到 HomeSwiper 里面
import { Swiper, SwiperItem } from "components/common/swiper"; // 轮播图

export default {
  // 引入组件的是父组件，props从Home里提取banners变量
  name: "HomeSwiper",
  props: {
    banners: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  data() {
    return {
      isLoad: false
    };
  },
  components: {
    Swiper,
    SwiperItem
  },
  methods: {
    imageLoad() {
      if (!this.isLoad) {
        this.$emit("swiperImageLoad");
        this.isLoad = true;
      }
    }
  }
};
</script>

<style scoped></style>
