import api from './api';

const photo = {
  getByEmployee: (employeeId) =>
    api.get(`/photos/file/employee/${employeeId}`, {
      responseType: 'blob',
    }),
  create: (payload) =>
    api.post('/photos/upload', payload, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }),
};

export default photo;
