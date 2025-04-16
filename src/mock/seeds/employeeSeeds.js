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
        role: roles[0].id,
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
        role: roles[1].id,
      },
      {
        company_id: companies[1].id,
        role: roles[1].id,
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
        role: roles[2].id,
      },
    ],
  },
];

export { employees };
