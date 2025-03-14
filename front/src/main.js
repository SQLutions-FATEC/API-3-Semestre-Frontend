import { createApp } from 'vue';
import '@/styles/main.scss';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from '@/router/router';
import { makeServer } from '../mirage.config';

const app = createApp(App);

app.use(router);
app.use(createPinia());

if (process.env.NODE_ENV === 'development') {
  makeServer();
}

app.mount('#app');
