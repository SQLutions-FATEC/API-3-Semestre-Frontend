import Company from '@/pages/Company/Company.vue';
import Dashboard from '@/pages/Dashboard/Dashboard.vue';
import EmployeeHome from '@/pages/Employee/EmployeeHome.vue';
import Home from '@/pages/Home/Home.vue';
import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/employee',
    name: 'EmployeeHome',
    component: EmployeeHome,
  },
  {
    path: '/company/:id?',
    name: 'Company',
    component: Company,
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
