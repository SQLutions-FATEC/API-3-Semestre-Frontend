import api from './api';

const employee = {
  get: () => api.get('/employee'),
  get: (employeeId) => api.get(`/employee/${employeeId}`),
  create: (params) =>
    api.post('/employee', {
      employee_name: params.employee_name,
      employee_birth_date: params.employee_birth_date,
      employee_blood_type: params.employee_blood_type,
      employee_role: params.employee_role,
      company_id: params.company_id,
      employee_rn: params.employee_rn,
    }),
  edit: (params) => api.put(`/employee/${params.employee_id}`, params),
  delete: (employeeId) => api.delete(`/employee/${employeeId}`),
};

export default employee;
