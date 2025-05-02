import { APIFailureWrapper, mockFlag } from '@/mock/utils.js';
import { roles } from '@/mock/seeds/roleSeeds';
import { employees } from '@/mock/seeds/employeeSeeds';

const contractRoutes = [
  mockFlag(
    {
      method: 'get',
      url: '/contracts/employee/:employee_id',
      result: ({ params }) => {
        const selectedEmployee = employees.find(
          (employee) => employee.id == params.employee_id
        );
        const response = selectedEmployee.contracts;

        return APIFailureWrapper({
          content: response,
          errorMessage: 'Erro ao listar as funções',
        });
      },
    },
    'on'
  ),
  mockFlag(
    {
      method: 'post',
      url: '/contracts',
      result: ({ requestBody }) => {
        const requestObj = JSON.parse(requestBody);

        const newRole = { id: roles.length + 1, name: requestObj.role };
        roles.push(newRole);

        return APIFailureWrapper({
          content: null,
          errorMessage: 'Erro ao adicionar a função',
        });
      },
    },
    'on'
  ),
];
export default contractRoutes;
