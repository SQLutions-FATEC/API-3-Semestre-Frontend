import { APIFailureWrapper, mockFlag } from '@/mock/utils.js';
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

        const currentEmployee = employees.find(
          (employee) => employee.id == body.employee_id
        );
        currentEmployee.contracts.forEach((contract) => {
          if (contract.active) contract.active = false;
        });

        const newContract = {
          id: contracts.length + 1,
          company: body.company,
          role: body.role,
          date_start: body.date_start,
          date_end: body.date_end,
          active: true,
        };
        contracts.push(newContract);
        currentEmployee.contracts.push(newContract);

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
  mockFlag(
    {
      method: 'put',
      url: '/contracts/:id/inactivate',
      result: ({ params }) => {
        let edittedContract;

        contracts.forEach((contract) => {
          if (contract.id == params.id) {
            contract.active = false;
            edittedContract = contract;
          }
        });

        return APIFailureWrapper({
          content: edittedContract,
          errorMessage: 'Erro ao inativar o contrato',
        });
      },
    },
    'on'
  ),
];
export default contractRoutes;
