import api from './api';

const role = {
  get: () => api.get('/role'),
  post: (params) => api.post('/role', params),
};

export default role;
