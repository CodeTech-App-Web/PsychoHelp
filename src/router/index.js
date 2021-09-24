import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const routes = [
  {
    path: '/Home',
    name: 'Home',
    component: () => import('../views/Home')
  },
  {
    path:'/',
    name: 'Home-page',
    component: () => import('../components/homepage-patient.vue')
  },
  {
    path: '/HomePage',
    name: 'Home-page',
    component: () => import('../components/homepage-patient.vue')
  },
  {
    path: '/patientProfile',
    name: 'patient-profile',
    component: () => import('../components/patient-profile')
  },
  {
    path: '/psychologistProfile',
    name: 'psychologist-profile',
    component: () => import('../components/psychologist-profile')
  },
  {
    path: '*',
    name: 'Error',
    component: () => import('../components/errorpage')
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
