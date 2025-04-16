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
        company: { id: companies[0].id, name: companies[0].name },
        role: { id: roles[0].id, name: roles[0].name },
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
        company: { id: companies[0].id, name: companies[0].name },
        role: { id: roles[1].id, name: roles[1].name },
        datetime_start: '2025-04-16T19:48:05.652Z',
        datetime_end: '2025-04-26T19:48:05.652Z',
      },
      {
        company: { id: companies[1].id, name: companies[1].name },
        role: { id: roles[1].id, name: roles[1].name },
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
        company: { id: companies[2].id, name: companies[2].name },
        role: { id: roles[2].id, name: roles[2].name },
        datetime_start: '2025-04-16T19:48:05.652Z',
        datetime_end: '2025-04-26T19:48:05.652Z',
      },
    ],
  },
  {
    id: 4,
    name: 'Pedro Ribeiro',
    blood_type: 'AB+',
    reg_num: '98632165282',
    birth_date: '22/09/1975',
    contracts: [
      {
        company: { id: companies[0].id, name: companies[0].name },
        role: { id: roles[0].id, name: roles[0].name },
        datetime_start: '2025-04-16T19:48:05.652Z',
        datetime_end: '2025-04-26T19:48:05.652Z',
      },
    ],
  },
  {
    id: 5,
    name: 'Jonas Fernandes',
    blood_type: 'A+',
    reg_num: '98643165432',
    birth_date: '12/04/1972',
    contracts: [
      {
        company: { id: companies[0].id, name: companies[0].name },
        role: { id: roles[0].id, name: roles[0].name },
        datetime_start: '2025-04-16T19:48:05.652Z',
        datetime_end: '2025-04-26T19:48:05.652Z',
      },
    ],
  },
  {
    id: 6,
    name: 'Marco Alcântara',
    blood_type: 'B+',
    reg_num: '98246165432',
    birth_date: '15/05/1970',
    contracts: [
      {
        company: { id: companies[0].id, name: companies[0].name },
        role: { id: roles[0].id, name: roles[0].name },
        datetime_start: '2025-04-16T19:48:05.652Z',
        datetime_end: '2025-04-26T19:48:05.652Z',
      },
    ],
  },
  {
    id: 7,
    name: 'Matheus Paulista',
    blood_type: 'O-',
    reg_num: '28632165432',
    birth_date: '22/10/1980',
    contracts: [
      {
        company: { id: companies[0].id, name: companies[0].name },
        role: { id: roles[0].id, name: roles[0].name },
        datetime_start: '2025-04-16T19:48:05.652Z',
        datetime_end: '2025-04-26T19:48:05.652Z',
      },
    ],
  },
  {
    id: 8,
    name: 'Miguel Silva',
    blood_type: 'AB-',
    reg_num: '99332165432',
    birth_date: '21/12/1982',
    contracts: [
      {
        company: { id: companies[0].id, name: companies[0].name },
        role: { id: roles[0].id, name: roles[0].name },
        datetime_start: '2025-04-16T19:48:05.652Z',
        datetime_end: '2025-04-26T19:48:05.652Z',
      },
    ],
  },
  {
    id: 9,
    name: 'Thiago Rocha',
    blood_type: 'A+',
    reg_num: '98722165432',
    birth_date: '04/02/1984',
    contracts: [
      {
        company: { id: companies[0].id, name: companies[0].name },
        role: { id: roles[0].id, name: roles[0].name },
        datetime_start: '2025-04-16T19:48:05.652Z',
        datetime_end: '2025-04-26T19:48:05.652Z',
      },
    ],
  },
  {
    id: 10,
    name: 'Maria Santos',
    blood_type: 'O-',
    reg_num: '98631234432',
    birth_date: '22/06/1990',
    contracts: [
      {
        company: { id: companies[0].id, name: companies[0].name },
        role: { id: roles[0].id, name: roles[0].name },
        datetime_start: '2025-04-16T19:48:05.652Z',
        datetime_end: '2025-04-26T19:48:05.652Z',
      },
    ],
  },
];

export { employees };
