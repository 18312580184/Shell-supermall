<template>
  <div class="goods">
    <GoodsListItem v-for="item in goods" :key="item.index" :goodsItem="item" />
  </div>
</template>

<script>
import GoodsListItem from "./GoodsListItem";
export default {
  name: "GoodsList",
  components: {
    GoodsListItem
  },
  props: {
    /* 从Home父组件接收到的goods[pop].list数据 */
    goods: {
      type: Array,
      default() {
        return [];
      }
    }
  }
};
</script>

<style scoped>
.goods {
  display: flex;
  flex-wrap: wrap;  /* 在必要的时候拆行或拆列 */
  justify-content: space-around;/* 均等分 */
  padding: 6px;
}
</style>
