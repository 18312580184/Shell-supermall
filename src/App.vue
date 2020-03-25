<template>
  <div id="app">
    <!-- 保存页面不被销毁 exclude可以排除掉Detail的缓存 不然拿到的是同一个iid -->
    <keep-alive exclude="Detail">
      <router-view /><!-- 这是站位，显示在TabBar的上面 -->
    </keep-alive>

    <MainTabBar />
  </div>
</template>

<script>
/* 要用tabbar控制选中的是home还是别的页面，所以要配置路由映射关系 */
import MainTabBar from "components/content/mainTabbar/MainTabBar";
export default {
  name: "app",
  components: {
    MainTabBar
  }
};
</script>

<style>
@import "./assets/css/base.css";
</style>
