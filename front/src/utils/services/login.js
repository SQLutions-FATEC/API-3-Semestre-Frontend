import api from './api';

const login = {
  login: (email, password) => api.post('/login', { email, password }),
};

export default login;
