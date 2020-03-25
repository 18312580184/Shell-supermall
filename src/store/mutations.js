// 把对应的方法名换了
import {
  ADD_COUNTER,
  ADD_TO_CART
} from './mutation-types'

// mutaitions的唯一目的是修改stste的状态
// mutaitions中的每个方法尽可能完成的事情比较单一

export default {

  // 商品个数增加
  addCounter(state, payload) {
    payload.count++
  },
  // 添加到购物车
  addToCart(state, payload) {
    // 商品预先选定默认状态
    payload.checked = true
    state.cartList.push(payload)
  }
}