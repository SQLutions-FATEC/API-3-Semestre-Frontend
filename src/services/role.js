import api from './api';

const role = {
  get: () => api.get('/role'),
  create: (params) => api.post('/role', params),
};

export default role;
