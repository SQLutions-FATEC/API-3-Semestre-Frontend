import { APIFailureWrapper, mockFlag } from '@/mock/utils.js';
import { companies } from '@/mock/seeds/companySeeds';

const companyRoutes = [
  mockFlag(
    {
      method: 'get',
      url: '/company',
      result: () => {
        return APIFailureWrapper({
          content: companies,
          errorMessage: 'Erro ao listar empresa',
        });
      },
    },
    'on'
  ),
  mockFlag(
    {
      method: 'post',
      url: '/company',
      result: ({ requestBody }) => {
        const body = JSON.parse(requestBody);

        const newCompany = {
          id: companies.length + 1,
          company_name: body.company_name,
          cnpj: body.cnpj,
          trade_name: body.trade_name,
        };
        companies.push(newCompany);

        return APIFailureWrapper({
          content: newCompany,
          errorMessage: 'Erro ao criar empresa',
        });
      },
    },
    'on'
  ),
];

export default companyRoutes;
