import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import UserMainView from '../views/UserMainView.vue'

const routes = [
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterView
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