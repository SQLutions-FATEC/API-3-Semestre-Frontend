import api from './api';

const clockInOut = {
  get: (params = { page: 1, size: 10 }) =>
    api.get('/clock_in/search', { params }),
  edit: (params) => api.put(`/clock_in/${params.id}`, params),
};

export default clockInOut;
