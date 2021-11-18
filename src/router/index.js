import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home.vue'
const MessageBoard = () => import('@/views/messageBoard.vue')
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/messageboard',
    name: 'MessageBoard',
    component: MessageBoard
  }
]

const router = new VueRouter({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
