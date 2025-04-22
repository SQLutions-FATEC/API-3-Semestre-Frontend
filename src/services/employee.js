import api from './api';

const employee = {
  get: (employeeId) => api.get(`/employee/${employeeId}`),
  getAll: () => api.get('/employee'),
  create: (payload) => {
    const formData = new FormData();
    Object.keys(payload).forEach(key => {
      if (key === 'profile_image_base64') {
        const byteString = atob(payload[key]);
        const mimeString = 'image/jpeg';
        const ab = new ArrayBuffer(byteString.length);
        const ia = new Uint8Array(ab);
        for (let i = 0; i < byteString.length; i++) {
          ia[i] = byteString.charCodeAt(i);
        }
        const blob = new Blob([ab], {type: mimeString});
        formData.append('profile_image', blob, 'profile.jpg');
      } else if (key !== 'profile_image_base64') {
        formData.append(key, payload[key]);
      }
    });
    return api.post('/employee', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  },
  delete: (employeeId) => api.delete(`/employee/${employeeId}`),
};

export default employee;