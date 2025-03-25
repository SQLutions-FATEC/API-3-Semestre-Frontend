import { APIFailureWrapper, mockFlag } from '@/mock/utils.js';
import { companies } from '@/mock/seeds/companySeeds';

const companyRoutes = [
  mockFlag(
    {
      method: 'get',
      url: '/company/:id',
      result: ({ params }) => {
        let response = companies;
        if (!!params) {
          response = response.find((company) => company.id == params.id);
        }

        return APIFailureWrapper({
          content: response,
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
  mockFlag(
    {
      method: 'put',
      url: '/company/:id',
      result: ({ params, requestBody }) => {
        const body = JSON.parse(requestBody);

        const companyToEdit = companies.find(
          (company) => company.id == params.id
        );

        companyToEdit.company_name = body.company_name;
        companyToEdit.cnpj = body.cnpj;
        companyToEdit.trade_name = body.trade_name;

        return APIFailureWrapper({
          content: companyToEdit,
          errorMessage: 'Erro ao editar empresa',
        });
      },
    },
    'on'
  ),
];

export default companyRoutes;
