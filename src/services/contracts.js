import api from './api';

const contract = {
  getByEmployeeId: (employeeId, params = { page: 1, size: 5 }) =>
    api.get(`/contracts/employee/${employeeId}`, { params }),
  create: (params) => api.post('/contracts', params),
  edit: (params) => api.put('/contracts', params),
  inactivate: (contractId) => api.put(`/contracts/${contractId}/inactivate`),
};

export default contract;
