import { companies } from './companySeeds';
import { roles } from './roleSeeds';

const employees = [
  {
    id: 1,
    name: 'José Amaral',
    blood_type: 'A+',
    reg_num: '54376523455',
    birth_date: '1993-02-02T02:00:00.000+00:00',
    contracts: [
      {
        company: { id: companies[0].id, name: companies[0].name },
        role: { id: roles[0].id, name: roles[0].name },
        datetime_start: '2025-04-16T19:48:05.652+00:00',
        datetime_end: '2025-04-26T19:48:05.652+00:00',
      },
    ],
  },
  {
    id: 2,
    name: 'Robson Fernandes',
    blood_type: 'O+',
    reg_num: '98632165432',
    birth_date: '1974-08-26T02:00:00.000+00:00',
    contracts: [
      {
        company: { id: companies[0].id, name: companies[0].name },
        role: { id: roles[1].id, name: roles[1].name },
        datetime_start: '2025-04-16T19:48:05.652+00:00',
        datetime_end: '2025-04-26T19:48:05.652+00:00',
      },
      {
        company: { id: companies[1].id, name: companies[1].name },
        role: { id: roles[1].id, name: roles[1].name },
        datetime_start: '2025-04-16T19:48:05.652+00:00',
        datetime_end: '2025-04-26T19:48:05.652+00:00',
      },
    ],
  },
  {
    id: 3,
    name: 'Welington',
    blood_type: 'B-',
    reg_num: '76542397833',
    birth_date: '1998-11-12T02:00:00.000+00:00',
    contracts: [
      {
        company: { id: companies[2].id, name: companies[2].name },
        role: { id: roles[2].id, name: roles[2].name },
        datetime_start: '2025-04-16T19:48:05.652+00:00',
        datetime_end: '2025-04-26T19:48:05.652+00:00',
      },
    ],
  },
  {
    id: 4,
    name: 'Pedro Ribeiro',
    blood_type: 'AB+',
    reg_num: '98632165282',
    birth_date: '1975-09-22T02:00:00.000+00:00',
    contracts: [
      {
        company: { id: companies[0].id, name: companies[0].name },
        role: { id: roles[0].id, name: roles[0].name },
        datetime_start: '2025-04-16T19:48:05.652+00:00',
        datetime_end: '2025-04-26T19:48:05.652+00:00',
      },
    ],
  },
  {
    id: 5,
    name: 'Jonas Fernandes',
    blood_type: 'A+',
    reg_num: '98643165432',
    birth_date: '1972-04-12T02:00:00.000+00:00',
    contracts: [
      {
        company: { id: companies[0].id, name: companies[0].name },
        role: { id: roles[0].id, name: roles[0].name },
        datetime_start: '2025-04-16T19:48:05.652+00:00',
        datetime_end: '2025-04-26T19:48:05.652+00:00',
      },
    ],
  },
  {
    id: 6,
    name: 'Marco Alcântara',
    blood_type: 'B+',
    reg_num: '98246165432',
    birth_date: '1970-05-15T02:00:00.000+00:00',
    contracts: [
      {
        company: { id: companies[0].id, name: companies[0].name },
        role: { id: roles[0].id, name: roles[0].name },
        datetime_start: '2025-04-16T19:48:05.652+00:00',
        datetime_end: '2025-04-26T19:48:05.652+00:00',
      },
    ],
  },
  {
    id: 7,
    name: 'Matheus Paulista',
    blood_type: 'O-',
    reg_num: '28632165432',
    birth_date: '1980-10-22T02:00:00.000+00:00',
    contracts: [
      {
        company: { id: companies[0].id, name: companies[0].name },
        role: { id: roles[0].id, name: roles[0].name },
        datetime_start: '2025-04-16T19:48:05.652+00:00',
        datetime_end: '2025-04-26T19:48:05.652+00:00',
      },
    ],
  },
  {
    id: 8,
    name: 'Miguel Silva',
    blood_type: 'AB-',
    reg_num: '99332165432',
    birth_date: '1982-12-21T02:00:00.000+00:00',
    contracts: [
      {
        company: { id: companies[0].id, name: companies[0].name },
        role: { id: roles[0].id, name: roles[0].name },
        datetime_start: '2025-04-16T19:48:05.652+00:00',
        datetime_end: '2025-04-26T19:48:05.652+00:00',
      },
    ],
  },
  {
    id: 9,
    name: 'Thiago Rocha',
    blood_type: 'A+',
    reg_num: '98722165432',
    birth_date: '1984-02-04T02:00:00.000+00:00',
    contracts: [
      {
        company: { id: companies[0].id, name: companies[0].name },
        role: { id: roles[0].id, name: roles[0].name },
        datetime_start: '2025-04-16T19:48:05.652+00:00',
        datetime_end: '2025-04-26T19:48:05.652+00:00',
      },
    ],
  },
  {
    id: 10,
    name: 'Maria Santos',
    blood_type: 'O-',
    reg_num: '98631234432',
    birth_date: '1990-06-22T02:00:00.000+00:00',
    contracts: [
      {
        company: { id: companies[0].id, name: companies[0].name },
        role: { id: roles[0].id, name: roles[0].name },
        datetime_start: '2025-04-16T19:48:05.652+00:00',
        datetime_end: '2025-04-26T19:48:05.652+00:00',
      },
    ],
  },
];

export { employees };
