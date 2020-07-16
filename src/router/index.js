import Vue from 'vue'
import VueRouter from 'vue-router'
import homepage from '../views/homepage.cmp.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: homepage
  },
]

const router = new VueRouter({
  routes
})

export default router
