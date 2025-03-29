import api from './api';

const clockInOut = {
  get: () => api.get('/clock-in-out'),
};

export default clockInOut;
