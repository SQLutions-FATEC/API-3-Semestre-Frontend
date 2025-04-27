import api from './api';

const employee = {
  get: (employeeId) => api.get(`/employee/${employeeId}`),
  getAll: () => api.get('/employee'),
  create: (payload) => api.post('/employee', payload),
  edit: (payload) => api.put(`/employee/${payload.id}`, payload),
  delete: (employeeId) => api.delete(`/employee/${employeeId}`),
};

export default employee;