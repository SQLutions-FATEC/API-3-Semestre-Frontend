import { APIFailureWrapper, mockFlag } from '@/mock/utils.js';
import { employees } from '@/mock/seeds/employeeSeeds';
import { clockInOut } from '@/mock/seeds/clockInOutSeeds';

const employeeRoutes = [
  mockFlag(
    {
      method: 'get',
      url: '/employee',
      result: () => {
        return {
          success: true,
          content: employees,
          errorMessage: null
        };
      },
    },
    'on'
  ),
  mockFlag(
    {
      method: 'get',
      url: '/employee/:id',
      result: ({ params }) => {
        const employee = employees.find(e => e.id == params.id);
        if (!employee) {
          return APIFailureWrapper({
            content: null,
            errorMessage: 'Funcionário não encontrado',
            status: 404
          });
        }
        return {
          success: true,
          content: employee,
          errorMessage: null
        };
      },
    },
    'on'
  ),
  mockFlag(
    {
      method: 'post',
      url: '/employee',
      result: ({ requestBody }) => {
        try {
          const body = JSON.parse(requestBody);

          if (!body.employee_name || !body.company_id || !body.employee_rn) {
            return APIFailureWrapper({
              content: null,
              errorMessage: 'Dados obrigatórios faltando',
              status: 400
            });
          }

          const newId = employees.length > 0 ? Math.max(...employees.map(e => e.id)) + 1 : 1;

          const newEmployee = {
            id: newId,
            employee_name: body.employee_name,
            company_id: body.company_id,
            employee_rn: body.employee_rn,
            profile_image: body.profile_image_base64 ? `employee_${newId}_profile.jpg` : null,
            reg_num: body.employee_rn,
            birth_date: body.employee_birth_date || null,
            blood_type: body.employee_blood_type || null,
            role_id: body.employee_role || null
          };

          employees.push(newEmployee);

          return {
            success: true,
            content: newEmployee,
            errorMessage: null
          };
        } catch (error) {
          return APIFailureWrapper({
            content: null,
            errorMessage: 'Erro ao processar requisição',
            status: 500
          });
        }
      },
    },
    'on'
  ),
  mockFlag(
    {
      method: 'put',
      url: '/employee/:id',
      result: ({ params, requestBody }) => {
        try {
          const body = JSON.parse(requestBody);
          const employeeIndex = employees.findIndex(e => e.id == params.id);

          if (employeeIndex === -1) {
            return APIFailureWrapper({
              content: null,
              errorMessage: 'Funcionário não encontrado',
              status: 404
            });
          }

          const updatedEmployee = {
            ...employees[employeeIndex],
            employee_name: body.employee_name || employees[employeeIndex].employee_name,
            blood_type: body.employee_blood_type || employees[employeeIndex].blood_type,
            role_id: body.employee_role || employees[employeeIndex].role_id,
            company_id: body.company_id || employees[employeeIndex].company_id,
            reg_num: body.employee_rn || employees[employeeIndex].reg_num,
            birth_date: body.employee_birth_date || employees[employeeIndex].birth_date,
            profile_image: body.profile_image_base64
              ? `employee_${params.id}_profile.jpg`
              : employees[employeeIndex].profile_image
          };

          employees[employeeIndex] = updatedEmployee;

          return {
            success: true,
            content: updatedEmployee,
            errorMessage: null
          };
        } catch (error) {
          return APIFailureWrapper({
            content: null,
            errorMessage: 'Erro ao atualizar funcionário',
            status: 500
          });
        }
      },
    },
    'on'
  ),
  mockFlag(
    {
      method: 'delete',
      url: '/employee/:id',
      result: ({ params }) => {
        const employeeIndex = employees.findIndex(e => e.id == params.id);

        if (employeeIndex === -1) {
          return APIFailureWrapper({
            content: null,
            errorMessage: 'Funcionário não encontrado',
            status: 404
          });
        }

        const [deletedEmployee] = employees.splice(employeeIndex, 1);

        // Remove registros de ponto
        for (let i = clockInOut.length - 1; i >= 0; i--) {
          if (clockInOut[i].employee.id == params.id) {
            clockInOut.splice(i, 1);
          }
        }

        return {
          success: true,
          content: deletedEmployee,
          errorMessage: null
        };
      },
    },
    'on'
  ),
];

export default employeeRoutes;