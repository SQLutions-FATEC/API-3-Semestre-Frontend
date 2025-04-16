import { APIFailureWrapper, mockFlag } from '@/mock/utils.js';
import { employees } from '@/mock/seeds/employeeSeeds';
import { clockInOut } from '@/mock/seeds/clockInOutSeeds';

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
        const response = employees.find((employee) => employee.id == params.id);

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
