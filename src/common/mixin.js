import { debounce } from "./utils"
import BackTop from "components/content/backTop/BackTop"; /* 回到顶部 */

// 抽取公共代码 itemListenerMixin
export const itemListenerMixin = {
  mounted() {
    const refresh = debounce(this.$refs.scroll.refresh, 100);

    this.itemImgListener = () => {
      refresh();
    };

    this.$bus.$on("itemImageLoad", this.itemImgListener);
  }
}

// 抽取公共代码 BackTop
export const backTopMixin = {
  components: {
    BackTop
  },
  data() {
    return {
      isShowBackTop: false /* 是否显示箭头 */
    };
  },
  methods: {
    // 回到顶部
    backClick() {
      this.$refs.scroll.scrollTo(0, 0);
    },
    listenShowBackTop(position) {
      // 是否显示回到顶部 如果position.y大于1000为true 赋值给isshowbacktop
      this.isShowBackTop = -position.y > 1000;

      // 界定tabControl是否吸顶(position:fixed)
      this.isTabFixed = -position.y > this.tabOffsetTop;
    }
  }
}