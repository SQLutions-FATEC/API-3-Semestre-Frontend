import { APIFailureWrapper, mockFlag } from '@/mock/utils.js';
import {
  dailyRegisters,
  employeesByGender,
  weeklyHoursWorkedByRole,
} from '@/mock/seeds/dashboardSeeds';

const dashboardRoutes = [
  mockFlag(
    {
      method: 'get',
      url: '/dashboard/company/:company_id/daily-registers',
      result: ({ params }) => {
        const response = {
          clock_in: dailyRegisters[params.company_id].clockInQtt,
          clock_out: dailyRegisters[params.company_id].clockOutQtt,
        };

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
      result: ({ params }) => {
        const response = employeesByGender[params.company_id];

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
      result: ({ params }) => {
        const response = weeklyHoursWorkedByRole[params.company_id].map(
          (obj) => {
            return {
              role: obj.role,
              hours_worked: obj.hoursWorked,
            };
          }
        );

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
