import Vue from 'vue'
import VueRouter from 'vue-router'
const Home = () => import('@/views/Home.vue')
const MessageBoard = () => import('@/views/messageBoard.vue')
const Tetris = () => import('@/views/Tetris.vue')
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
  },
  {
    path: '/tetris',
    name: 'Tetris',
    component: Tetris
  },
]

const router = new VueRouter({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
