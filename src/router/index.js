import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import UserMainView from '../views/UserMainView.vue'
import UserInfoView from '../views/UserInfoView.vue'
import ScaleRecordView from '../views/ScaleRecordView.vue'
import ConsultationMainView from '../views/ConsultationMainView.vue'
import DocumentRecordView from '../views/DocumentRecordView.vue'
import ScaleMainView from '../views/ScaleMainView.vue'
import OrderView from '../views/OrderView.vue'
import ScaleDetailView from '../views/ScaleDetailView.vue'
import ConsultantMainView from '../views/ConsultantMainView.vue'
import ConsultantInfoView from '../views/ConsultantInfoView.vue'
import SummaryAdviceEditor from '../views/SummaryAdviceEditor.vue'
import ChatView from '../views/ChatView.vue'
import ScaleResultView from '../views/ScaleResultView.vue'
//import ArchiveDetail from '../views/ArchiveDetail.vue'
import ConsultantOrderView from '../views/ConsultantOrderView.vue'

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
    path: '/main',
    name: 'main',
    component: UserMainView,
  },
  {
    path: '/userInfo',
    name: 'userInfo',
    component: UserInfoView,
  },
  {
    path: '/scaleRecord',
    name: 'scaleRecord',
    component: ScaleRecordView,
  },
  {
    path: '/consultation',
    name: 'consultation',
    component: ConsultationMainView,
  },
  {
    path: '/documentRecord',
    name: 'documentRecord',
    component: DocumentRecordView,
  },
  {
    path: '/scale',
    name: 'scale',
    component: ScaleMainView,
  },
  {
    path: '/order',
    name: 'order',
    component: OrderView,
  },
  {
    path: '/scaleDetail',
    name: 'scaleDetail',
    component: ScaleDetailView,
  },
  {
    path: '/consultantMain',
    name: 'consultantMain',
    component: ConsultantMainView,
  },
  {
    path: '/consultantInfo',
    name: 'consultantInfo',
    component: ConsultantInfoView,
  },
  {
    path: '/SAEditor',
    name: 'SAEditor',
    component: SummaryAdviceEditor,
  },
  {
    path: '/chat',
    name: 'chat',
    component: ChatView,
  },
  {
    path: '/scaleResult',
    name: 'scaleResult',
    component: ScaleResultView,
  },
  //{
  //  path: '/archiveDetail',
  //  name: 'archiveDetail',
  //  component: ArchiveDetail,
  //},
  {
    path: '/consultantOrder',
    name: 'consultantOrder',
    component: ConsultantOrderView,
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL), routes
})

export default router