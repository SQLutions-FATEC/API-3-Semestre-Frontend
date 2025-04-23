import { getClockInOut } from '@/mock/seeds/clockInOutSeeds';
import { companies } from '@/mock/seeds/companySeeds';
import { APIFailureWrapper, mockFlag } from '@/mock/utils.js';
import {
  deleteClockInOut,
  updateCompanyInClockInOut,
} from '../seeds/clockInOutSeeds';

const companyRoutes = [
  mockFlag(
    {
      method: 'get',
      url: '/company',
      result: () => {
        const response = companies;

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
      method: 'get',
      url: '/company/:id',
      result: ({ params }) => {
        const response = companies.find((company) => company.id == params.id);

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
          name: body.name,
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

        companyToEdit.name = body.name;
        companyToEdit.cnpj = body.cnpj;
        companyToEdit.trade_name = body.trade_name;
        updateCompanyInClockInOut(params.id, body.name);

        return APIFailureWrapper({
          content: companyToEdit,
          errorMessage: 'Erro ao editar empresa',
        });
      },
    },
    'on'
  ),
  mockFlag(
    {
      method: 'delete',
      url: '/company/:id',
      result: ({ params }) => {
        let companyToDelete = {};

        const clockInOut = getClockInOut();
        for (let index = clockInOut.length - 1; index >= 0; index--) {
          if (clockInOut[index].company.id == params.id) {
            deleteClockInOut(clockInOut[index].id);
          }
        }

        for (let index = 0; index < companies.length; index++) {
          if (companies[index].id == params.id) {
            companyToDelete = companies.splice(index, 1)[0];
          }
        }

        return APIFailureWrapper({
          content: companyToDelete,
          errorMessage: 'Erro ao deletar empresa',
        });
      },
    },
    'on'
  ),
];

export default companyRoutes;