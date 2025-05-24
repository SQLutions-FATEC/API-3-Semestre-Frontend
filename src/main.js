import App from './App.vue';
import router from '@/router/router';
import Antd from 'ant-design-vue';
import { createApp } from 'vue';
import { makeServer } from '../mirage.config';
import { createPinia } from 'pinia';
import 'ant-design-vue/dist/reset.css';
import '@/styles/antd-overrides.scss';

import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';
dayjs.locale('pt-br');

const app = createApp(App);

app.use(Antd);
app.use(router);
app.use(createPinia());

if (
  process.env.NODE_ENV === 'development' &&
  import.meta.env.VITE_MOCK_ENABLED === 'true'
) {
  makeServer();
}

app.mount('#app');
