import { APIFailureWrapper, mockFlag } from '@/mock/utils.js';
import { roles } from '@/mock/seeds/roleSeeds';

const roleRoutes = [
  mockFlag(
    {
      method: 'get',
      url: '/role',
      result: () => {
        const response = roles;

        return APIFailureWrapper({
          content: response,
          errorMessage: 'Erro ao listar as funções',
        });
      },
    },
    'on'
  ),
]
export default roleRoutes;