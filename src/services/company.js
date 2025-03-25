import api from './api';

const company = {
  get: () => api.get('/company'),
  getById: (companyId) => api.get(`/company/${companyId}`),
  create: (payload) =>
    api.post('/company', {
      company_name: payload.company_name,
      cnpj: payload.cnpj,
      trade_name: payload.trade_name,
    }),
  edit: (payload) => api.put(`/company/${payload.company_id}`, payload),
};

export default company;
