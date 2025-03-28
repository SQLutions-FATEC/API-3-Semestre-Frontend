import Company from '@/pages/Company/Company.vue';
import Employee from '@/pages/Employee/Employee.vue';
import EmployeeEdit from '@/pages/Employee/EmployeeEdit.vue';
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
    name: 'Employee',
    component: Employee,
  },
  {
    path: '/employee-edit',
    name: 'EmployeeEdit',
    component: EmployeeEdit,
  },
  {
    path: '/company',
    name: 'Company',
    component: Company,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
