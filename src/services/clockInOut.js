import api from './api';

const clockInOut = {
  get: (params = { page: 1, size: 10 }) =>
    api.get('/movimentacoes/search', { params }),
};

export default clockInOut;
