import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import UserMainView from '../views/UserMainView.vue'

const routes = [
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
    path:'/main',
    name:'main',
    component:UserMainView,
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),routes
})

export default router