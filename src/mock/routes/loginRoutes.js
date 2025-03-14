import { APIFailureWrapper, mockFlag } from '@/mock/utils.js';

const loginRoutes = [
  mockFlag(
    {
      method: 'post',
      url: '/login',
      result: () => {
        return APIFailureWrapper({
          content: {
            token: 'mockToken',
            user: {
              name: 'mock',
              email: 'mock@mock.com',
              company: 'Mock Company',
            },
          },
          errorMessage: 'Erro ao realizar o login',
        });
      },
    },
    'on'
  ),
];

export default loginRoutes;
