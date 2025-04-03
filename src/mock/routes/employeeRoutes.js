import { APIFailureWrapper, mockFlag } from '@/mock/utils.js';
import { employees } from '@/mock/seeds/employeeSeeds';

const employeeRoutes = [
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
          employee_function: body.employee_function,
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
