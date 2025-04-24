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
        const response = employees.map(emp => ({
          ...emp,
          profile_image: (emp.profile_image && !emp.profile_image.startsWith('data:')) ? emp.profile_image : null
        }));

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
        if (response) {
          return APIFailureWrapper({
            content: {
              ...response,
              profile_image: (response.profile_image && !response.profile_image.startsWith('data:')) ? response.profile_image : null
            },
            errorMessage: 'Erro ao listar funcionário',
          });
        }
        return APIFailureWrapper({
          content: null,
          errorMessage: 'Funcionário não encontrado',
          status: 404
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
        const body = JSON.pare(requestBody);

        const newId = employees.length > 0 ? Math.max(...employees.map(e => e.id)) + 1 : 1;

        const newEmployee = {
          id: employees.length + 1,
          employee_name: body.employee_name,
          company_id: body.company_id,
          employee_rn: body.employee_rn,
          profile_image: body.profile_image ? `employee_${newId}_profile.jpg` : null,
          reg_num: body.employee_rn,
          birth_date: body.employee_birth_date,
          blood_type: body.employee_blood_type,
          role_id: body.employee_role
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
        const formData = requestBody;
        const body = Object.fromEntries(formData.entries());

        let updatedEmployee = null;

        employees.forEach((employee) => {
          if (employee.id == params.id) {
            employee.employee_name = body.employee_name;
            employee.blood_type = body.employee_blood_type;
            employee.role_id = body.employee_role;
            employee.company_id = body.company_id;
            employee.reg_num = body.employee_rn;
            employee.birth_date = body.employee_birth_date;

            if (body.profile_image) {
              employee.profile_image = URL.createObjectURL(body.profile_image);
            }

            updatedEmployee = employee;
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
          errorMessage: 'Erro ao deletar funcionário',
        });
      },
    },
    'on'
  ),
];

export default employeeRoutes;

