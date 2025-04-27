import api from './api';

const photo = {
  get: (employeeId) => api.get(`/photos/${employeeId}`),
  create: (payload) => api.post('/photos', payload),
};

export default photo;