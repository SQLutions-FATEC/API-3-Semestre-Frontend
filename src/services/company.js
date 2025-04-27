import api from './api';

const company = {
  get: () => api.get('/company'),
  getById: (companyId) => api.get(`/company/${companyId}`),
  create: (params) => api.post('/company', params),
  edit: (params) => api.put(`/company/${params.id}`, params),
  delete: (companyId) => api.delete(`/company/${companyId}`),
};

export default company;
