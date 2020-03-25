<template>
  <div id="home">
    <!-- 顶部导航 -->
    <NavBar class="home-nav"><div slot="center">购物街</div></NavBar>
    <!-- 中部导航栏 -->
    <TabControl :titles="['流行', '新款', '精选']" @child-Click="tabClick" ref="tabControl1" class="tab-control" v-show="isTabFixed" />
    <!-- 上拉加载 :pullUpLoad="true" -->
    <scroll class="content" ref="scroll" :probe-type="3" @scroll="contentScroll" :pullUpLoad="true" @pullingUp="loadMore">
      <!-- 轮播图 -->
      <HomeSwiper :banners="banners" @swiperImageLoad="swiperImageLoad" />
      <!-- 推荐视图 -->
      <RecommendView :recommends="recommends" />
      <!-- 功能视图 -->
      <FeatureView />
      <!-- (中)选项卡控件 tabClick接收子组件传过来的值 -->
      <TabControl :titles="['流行', '新款', '精选']" @child-Click="tabClick" ref="tabControl2" />
      <!-- 商品列表 默认值 goods的pop.list传给子组件 -->
      <GoodsList :goods="showGoods" />
    </scroll>
    <!-- 回到顶部 -->
    <BackTop @click.native="backClick" v-show="isShowBackTop" />
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar"; // 顶部导航
import Scroll from "components/common/scroll/Scroll"; // 滚动条
import BackTop from "components/content/backTop/BackTop"; ///回到顶部
import TabControl from "components/content/tabControl/TabControl"; // (中)选项卡控件
import GoodsList from "components/content/goods/GoodsList"; // 商品列表

import HomeSwiper from "./childComps/HomeSwiper"; // 轮播图
import RecommendView from "./childComps/RecommendView"; /// 推荐视图
import FeatureView from "./childComps/FeatureView"; // 功能视图

import { getHomeMultidata, getHomeGoods } from "network/home"; // 网络请求方法
import { debounce } from "../../common/utils"; //防抖函数
import { itemListenerMixin, backTopMixin } from "common/mixin";

export default {
  name: "Home",
  components: {
    NavBar, // 顶部导航,
    HomeSwiper, // 轮播图
    RecommendView, // 推荐视图
    FeatureView, // 功能视图
    TabControl, // (中)选项卡控件
    GoodsList, // 商品列表
    Scroll, // 滚动条
    BackTop // 回到顶部
  },
  mixins: [itemListenerMixin, backTopMixin],
  data() {
    return {
      banners: [], // 保存轮播图数据
      recommends: [], // 保存推荐视图数据
      currentType: "pop",
      tabOffsetTop: 0,
      isTabFixed: false,
      saveY: 0,
      itemImgListener: null,
      goods: {
        // 保存商品数据
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] }
      }
    };
  },
  // 公式放计算属性里
  computed: {
    showGoods() {
      return this.goods[this.currentType].list;
    }
  },

  // 离开时
  deactivated() {
    this.saveY = this.$refs.scroll.getScrollY();
    // 2.取消全局事件的监听
    this.$bus.$off("itemImageLoad", this.itemImgListener);
  },

  // 进来时
  activated() {
    this.$refs.scroll.refresh();
    this.$refs.scroll.scrollTo(0, this.saveY, 0);
  },

  // 组件创建就发送网络请求，所以要写生命周期函数create
  created() {
    // 网络请求相关方法
    this.getHomeMultidata();
    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");
  },

  destroyed() {
    this.$bus.$off("itemImageLoad", this.itemImgListener);
  },

  methods: {
    // 1.事件监听相关方法
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell";
          break;
      }
      this.$refs.tabControl1.currentIndex = index;
      this.$refs.tabControl2.currentIndex = index;
    },

    // 2.监听回到顶部
    backClick() {
      this.$refs.scroll.scrollTo(0, 0);
    },

    // 3.显示隐藏箭头
    contentScroll(position) {
      // 3.是否显示回到顶部
      this.listenShowBackTop(position);
    },

    // 4.网络请求相关方法
    getHomeMultidata() {
      getHomeMultidata().then(res => {
        // res->data 获取到所有数据 nanner recommend··· 存到自己定义的变量里避免系统回收掉
        // 1.获取多条数据
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      });
    },

    // 5.拿到Home数据
    getHomeGoods(type) {
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page).then(res => {
        this.goods[type].list.push(...res.data.list);
        this.goods[type].page += 1;

        // 完成了上拉加载更多 第2次加载更多就要这个方法
        this.$refs.scroll.finishPullUp();
      });
    },

    // 6.到了底部-->加载更多
    loadMore() {
      this.getHomeGoods(this.currentType);
      // 浏览器在图片没异步加载完时候就把可滚动高度设置死，所有会产生图片滚动不了的bug
      // 在图片异步加载完时在给它刷新一次
    },

    // 7.组件有一个$el属性 可以拿到组件中的元素(元素才有OffsetTop)
    swiperImageLoad() {
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
    }
  }
};
</script>

<style scoped>
#home {
  height: 100vh;
  position: relative;
}

/* 顶部导航栏的样式 */
.home-nav {
  background: var(--color-tint);
  color: #fff;
}

.content {
  overflow: hidden;

  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}

.tab-control {
  position: relative;
  z-index: 9;
}
</style>
