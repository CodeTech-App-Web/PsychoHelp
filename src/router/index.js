import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const routes = [
  {
    path: '/homePsycho',
    name: 'home-psycho',
    component: () => import('../components/homepage-psychologist')
  },
  {
    path:'/homePatient/:id',
    name: 'home-patient',
    component: () => import('../components/homepage-patient')
  },
  {
    path: '/',
    name: 'home-page',
    component: () => import('../components/homepage-patient')
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
    path: '/patientdashboard',
    name: 'patientDBs',
    component: () => import('../components/patient-dashboard')
  },
  {
    path: '*',
    name: 'Error',
    component: () => import('../components/errorpage')
  },
  {
    path: '/videocall',
    name: 'videoCall',
    component: () => import('../components/video-call')
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/listPsychologists',
    name: 'list-psychologists',
    component: ()=> import('../components/list-psychologists')
  },
  {
    path: '/psychologistLogin',
    name: 'psychologist-login',
    component: () => import('../components/login-psychologist')
  },
  {
    path: '/registerPsychologist',
    name: 'psychologist-register',
    component: () => import('../components/register-psychologist')
  },
  {
    path: '/loginPatient',
    name: 'Login-Patient',
    component: () => import('../components/login-patient')
  },
  {
    path: '/signUpPatient',
    name: 'Sign-up-Patient',
    component: () => import('../components/signup-patient')
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import('../views/Home')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
