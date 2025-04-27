import { APIFailureWrapper, mockFlag } from '@/mock/utils.js';
import { roles } from '@/mock/seeds/roleSeeds';

const photoRoutes = [
  mockFlag(
    {
      method: 'get',
      url: '/photos/:id',
      result: () => {
        const response = roles;

        return APIFailureWrapper({
          content: response,
          errorMessage: 'Erro ao buscar a foto',
        });
      },
    },
    'on'
  ),
  mockFlag(
    {
      method: 'post',
      url: '/photos',
      result: () => {
        return APIFailureWrapper({
          content: null,
          errorMessage: 'Erro ao adicionar a foto',
        });
      },
    },
    'on'
  ),
];
export default photoRoutes;