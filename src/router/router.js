import { createRouter, createWebHistory } from 'vue-router';

import Company from '@/pages/Company/Company.vue';

const routes = [
  {
    path: '/',
    name: 'Company',
    component: Company,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
