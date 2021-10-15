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
    path:'/homePatient',
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
    path: '*',
    name: 'Error',
    component: () => import('../components/errorpage')
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
