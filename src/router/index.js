import Vue from 'vue'
import VueRouter from 'vue-router'
//import NotFound from '@/pages/NotFound'

Vue.use(VueRouter);

import Home from '@/views/home-page.vue'
import LogIn from '@/views/login-page.vue'
import Account from '@/views/personal-account.vue'

const routes = [
  {
    path: '/',
    // name: 'Home',
    component: Home
  },
  {
    path: '/login',
    // name: 'Login',
    component: LogIn
  },
  {
    path: '/account',
    // name: 'Account',
    component: Account
  },
];

const router = new VueRouter({
  mode: 'history',
  //history: createWebHistory(process.env.BASE_URL),
  routes: routes
});

export default router