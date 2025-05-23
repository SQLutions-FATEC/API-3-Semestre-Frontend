import api from './api';

const company = {
  get: () => api.get('/company'),
  getById: (companyId) => api.get(`/company/${companyId}`),
  getAll: (params = { page: 1, size: 10 }) => api.get('/company', { params }),
  create: (params) => api.post('/company', params),
  edit: (params) => api.put(`/company/${params.id}`, params),
  delete: (companyId) => api.delete(`/company/${companyId}`),
};

export default company;
