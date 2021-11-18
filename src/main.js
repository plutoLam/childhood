import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/style/index.scss'
import global from './utils/global'
import 'wowjs/css/libs/animate.css'
Vue.use(global)
Vue.config.productionTip = false

Vue.prototype.$bus = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
