import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/home-page.vue'
import LogIn from '@/views/login-page.vue'
const routes = [
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/',
    name: 'Login',
    component: LogIn
  }
]
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})
export default router