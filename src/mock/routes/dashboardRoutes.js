import { APIFailureWrapper, mockFlag } from '@/mock/utils.js';
import {
  dailyRegisters,
  employeesByGender,
  employeesByShift,
  weeklyHoursWorkedByRole,
} from '@/mock/seeds/dashboardSeeds';
import { getClockInOut } from '@/mock/seeds/clockInOutSeeds';
import contracts from '@/mock/seeds/contractSeeds';
import { employees } from '@/mock/seeds/employeeSeeds';

const dashboardRoutes = [
  mockFlag(
    {
      method: 'get',
      url: '/analytics-summary',
      result: () => {
        // TODO
        const response = {};

        return APIFailureWrapper({
          content: response,
          errorMessage: 'Erro ao listar os dados da view',
        });
      },
    },
    'on'
  ),
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
      url: '/dashboard/company/:company_id/employee-shift',
      result: ({ params }) => {
        const response = employeesByShift[params.company_id];

        return APIFailureWrapper({
          content: response,
          errorMessage: 'Erro ao listar os empregados por turno',
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
  mockFlag(
    {
      method: 'get',
      url: '/dashboard/company/:company_id/without-match-registers',
      result: ({ params }) => {
        const filteredRegisters = getClockInOut().filter(
          (item) => item.company.id == params.company_id
        );

        const response = filteredRegisters
          .filter(
            (item) =>
              (!item.date_time_in && item.date_time_out) ||
              (item.date_time_in && !item.date_time_out)
          )
          .sort((a, b) => {
            const dateA = new Date(a.date_time_in || a.date_time_out);
            const dateB = new Date(b.date_time_in || b.date_time_out);
            return dateB - dateA;
          })
          .slice(0, 5);

        return APIFailureWrapper({
          content: response,
          errorMessage: 'Erro ao listar os registros sem par',
        });
      },
    },
    'on'
  ),
  mockFlag(
    {
      method: 'get',
      url: '/dashboard/company/:company_id/contracts-to-expire',
      result: ({ params }) => {
        const response = contracts
          .filter(
            (contract) =>
              contract.active && contract.company.id == params.company_id
          )
          .sort((a, b) => {
            const dateA = new Date(a.datetime_end);
            const dateB = new Date(b.datetime_end);
            return dateB - dateA;
          })
          .map((contract) => {
            const employee = employees.find((item) =>
              item.contracts.includes(contract)
            );

            return {
              company: { id: contract.company.id, name: contract.company.name },
              employee: {
                name: employee.name,
                register_number: employee.register_number,
              },
              datetime_end: contract.datetime_end,
            };
          })
          .slice(0, 5);

        return APIFailureWrapper({
          content: response,
          errorMessage: 'Erro ao listar os próximos contract a vencer',
        });
      },
    },
    'on'
  ),
];

export default dashboardRoutes;
