import api from './api';

const contract = {
  getByEmployeeId: (employeeId) => api.get(`/contracts/employee/${employeeId}`),
  create: (params) => api.post('/contracts', params),
};

export default contract;
