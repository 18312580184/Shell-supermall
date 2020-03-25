<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";

export default {
  name: "Scroll",
  props: {
    probeType: { type: Number, default: 0 },
    pullUpLoad: { type: Boolean, default: false }
  },
  data() {
    return { scroll: null };
  },
  mounted() {
    //创建bscroll对象
    this.scroll = new BScroll(this.$refs.wrapper, {
      click: true, // 一定要把click设置为true 否则better-scroll里面内容的点击事件无效
      probeType: this.probeType, // 这里拿到的是Home传过来的probeType
      pullUpLoad: this.pullUpLoad //Home传过来true确定需要上啦加载
    });

    //监听滚动的位置
    if (this.probeType === 2 || this.probeType === 3) {
      this.scroll.on("scroll", position => {
        this.$emit("scroll", position);
      });
    }

    //监听到底部了
    if (this.pullUpLoad) {
      this.scroll.on("pullingUp", () => {
        this.$emit("pullingUp"); //到底部了 发出去事件
      });
    }
  },
  methods: {
    //封装回到顶部
    scrollTo(x, y, time = 520) {
      this.scroll && this.scroll.scrollTo(x, y, time);
    },

    refresh() {
      this.scroll && this.scroll.refresh();
    },

    // 第二次加载...
    finishPullUp() {
      this.scroll && this.scroll.finishPullUp();
    },

    getScrollY() {
      return this.scroll ? this.scroll.y : 0;
    }
  }
};
</script>

<style scoped></style>
