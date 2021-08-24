import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/home-page.vue'
import LogIn from '@/views/login-page.vue'
import Account from '@/views/personal-account.vue'

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
  },
  {
    path: '/account',
    name: 'Account',
    component: Account
  },

]
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})
export default router