import App from './App';

// #ifndef VUE3
import Vue from 'vue'
import './uni.promisify.adaptor'
Vue.config.productionTip = false
Vue.prototype.$bus = new Vue();
App.mpType = 'app'
const app = new Vue({
  ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif
// import Vue from 'vue'
// import App from './App'

// Vue.config.productionTip = false

// // 创建事件总线实例
// const bus = new Vue()

// // 将事件总线挂载到 Vue 的原型上
// Vue.prototype.$bus = bus

// App.mpType = 'app'

// const app = new Vue({
//   ...App
// })

// app.$mount()
