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
      result: () => {
        const response = {
          clock_in: dailyRegisters.clockInQtt,
          clock_out: dailyRegisters.clockOutQtt,
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
      result: () => {
        const response = employeesByGender;

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
        const response = weeklyHoursWorkedByRole.map((obj) => {
          return {
            role: obj.role,
            hours_worked: obj.hoursWorked,
          };
        });

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
