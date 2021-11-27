import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/style/index.scss'
import global from './utils/global'
import 'wowjs/css/libs/animate.css'

// tetris
import '@/components/tetris/tools/unit/const';
import '@/components/tetris/tools/control';
import { subscribeRecord } from '@/components/tetris/tools/unit';
subscribeRecord(store); // 将更新的状态记录到localStorage

Vue.use(global)
Vue.config.productionTip = false

Vue.prototype.$bus = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
