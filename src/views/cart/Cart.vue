<template>
  <div class="cart">
    <!-- 顶部导航 -->
    <NavBar>
      <div slot="center">购物车({{ cartLength }})</div>
    </NavBar>

    <!-- 商品的列表 -->
    <CartList />

    <!-- 底部汇总 -->
    <CartBottomBar />
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar"; /* 顶部导航 */
import CartList from "./childComps/CartList"; /* 商品的列表 */
import CartBottomBar from "./childComps/CartBottomBar"; /* 底部汇总 */
import { mapGetters } from "vuex";
export default {
  name: "Cart",
  components: {
    NavBar /* 顶部导航 */,
    CartList /* 商品的列表 */,
    CartBottomBar /* 底部汇总 */
  },
  computed: {
    ...mapGetters(["cartLength"])
  }
};
</script>

<style scoped>
.cart {
  height: 100vh;
}
.navbar {
  background-color: var(--color-tint);
  color: #fff;
}
</style>
