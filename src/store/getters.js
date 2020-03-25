export default {
  cartLength(state) {
    // 获取不同物品的个数
    return state.cartList.length
  },
  cartList(state) {
    return state.cartList
  }
}