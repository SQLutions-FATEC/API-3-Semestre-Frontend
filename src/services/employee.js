import api from './api';

const employee = {
  get: () => api.get('/employee'),
  get: (employeeId) => api.get(`/employee/${employeeId}`),
  create: (payload) => api.post('/employee', payload),
  edit: (payload) => api.put(`/employee/${payload.employee_id}`, payload),
  delete: (employeeId) => api.delete(`/employee/${employeeId}`),
};

export default employee;
