import { APIFailureWrapper, mockFlag } from '@/mock/utils.js';
import { clockInOut } from '@/mock/seeds/clockInOutSeeds';

const clockInOutRoutes = [
  mockFlag(
    {
      method: 'get',
      url: '/clock_in/search',
      result: () => {
        const response = clockInOut;

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

        clockInOut.forEach((info) => {
          if (info.register_number == requestObj.register_number) {
            info.date_time = requestObj.clock_in_time;
          }
        });

        const response = clockInOut;

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
