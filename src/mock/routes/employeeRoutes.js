import { APIFailureWrapper, mockFlag } from '@/mock/utils.js';
import { employees } from '@/mock/seeds/employeeSeeds';
import { clockInOut } from '@/mock/seeds/clockInOutSeeds';
import { companies } from '@/mock/seeds/companySeeds';
import { roles } from '@/mock/seeds/roleSeeds';

const employeeRoutes = [
  mockFlag(
    {
      method: 'get',
      url: '/employee',
      result: () => {
        const response = employees;

        return APIFailureWrapper({
          content: response,
          errorMessage: 'Erro ao listar os funcionários',
        });
      },
    },
    'on'
  ),
  mockFlag(
    {
      method: 'get',
      url: '/employee/:id',
      result: ({ params }) => {
        const employee = employees.find((employee) => employee.id == params.id);

        if (!employee) return null;

        const response = {
          name: employee.name,
          birth_date: employee.birth_date,
          blood_type: employee.blood_type,
          reg_num: employee.reg_num,
          contracts: employee.contracts.map((contract) => {
            const selectedCompany = companies.find(
              (company) => company.id == contract.company_id
            );
            console.log('selectedCompany', selectedCompany);
            const selectedRole = roles.find(
              (role) => role.id == contract.role_id
            );
            return {
              company: {
                id: selectedCompany.id,
                company_name: selectedCompany.company_name,
              },
              role: {
                id: selectedRole.id,
                name: selectedRole.name,
              },
              datetime_start: contract.datetime_start,
              datetime_end: contract.datetime_end,
            };
          }),
        };

        return APIFailureWrapper({
          content: response,
          errorMessage: 'Erro ao listar funcionário',
        });
      },
    },
    'on'
  ),
  mockFlag(
    {
      method: 'post',
      url: '/employee',
      result: ({ requestBody }) => {
        const body = JSON.parse(requestBody);

        const newEmployee = {
          id: employees.length + 1,
          name: body.name,
          blood_type: body.blood_type,
          reg_num: body.reg_num,
          birth_date: body.birth_date,
          contracts: body.contracts,
        };
        employees.push(newEmployee);

        return APIFailureWrapper({
          content: newEmployee,
          errorMessage: 'Erro ao cadastrar funcionário',
        });
      },
    },
    'on'
  ),
  mockFlag(
    {
      method: 'put',
      url: '/employee/:id',
      result: ({ params, requestBody }) => {
        const body = JSON.parse(requestBody);

        employees.forEach((employee) => {
          if (employee.id == params.id) {
            employee.name = body.name;
            employee.blood_type = body.blood_type;
            employee.reg_num = body.reg_num;
            employee.birth_date = body.birth_date;
            employee.contracts = body.contracts;
          }
        });

        return APIFailureWrapper({
          content: null,
          errorMessage: 'Erro ao editar funcionário',
        });
      },
    },
    'on'
  ),
  mockFlag(
    {
      method: 'delete',
      url: '/employee/:id',
      result: ({ params }) => {
        let employeeToDelete = {};

        for (let index = 0; index < employees.length; index++) {
          if (employees[index].id == params.id) {
            employeeToDelete = employees.splice(index, 1)[0];
          }
        }

        for (let index = clockInOut.length - 1; index >= 0; index--) {
          if (clockInOut[index].employee.id == params.id) {
            clockInOut.splice(index, 1);
          }
        }

        return APIFailureWrapper({
          content: employeeToDelete,
          errorMessage: 'Erro ao deletar empresa',
        });
      },
    },
    'on'
  ),
];

export default employeeRoutes;
