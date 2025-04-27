import { APIFailureWrapper, mockFlag } from '@/mock/utils.js';
import { photos } from '../seeds/photoSeeds';

const photoRoutes = [
  mockFlag(
    {
      method: 'get',
      url: '/photos/file/employee/:employee_id',
      result: ({ params }) => {
        const response = photos.find(
          (photo) => photo.employee_id == params.employee_id
        ).profile_image;

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
      url: '/photos/upload',
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
