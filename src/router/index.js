import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import UserMainView from '../views/UserMainView.vue'
import UserInfoView from '../views/UserInfoView.vue'
import TestRecordView from '../views/TestRecordView.vue'
import ConsultationMainView from '../views/ConsultationMainView.vue'
import DocumentRecordView from '../views/DocumentRecordView.vue'
import TestMainView from '../views/TestMainView.vue'
import OrderView from '../views/OrderView.vue'

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
  {
    path:'/consultation',
    name:'consultation',
    component:ConsultationMainView,
  },
  {
    path: '/documentRecord',
    name: 'documentRecord',
    component: DocumentRecordView,
  },
  {
    path: '/test',
    name: 'test',
    component: TestMainView,
  },
  {
    path: '/order',
    name: 'order',
    component: OrderView,
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),routes
})

export default router