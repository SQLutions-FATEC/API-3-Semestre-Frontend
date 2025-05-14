import api from './api';

const dashboard = {
  getContractsToExpire: (companyId) =>
    api.get(`/dashboard/company/${companyId}/contracts-to-expire`),
  getDailyRegisters: (companyId) =>
    api.get(`/dashboard/company/${companyId}/daily-registers`),
  getEmployeesByGender: (companyId) =>
    api.get(`/dashboard/company/${companyId}/employee-gender`),
  getHoursWorkedByRole: (companyId) =>
    api.get(`/dashboard/company/${companyId}/hours-worked-by-role`),
  getSingleRegisters: (companyId) =>
    api.get(`/dashboard/company/${companyId}/without-match-registers`),
};

export default dashboard;
