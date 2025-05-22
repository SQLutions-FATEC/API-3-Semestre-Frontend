import api from './api';

const dashboard = {
  getByCompany: (companyId) => api.get(`/analytics?companyId=${companyId}`),
};

export default dashboard;
