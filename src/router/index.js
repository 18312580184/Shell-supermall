import Vue from 'vue'
import VueRouter from 'vue-router'

const Home = () => import('../views/home/Home')
const Category = () => import('../views/category/Category')
const Cart = () => import('../views/cart/Cart')
const Profile = () => import('../views/profile/Profile')
const Detail = () => import('../views/detail/Detail')

/* 1.安装插件 */
Vue.use(VueRouter)

/* 2.创建路由对象 配置映射关系 */
const routes = [{
  path: '/',
  redirect: '/home'
},
{
  path: '/home',
  component: Home
},
{
  path: '/category',
  component: Category
},
{
  path: '/cart',
  component: Cart
},
{
  path: '/profile',
  component: Profile
},
{
  // 跳转到详情 先配置路由
  path: '/detail/:iid',
  component: Detail
}
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

export default router
/* 根据 tabbar 点击某个页面来切换控制 ip 地址是什么，
   router 通过映射 view 里的页面 ip地址 来完成跳转, */