<template>
  <Swiper class="sswiper">
    <!-- 获取到轮播图图片 -->
    <SwiperItem v-for="(item, index) in topImages" :key="index">
      <img :src="item" />
    </SwiperItem>
  </Swiper>
</template>

<script>
import { Swiper, SwiperItem } from "components/common/swiper";

export default {
  name: "DetailSwiper",
  components: {
    Swiper,
    SwiperItem
  },
  props: {
    topImages: {
      type: Array,
      default() {
        return [];
      }
    }
  }
};
</script>

<style scoped>
.sswiper {
  height: 300px;
  overflow: hidden;
}
</style>
