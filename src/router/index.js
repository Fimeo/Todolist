import { createRouter, createWebHistory } from 'vue-router'
import store from  '../store'

const ifNotAuthenticated = (to, from, next) => {
  if (!store.getters['account/isLogged']) {
    next()
    return
  }
  next('/')
}

const ifAuthenticated = (to, from, next) => {
  if (store.getters['account/isLogged']) {
    next()
    return
  }
  next('/login')
}

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue'),
    beforeEnter: ifAuthenticated
  },
  {
    path: '/login',
    name: 'login',
    // lazy-loaded when the route is visited.
    component: () => import('../views/Login.vue'),
    beforeEnter: ifNotAuthenticated
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
