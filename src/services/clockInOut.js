import api from './api';

const clockInOut = {
  get: (params = { page: 1, size: 10 }) =>
    api.get('/clock_in/search', { params }),
  //remove later
  edit: async (params) => {
    console.log('Edit params:', params);
    try {
      const response = await api.put(`clock_in/${params.id}`, params);
      console.log('Edit response:', response);
      return response;
    } catch (error) {
      console.error('Edit error:', error);
      throw error;
    }
  },
};

export default clockInOut;
