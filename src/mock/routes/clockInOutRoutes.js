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
];

export default clockInOutRoutes;
