import { request } from './request'

// 获取到详情页数据
export function getDetail(iid) {
  return request({
    url: '/detail',
    params: {
      iid
    }
  })
}

export function getRecommend() {
  return request ({
    url: '/recommend'
  })
}

// 
export class Goods {
  constructor(itemInfo, columns, services) {
    this.title = itemInfo.title /* 标题 */
    this.desc = itemInfo.desc /* 描述 */
    this.newPrice = itemInfo.price /* 价格￥56.64 */
    this.oldPrice = itemInfo.oldPrice /* 旧价格￥59 */
    this.discount = itemInfo.discountDesc /* 折扣 */
    this.columns = columns /* 销量 收藏 默认快递 */
    this.services = services /* logo七十二小时发货 */
    this.realPrice = itemInfo.lowNowPrice /* 现在价格56.64 */
  }
}

export class Shop {
  constructor(shopInfo) {
    this.logo = shopInfo.shopLogo
    this.name = shopInfo.name
    this.fans = shopInfo.cFans
    this.sells = shopInfo.cSells
    this.score = shopInfo.score
    this.goodsCount = shopInfo.cGoods
  }
}

export class GoodsParam {
  constructor(info, rule) {
    // images 可能没有值（某些商品有值 某些没有）
    this.image = info.images ? info.images[0] : '';
    this.infos = info.set;
    this.sizes = rule.tables;
  }
}

