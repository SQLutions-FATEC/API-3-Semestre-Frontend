import { getClockInOut } from '@/mock/seeds/clockInOutSeeds';
import { employees } from '@/mock/seeds/employeeSeeds';
import { APIFailureWrapper, mockFlag } from '@/mock/utils.js';
import { companies } from '@/mock/seeds/companySeeds';
import { roles } from '@/mock/seeds/roleSeeds';
import {
  deleteClockInOut,
  updateEmployeeInClockInOut,
} from '../seeds/clockInOutSeeds';

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
          register_number: employee.register_number,
          gender: employee.gender,
          contracts: employee.contracts.map((contract) => {
            const selectedCompany = companies.find(
              (company) => company.id == contract.company.id
            );
            const selectedRole = roles.find(
              (role) => role.id == contract.role.id
            );

            return {
              company: {
                id: selectedCompany.id,
                name: selectedCompany.name,
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
          register_number: body.register_number,
          birth_date: body.birth_date,
          gender: body.gender,
          contracts: contracts.filter((contract) =>
            body.contracts.includes(contract.id)
          ),
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

        let editedEmployee;
        employees.forEach((employee) => {
          if (employee.id == params.id) {
            editedEmployee = employee;
            employee.name = body.name;
            employee.blood_type = body.blood_type;
            employee.register_number = body.register_number;
            employee.birth_date = body.birth_date;
            employee.gender = body.gender;
            updateEmployeeInClockInOut(params.id, body.name);
          }
        });

        return APIFailureWrapper({
          content: editedEmployee,
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

        const clockInOut = getClockInOut();
        for (let index = clockInOut.length - 1; index >= 0; index--) {
          if (clockInOut[index].employee.id == params.id) {
            deleteClockInOut(clockInOut[index].id);
          }
        }

        for (let index = 0; index < employees.length; index++) {
          if (employees[index].id == params.id) {
            employeeToDelete = employees.splice(index, 1)[0];
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
