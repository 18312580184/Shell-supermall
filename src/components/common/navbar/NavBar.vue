<template>
  <!-- 顶部导航栏 -->
  <div class="navbar">
    <div class="left"><slot name="left"></slot></div>
    <div class="center"><slot name="center"></slot></div>
    <div class="right"><slot name="right"></slot></div>
  </div>
</template>

<script>
export default {
  name: "NavBar"
};
</script>

<style scoped>
.navbar {
  /* 内容间距 */
  letter-spacing: 1px;
  font-weight: 300;
  height: 44px;
  line-height: 44px;
  display: flex;
  /* 内容居中 */
  text-align: center;
  /* 添加阴影 */
  box-shadow: 0 1px 1px rgba(100, 100, 100, 0.1);
}

.left,
.right {
  width: 60px;
}

.center {
  flex: 1;
}
</style>
