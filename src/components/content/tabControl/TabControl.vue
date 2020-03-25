<template>
  <!-- 选显卡控件 -->
  <div class="tab-control">
    <div
      v-for="(item, index) in titles"
      :key="item.index"
      class="tab-control-item"
      :class="{ active: index === currentIndex }"
      @click="itemClick(index)"
    >
      <span>{{ item }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "TabControl",
  props: {
    titles: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  data() {
    return {
      currentIndex: 0
    };
  },
  methods: {
    /* 点击按钮 index , 触发监听事件 */
    itemClick(index) {
      /* 监听的值传给定义的变量 currentIndex */
      this.currentIndex = index;
      /* 通过child-Click把index传给父 */
      this.$emit("child-Click", index);
    }
  }
};
</script>

<style scoped>
.tab-control {
  display: flex;
  text-align: center;
  height: 44px;
  line-height: 44px;
  font-size: 15px;
  background: #fff
}
.tab-control-item {
  flex: 1;
}

.tab-control-item span {
  padding: 5px;
}

.active {
  color: #db7093;
}

.active span {
  border-bottom: 3px solid #db7093;
}
</style>
