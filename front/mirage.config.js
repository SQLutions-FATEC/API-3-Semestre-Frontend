import { createServer } from 'miragejs';
import loginRoutes from '@/mock/routes/loginRoutes';

export function makeServer() {
  if (import.meta.env.MODE === 'development' && !window.server) {
    const routes = [...loginRoutes];

    window.server = createServer({
      models: {},

      routes() {
        this.urlPrefix = 'http://localhost:5173';
        this.namespace = 'api';
        this.timing = 400;

        routes.forEach((route) => {
          this[route.method](route.url, (_, request) => route.result(request));
        });

        this.passthrough();
      },

      seeds() {},
    });

    return window.server;
  }
}
