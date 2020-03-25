import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import toast from 'components/common/toast' /* toast插件封装 */
import FastClick from "fastclick" /* 解决300ms延迟 */
import VueLazyLoad from "vue-lazyload" /* 图片懒加载 */

Vue.config.productionTip = false

/* $bus是一个空的 把Vue实例给$bus */
Vue.prototype.$bus = new Vue()

/* 安装toast插件 */
Vue.use(toast)

/* 解决移动端300ms延迟 */
FastClick.attach(document.body)

/* 使用图片懒加载的插件 */
Vue.use(VueLazyLoad, {
  //占位，图片没显示出来的时候显示占位
  loading: require('./assets/img/common/placeholder.png')
})                                     

new Vue({
  render: h => h(App),
  router,
  store,
}).$mount('#app')
