import api from './api';

const contract = {
  get: () => api.get('/contracts'),
  create: (params) => api.post('/contracts', params),
};

export default contract;
