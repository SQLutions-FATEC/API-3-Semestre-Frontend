import api from './api';

const employee = {
  create: (formData) =>
    api.post('/employee', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }),
  delete: (employeeId) => api.delete(`/employee/${employeeId}`),
};

export default employee;