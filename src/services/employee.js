import api from './api';

const employee = {
  get: () => api.get('/employee'),
  get: (employeeId) => api.get(`/employee/${employeeId}`),
  create: (payload) =>
    api.post('/employee', {
      employee_name: payload.employee_name,
      employee_birth_date: payload.employee_birth_date,
      employee_blood_type: payload.employee_blood_type,
      employee_role: payload.employee_role,
      company_id: payload.company_id,
      employee_rn: payload.employee_rn,
    }),
    edit: (payload) => api.put(`/employee/${payload.employee_id}`, payload),
};

export default employee;
