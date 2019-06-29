import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home.vue'
import login from '@/views/login.vue'
import signup from '@/views/signup.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/signup',
      name: 'signup',
      component: signup
    },
  ]
})
