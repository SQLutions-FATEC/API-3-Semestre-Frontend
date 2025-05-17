import api from './api';

const clockInOut = {
  get: (
    params = { page: params.page, size: params.size, export: params.export }
  ) => api.get('/clock_in/search', { params }),
  edit: (params) => api.put(`/clock_in/${params.id}`, params),
};

export default clockInOut;
