import api from './api';

const employee = {
  get: (employeeId) => api.get(`/employee/${employeeId}`),
  getAll: (params = { page: 1, size: 10 }) => api.get('/employee', { params }),
  create: (payload) => api.post('/employee', payload),
  edit: (payload) => api.put(`/employee/${payload.id}`, payload),
  delete: (employeeId) => api.delete(`/employee/${employeeId}`),
};

export default employee;
