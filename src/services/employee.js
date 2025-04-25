import api from './api';

const employee = {
  get: (employeeId) => api.get(`/employee/${employeeId}`),
  getAll: () => api.get('/employee'),
  create: (payload) => {
    return api.post('/employee', {
      ...payload,
      profile_image: payload.profile_image_base64
        ? `employee_${Date.now()}_profile.jpg`
        : null,
    });
  },
  edit: (payload) => {
    return api.put(`/employee/${payload.employee_id}`, {
      ...payload,
      profile_image: payload.profile_image_base64
        ? `employee_${payload.employee_id}_profile.jpg`
        : null,
    });
  },

  delete: (employeeId) => api.delete(`/employee/${employeeId}`),
};

export default employee;
