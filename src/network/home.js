import { request } from "./request";

// 获取首页的网络请求

/* 获取到banner和recommends数据 */
export function getHomeMultidata() {
  return request({
    url: '/home/multidata'
  })
}

/* 获取到goods数据 */
export function getHomeGoods(type, page) {
  return request({
    url: '/home/data',
    params: { type, page }
  })
}
