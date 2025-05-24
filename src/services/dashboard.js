import api from './api';

const dashboard = {
  getByCompany: (companyId, startDate, endDate) =>
    api.get(
      `/analytics?companyId=${companyId}&start_date=${startDate}&end_date=${endDate}`
    ),
};

export default dashboard;
