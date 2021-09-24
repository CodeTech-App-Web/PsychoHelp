import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const routes = [
  {
    path: '/Homepage',
    name: 'Homepage',
    component: () => import('../components/homepage-patient.vue')
  },
  {
    path: '/',
    name: 'Homeclient',
    component: () => import('../components/homepage-patient.vue')
  },
  {
    path: '/Homepsycho',
    name: 'Homepsycho',
    component: () => import('../components/homepage-psychologist.vue')
  },
  {
    path: '*',
    name: 'Error',
    component: () => import('../components/errorpage')
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
