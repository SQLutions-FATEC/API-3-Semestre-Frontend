import { getClockInOut } from '@/mock/seeds/clockInOutSeeds';
import { APIFailureWrapper, mockFlag } from '@/mock/utils.js';
import dayjs from 'dayjs';

const clockInOutRoutes = [
  mockFlag(
    {
      method: 'get',
      url: '/clock_in/search',
      result: ({ queryParams }) => {
        let response = getClockInOut();

        if (queryParams.employee) {
          response = response.filter((item) =>
            item.employee.name
              .toLowerCase()
              .includes(queryParams.employee.toLowerCase())
          );
        } else if (queryParams.company) {
          response = response.filter((item) =>
            item.company.name
              .toLowerCase()
              .includes(queryParams.company.toLowerCase())
          );
        } else if (queryParams.role) {
          response = response.filter((item) =>
            item.role_name
              .toLowerCase()
              .includes(queryParams.role.toLowerCase())
          );
        } else if (queryParams.start_date && queryParams.end_date) {
          response = response.filter((item) => {
            const itemDate = dayjs(item.date_time, 'YYYY-MM-DD HH:mm');
            const startDate = dayjs(
              queryParams.start_date,
              'YYYY-MM-DD HH:mm:ss'
            ).startOf('minute');
            const endDate = dayjs(
              queryParams.end_date,
              'YYYY-MM-DD HH:mm:ss'
            ).endOf('minute');

            return itemDate.isAfter(startDate) && itemDate.isBefore(endDate);
          });
        }

        return APIFailureWrapper({
          content: { items: response, total: response.length },
          errorMessage: 'Erro ao listar movimentações',
        });
      },
    },
    'on'
  ),
  mockFlag(
    {
      method: 'put',
      url: '/clock_in',
      result: ({ requestBody }) => {
        const requestObj = JSON.parse(requestBody);
        const clockInOut = getClockInOut();

        clockInOut.forEach((info) => {
          if (info.register_number == requestObj.register_number) {
            info.date_time = requestObj.clock_in_time;
          }
        });

        return APIFailureWrapper({
          content: null,
          errorMessage: 'Erro ao editar movimentação',
        });
      },
    },
    'on'
  ),
];

export default clockInOutRoutes;
