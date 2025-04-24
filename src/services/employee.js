import api from './api';

const employee = {
  get: () => api.get('/employee'),
  get: (employeeId) => api.get(`/employee/${employeeId}`),
  create: (params) => api.post('/employee', params),
  edit: (params) => api.put(`/employee/${params.id}`, params),
  delete: (employeeId) => api.delete(`/employee/${employeeId}`),
};

export default employee;
