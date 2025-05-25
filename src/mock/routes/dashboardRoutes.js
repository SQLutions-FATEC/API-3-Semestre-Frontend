import { APIFailureWrapper, mockFlag } from '@/mock/utils.js';

const dashboardRoutes = [
  mockFlag(
    {
      method: 'get',
      url: '/analytics/:company_id',
      result: () => {
        const response = {
          company_id: 1,
          company_name: '',
          daily_registers: {},
          employee_count: {},
          employees_by_shift: {},
          expiring_contracts: [],
          hours_worked_by_role: [],
          incomplete_clock_ins: [],
        };

        return APIFailureWrapper({
          content: response,
          errorMessage: 'Erro ao listar os dados da view',
        });
      },
    },
    'on'
  ),
];

export default dashboardRoutes;
