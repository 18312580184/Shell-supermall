<template>
  <div class="cart-botton-bar">
    <div class="check-button" @click="checkClick">
      <CheckButton :isChecked="isSelectAll" class="check-img" />
      <span>全选</span>
    </div>

    <div class="price">合计: {{ totalPrice }}</div>

    <div class="calculate" @click="calcClick">计算总价({{ checkLength }})</div>
  </div>
</template>

<script>
import CheckButton from "components/content/checkButton/CheckButton";
import { mapGetters } from "vuex";
export default {
  name: "CartBottomBar",
  components: {
    CheckButton
  },
  computed: {
    // mapGetters可以替换掉前面的路径直接获取到cartList
    ...mapGetters(["cartList"]),
    // 返回商品总价
    totalPrice() {
      return this.cartList
        .filter(item => {
          return item.checked;
        })
        .reduce((preValue, item) => {
          return preValue + item.price.substring(1) * item.count;
        }, 0)
        .toFixed(2);
    },
    // 返回选中商品的长度
    checkLength() {
      return this.cartList.filter(item => item.checked).length;
    },
    // 决定全选按钮选没选中
    isSelectAll() {
      //1 return !this.cartList.filter(item => !item.checked).length;
      if (this.cartList.length === 0) return false;
      return !this.cartList.find(item => !item.checked);
    }
  },
  methods: {
    // 点击全选按钮
    checkClick() {
      if (this.isSelectAll) {
        // 如果isSelectAll方法为true，就把所有商品设置为false
        this.cartList.forEach(item => (item.checked = false));
        // 如果isSelectAll方法为false，就把所有商品设置为true
      } else {
        this.cartList.forEach(item => (item.checked = true));
      }
    },
    calcClick() {
      if (!this.isSelectAll) { 
        this.$toast.show("请选择购买的商品", 800);
      }
    }
  }
};
</script>

<style scoped>
.cart-botton-bar {
  display: flex;
  position: relative;
  height: 40px;
  line-height: 40px;
  background: #eee;
}

.check-button {
  /* 把块级变成行内元素 不然框框会占一行 */
  display: flex;
  align-items: center;
  margin: 0 5px;
}

.check-img {
  width: 20px;
  height: 20px;
  line-height: 16px;
}
.price {
  margin-left: 20px;
  /* 把空余的部分都沾满把按钮挤到最后面 */
  flex: 1;
}

.calculate {
  width: 30%;
  color: #fff;
  background: red;
  text-align: center;
}
</style>
