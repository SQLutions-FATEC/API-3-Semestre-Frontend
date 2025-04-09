import { APIFailureWrapper, mockFlag } from '@/mock/utils.js';
import { employees } from '@/mock/seeds/employeeSeeds';
import { errorMessages } from 'vue/compiler-sfc';

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
        const response = employees.find((employee) => employee.id = params.id);

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
          employee_name: body.employee_name,
          employee_birth_date: body.employee_birth_date,
          employee_blood_type: body.employee_blood_type,
          employee_role: body.employee_role,
          company: body.company,
          employee_rn: body.employee_rn,
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
];

export default employeeRoutes;
