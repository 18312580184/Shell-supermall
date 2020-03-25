import Toast from "./Toast"

// 这里的obj在main.js导入变成toast
const obj = {}

obj.install = function (Vue) {
  // 1.创建组价构造器
  const toastContrustor = Vue.extend(Toast)

  // 2.new的方式，根据组件构造器，可以创建出来一个组件对象
  const toast = new toastContrustor()

  // 3.将组件对象，手动挂载到div
  toast.$mount(document.createElement('div'))

  // 4.toast.$el对应的就是div
  document.body.appendChild(toast.$el)

  // 默认有Vue参数，把Toast组件导入进来把toast对象传给Vue.prototype.$toast
  Vue.prototype.$toast = toast
}

export default obj