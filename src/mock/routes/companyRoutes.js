import { APIFailureWrapper, mockFlag } from '@/mock/utils.js';

const companyRoutes = [
  mockFlag(
    {
      method: 'post',
      url: '/company',
      result: () => {
        return APIFailureWrapper({
          content: {},
          errorMessage: 'Erro ao criar empresa',
        });
      },
    },
    'on'
  ),
];

export default companyRoutes;
