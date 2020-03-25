<template>
  <div id="detail">
    <!-- 顶部导航 titleClick传index监听到点击的按钮 -->
    <DetailNavBar ref="nav" class="detail-nav" @titleClick="titleClick" />
    <!-- 滚动条 probeType传入3监听滚动 -->
    <Scroll class="detail-scroll" ref="scroll" :probeType="3" @scroll="contentScroll">
      <!-- 轮播图 -->
      <DetailSwiper :topImages="topImages" />
      <!-- 商品信息 -->
      <DetailBaseInfo :goods="goods" />
      <!-- 商家信息 -->
      <DetailShopInfo :shop="shop" />
      <!-- 商品详细信息 -->
      <DetailGoodsInfo :detailInfo="detailInfo" @imageLoad="imageLoad" />
      <!-- 参数信息 -->
      <DetailParamInfo ref="params" :paramInfo="paramInfo" />
      <!-- 评论信息 -->
      <DetailCommentInfo ref="comment" :commentInfo="commentInfo" />
      <!-- 商品推荐 -->
      <GoodsList ref="recommend" :goods="recommends" />
    </Scroll>
    <!-- 底部工具栏 -->
    <DetailBottomBar @addToCart="addToCart" />
    <!-- 回到顶部 -->
    <BackTop @click.native="backClick" v-show="isShowBackTop" />
    <!-- <Toast :message="message" :show="show" /> -->
  </div>
</template>

<script>
import DetailNavBar from "./childComps/DetailNavBar"; /* 顶部导航 */
import DetailSwiper from "./childComps/DetailSwiper"; /* 轮播图 */
import DetailBaseInfo from "./childComps/DetailBaseInfo"; /* 商品信息 */
import DetailShopInfo from "./childComps/DetailShopInfo"; /* 商家信息 */
import DetailGoodsInfo from "./childComps/DetailGoodsInfo"; /* 商品详细信息 */
import DetailParamInfo from "./childComps/DetailParamInfo"; /* 参数信息 */
import DetailCommentInfo from "./childComps/DetailCommentInfo"; /* 评论信息 */
import DetailBottomBar from "./childComps/DetailBottomBar"; /* 底部工具栏 */

import Scroll from "components/common/scroll/Scroll"; /* 滚动条 */
import GoodsList from "components/content/goods/GoodsList"; /* 商品数据 */
// import Toast from "components/common/toast/Toast";

import { debounce } from "../../common/utils";
import { itemListenerMixin, backTopMixin } from "common/mixin";

import { getDetail, Goods, Shop, GoodsParam, getRecommend } from "network/detail"; /* 获取数据 */

import { mapActions } from "vuex";

export default {
  name: "Detail",
  components: {
    DetailNavBar /* 顶部导航 */,
    DetailSwiper /* 轮播图 */,
    DetailBaseInfo /* 商品信息 */,
    DetailShopInfo /* 商家信息 */,
    Scroll /* 滚动条 */,
    DetailGoodsInfo /* 商品详细信息 */,
    DetailParamInfo /* 参数信息 */,
    DetailCommentInfo /* 评论信息 */,
    GoodsList /* 商品数据 */,
    DetailBottomBar /* 底部工具栏 */
  },
  // 导入公共代码
  mixins: [itemListenerMixin, backTopMixin],
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommends: [],
      itemImgListener: null,
      themeTopYs: [],
      getThemeTopY: null,
      currentIndex: 0
      // message: "",
      // show: false
    };
  },
  created() {
    // 1.params传参不会把参数显示在ip地址上
    this.iid = this.$route.params.iid;

    // 2.根据iid请求详细数据
    getDetail(this.iid).then(res => {
      const data = res.result;

      // 2.获取顶部的图片
      this.topImages = data.itemInfo.topImages;

      // 3.获取商品信息
      this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services);

      // 4.创建店铺信息
      this.shop = new Shop(data.shopInfo);

      // 5.获取商品详细信息
      this.detailInfo = data.detailInfo;

      // 6.获取参数信息
      this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule);

      // 7.获取评论信息
      if (data.rate.cRate !== 0) {
        this.commentInfo = data.rate.list[0];
      }

      // 根据最新的数据 这个函数等DOM渲染完才会调用(图片还没加载完) offsetTop获取到的值不对都是图片的问题
      this.getThemeTopY = debounce(() => {
        this.themeTopYs = [];
        this.themeTopYs.push(0);
        this.themeTopYs.push(this.$refs.params.$el.offsetTop);
        this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
        this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
        this.themeTopYs.push(Number.MAX_VALUE); // 获取最大值
      }, 100);
    });

    // 3.请求推荐数据
    getRecommend().then(res => {
      this.recommends = res.data.list;
    });
  },
  methods: {
    ...mapActions(["addCart"]),
    imageLoad() {
      this.$refs.scroll.refresh();
      this.getThemeTopY();
    },

    addToCart() {
      // 1.获取购物车需要展示的信息
      const product = {};
      product.image = this.topImages[0]; // 轮播图第一张图片
      product.title = this.goods.title; // 标题
      product.desc = this.goods.desc; //描述
      product.price = this.goods.newPrice; //新价格
      product.iid = this.iid;

      this.addCart(product).then(res => {
        this.$toast.show(res, 800);
      });
    },

    // 联动效果 顶部按钮跳到相应内容区域
    titleClick(index) {
      this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 200);
    },

    // 内容对应顶部按钮
    contentScroll(position) {
      // 1.获取y值
      const positionY = -position.y;
      // 2.positionY和主题中值进行对比 themeTopYs是一个数组
      let length = this.themeTopYs.length; //length = 4
      for (let i = 0; i < length - 1; i++) {
        if (this.currentIndex !== i && positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i + 1]) {
          this.currentIndex = i;
          this.$refs.nav.currentIndex = this.currentIndex;
        }
      }
      // 3.是否显示回到顶部
      this.listenShowBackTop(position);
    }
  },
  //mounted 这里面有很多图片还没加载完
  destroyed() {
    this.$bus.$off("itemImageLoad", this.itemImgListener);
  }
};
</script>

<style scoped>
#detail {
  height: 100vh;
  position: relative;
  z-index: 9;
  background-color: #fff;
  overflow: hidden;
}

.detail-nav {
  position: relative;
  z-index: 9;
  background-color: #fff;
}

.detail-scroll {
  height: calc(100% - 44px - 49px);
}
</style>
