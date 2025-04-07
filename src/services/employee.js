import api from './api';

const employee = {
  create: (payload) =>
    api.post('/employee', {
      employee_name: payload.employee_name,
      employee_birth_date: payload.employee_birth_date,
      employee_blood_type: payload.employee_blood_type,
      employee_function: payload.employee_function,
      company: payload.company,
      employee_rn: payload.employee_rn,
    }),
};

export default employee;
