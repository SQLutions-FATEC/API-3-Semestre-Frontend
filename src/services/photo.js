import api from './api';

const photo = {
  getByEmployee: (employeeId) => api.get(`/photos/file/employee/${employeeId}`),
  create: (payload) =>
    api.post('/photos/upload', payload, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }),
  // create: (payload) => api.post('/photos/upload', payload),
};

export default photo;
