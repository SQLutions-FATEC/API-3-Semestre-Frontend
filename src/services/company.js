import api from './api';

const company = {
  create: (payload) =>
    api.post('/company', {
      company_name: payload.company_name,
      cnpj: payload.cnpj,
      trade_name: payload.trade_name,
    }),
};

export default company;
