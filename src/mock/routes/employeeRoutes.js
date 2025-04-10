import { APIFailureWrapper, mockFlag } from '@/mock/utils.js';
import { employees } from '@/mock/seeds/employeeSeeds';
import { errorMessages } from 'vue/compiler-sfc';
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
          company_id: body.company_id,
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
      method: 'put',
      url: '/employee/:id',
      result: ({ params, requestBody }) => {
        const body = JSON.parse(requestBody);

        const employeeToEdit = employees.find(
          (employee) => employee.id == params.id
        );

        employeeToEdit.employee_name = body.employee_name;
        employeeToEdit.employee_blood_type = body.employee_blood_type;
        employeeToEdit.employee_role = body.employee_role;
        employeeToEdit.company_id = body.company_id;
        employeeToEdit.employee_rn = body.employee_rn;
        employeeToEdit.employee_birth_date = body.employee_birth_date;

        return APIFailureWrapper({
          content: companyToEdit,
          errorMessage: 'Erro ao editar empresa',
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
