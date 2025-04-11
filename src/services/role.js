import api from './api';

const role = {
  get: () => api.get('/role'),
};

export default role;
