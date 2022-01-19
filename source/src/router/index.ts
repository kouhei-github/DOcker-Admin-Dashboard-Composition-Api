import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Dashboard from '../views/Dashboard.vue';
import Profile from '../views/Profile.vue';
import TurnOn from '../views/TurnOn.vue';
import AddInstance from '../views/AddInstance.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/admin',
    name: 'Dashboard',
    redirect: '/admin/dashboard',
    component: Dashboard,
  },
  {
    path: '/admin/dashboard',
    name: 'Dashboard',
    component: Dashboard,
  },
  {
    path: '/admin/profile',
    name: 'Profile',
    component: Profile,
  },
  {
    path: '/admin/aws-on',
    name: 'TurnOn',
    component: TurnOn,
  },
  {
    path: '/admin/add-instance',
    name: 'AddInstance',
    component: AddInstance,
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
