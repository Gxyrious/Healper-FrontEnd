import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import UserMainView from '../views/UserMainView.vue'
import UserInfoView from '../views/UserInfoView.vue'
import TestRecordView from '../views/TestRecordView.vue'

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
  {
    path:'/userInfo',
    name:'userInfo',
    component:UserInfoView,
  },
  {
    path:'/testRecord',
    name:'testRecord',
    component:TestRecordView,
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),routes
})

export default router