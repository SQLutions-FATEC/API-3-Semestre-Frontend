import Company from '@/pages/Company/Company.vue';
import Employee from '@/pages/Employee/Employee.vue';
import Home from '@/pages/Home/Home.vue';
import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/employee/:id?',
    name: 'Employee',
    component: Employee,
  },
  {
    path: '/company/:id?',
    name: 'Company',
    component: Company,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
