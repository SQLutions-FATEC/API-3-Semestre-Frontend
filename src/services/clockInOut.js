import api from './api';

const clockInOut = {
  get: (params = { page: 1, size: 10 }) =>
    api.get('/clock_in/search', { params }),
  put: (params) => api.put('/clock_in', params),
};

export default clockInOut;
