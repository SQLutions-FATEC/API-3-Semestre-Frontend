import { APIFailureWrapper, mockFlag } from '@/mock/utils.js';

const dashboardRoutes = [
  mockFlag(
    {
      method: 'get',
      url: '/dashboard/company/:company_id/daily-registers',
      result: () => {
        const response = { clock_in: 10, clock_out: 5 };

        return APIFailureWrapper({
          content: response,
          errorMessage: 'Erro ao listar os dados diários',
        });
      },
    },
    'on'
  ),
  mockFlag(
    {
      method: 'get',
      url: '/dashboard/company/:company_id/employee-gender',
      result: () => {
        const response = {};

        return APIFailureWrapper({
          content: response,
          errorMessage: 'Erro ao listar os empregados por gênero',
        });
      },
    },
    'on'
  ),
  mockFlag(
    {
      method: 'get',
      url: '/dashboard/company/:company_id/hours-worked-by-role',
      result: () => {
        const response = {};

        return APIFailureWrapper({
          content: response,
          errorMessage: 'Erro ao listar os horas trabalhadas por função',
        });
      },
    },
    'on'
  ),
];

export default dashboardRoutes;
