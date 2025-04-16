import { companies } from './companySeeds';
import { roles } from './roleSeeds';

const employees = [
  {
    id: 1,
    name: 'José Amaral',
    blood_type: 'A+',
    reg_num: '54376523455',
    birth_date: '02/02/1993',
    contracts: [
      {
        company_id: companies[0].id,
        role_id: roles[0].id,
        datetime_start: '2025-04-16T19:48:05.652Z',
        datetime_end: '2025-04-26T19:48:05.652Z',
      },
    ],
  },
  {
    id: 2,
    name: 'Robson Fernandes',
    blood_type: 'O+',
    reg_num: '98632165432',
    birth_date: '26/08/1974',
    contracts: [
      {
        company_id: companies[0].id,
        role_id: roles[1].id,
        datetime_start: '2025-04-16T19:48:05.652Z',
        datetime_end: '2025-04-26T19:48:05.652Z',
      },
      {
        company_id: companies[1].id,
        role_id: roles[1].id,
        datetime_start: '2025-04-16T19:48:05.652Z',
        datetime_end: '2025-04-26T19:48:05.652Z',
      },
    ],
  },
  {
    id: 3,
    name: 'Welington',
    blood_type: 'B-',
    reg_num: '76542397833',
    birth_date: '12/11/1998',
    contracts: [
      {
        company_id: companies[2].id,
        role_id: roles[2].id,
        datetime_start: '2025-04-16T19:48:05.652Z',
        datetime_end: '2025-04-26T19:48:05.652Z',
      },
    ],
  },
];

export { employees };
