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
  mockFlag(
    {
      method: 'post',
      url: '/role',
      result: (params) => {
        console.log(params);
        const newRole = { id: params.id, name: params.name };
        roles.push(newRole);

        return APIFailureWrapper({
          content: null,
          errorMessage: 'Erro ao adicionar a função',
        });
      },
    },
    'on'
  ),
];
export default roleRoutes;
