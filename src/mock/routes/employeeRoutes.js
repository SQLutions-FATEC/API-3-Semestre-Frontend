import { APIFailureWrapper, mockFlag } from '@/mock/utils.js';
import { employees } from '@/mock/seeds/employeeSeeds';
import { clockInOut } from '@/mock/seeds/clockInOutSeeds';

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
