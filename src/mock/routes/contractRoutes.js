import { APIFailureWrapper, mockFlag } from '@/mock/utils.js';
import { roles } from '@/mock/seeds/roleSeeds';
import { employees } from '@/mock/seeds/employeeSeeds';
import contracts from '../seeds/contractSeeds';
import { companies } from '../seeds/companySeeds';

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
          errorMessage: 'Erro ao listar os contratos',
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
        const body = JSON.parse(requestBody);

        const newRole = { id: roles.length + 1, name: body.role };
        roles.push(newRole);

        return APIFailureWrapper({
          content: null,
          errorMessage: 'Erro ao adicionar o contrato',
        });
      },
    },
    'on'
  ),
  mockFlag(
    {
      method: 'put',
      url: '/contracts/:id',
      result: ({ params, requestBody }) => {
        const body = JSON.parse(requestBody);

        let edittedContract;
        contracts.forEach((contract) => {
          if (contract.id == params.id) {
            contract.company = companies.find(
              (company) => company.id == body.company.id
            );

            edittedContract = contract;
          }
        });

        return APIFailureWrapper({
          content: edittedContract,
          errorMessage: 'Erro ao editar o contrato',
        });
      },
    },
    'on'
  ),
];
export default contractRoutes;
