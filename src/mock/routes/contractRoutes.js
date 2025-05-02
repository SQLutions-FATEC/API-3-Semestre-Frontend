import { APIFailureWrapper, mockFlag } from '@/mock/utils.js';
import { roles } from '@/mock/seeds/roleSeeds';
import contracts from '../seeds/contractSeeds';

const contractRoutes = [
  mockFlag(
    {
      method: 'get',
      url: '/contracts',
      result: () => {
        const response = contracts;

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
      url: '/contracts',
      result: ({ requestBody }) => {
        const requestObj = JSON.parse(requestBody);

        const newRole = { id: roles.length + 1, name: requestObj.role };
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
export default contractRoutes;
