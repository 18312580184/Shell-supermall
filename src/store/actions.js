import {
  ADD_COUNTER,
  ADD_TO_CART
} from './mutation-types'

const actions = {
  addCart(context, payload) {
    return new Promise((resolve, reject) => {
      // 1.查找之前数组中是否有该商品 满足测试函数第一个元素的值
      let oldProduct = context.state.cartList.find(item => item.iid === payload.iid)

      if (oldProduct) {
        // 数量增加
        context.commit('addCounter', oldProduct)
        resolve('当前商品数量+1')
      } else {
        // 添加新商品
        payload.count = 1
        // 添加到购物车
        context.commit('addToCart', payload)
        resolve('添加了新商品')
      }
    })
  }
}
export default actions