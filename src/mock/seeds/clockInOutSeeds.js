import { companies } from '@/mock/seeds/companySeeds';
import { employees } from '@/mock/seeds/employeeSeeds';

const initialClockInOut = [
  {
    id: 1,
    employee: {
      id: employees[0].id,
      name: employees[0].name,
      register_number: employees[0].register_number,
    },
    company: { id: companies[0].id, name: companies[0].name },
    role_name: 'Açougueiro',
    date_time_in: '2025-03-01 07:58',
    date_time_out: '2025-03-01 16:40',
    worked_hours: '8.7',
  },
  {
    id: 2,
    employee: {
      id: employees[1].id,
      name: employees[1].name,
      register_number: employees[1].register_number,
    },
    company: { id: companies[0].id, name: companies[0].name },
    role_name: 'Caixa',
    date_time_in: '2025-03-01 08:02',
    date_time_out: '2025-03-01 16:03',
    worked_hours: '8.0',
  },
  {
    id: 3,
    employee: {
      id: employees[2].id,
      name: employees[2].name,
      register_number: employees[2].register_number,
    },
    company: { id: companies[1].id, name: companies[1].name },
    role_name: 'Engenheiro Civil',
    date_time_in: '2025-03-01 08:15',
    date_time_out: '2025-03-01 10:06',
    worked_hours: '1.85',
  },
  {
    id: 4,
    employee: {
      id: employees[3].id,
      name: employees[3].name,
      register_number: employees[3].register_number,
    },
    company: { id: companies[2].id, name: companies[2].name },
    role_name: 'Analista Financeiro',
    date_time_in: '2025-03-01 08:30',
    date_time_out: '2025-03-01 18:20',
    worked_hours: '9.8',
  },
  {
    id: 5,
    employee: {
      id: employees[4].id,
      name: employees[4].name,
      register_number: employees[4].register_number,
    },
    company: { id: companies[1].id, name: companies[1].name },
    role_name: 'Arquiteto',
    date_time_in: '2025-03-01 09:00',
    date_time_out: '2025-03-01 14:35',
    worked_hours: '5.5',
  },
  {
    id: 6,
    employee: {
      id: employees[0].id,
      name: employees[0].name,
      register_number: employees[0].register_number,
    },
    company: { id: companies[0].id, name: companies[0].name },
    role_name: 'Açougueiro',
    date_time_in: '2025-03-01 12:05',
    date_time_out: '2025-03-01 17:00',
    worked_hours: '4.9',
  },
  {
    id: 7,
    employee: {
      id: employees[1].id,
      name: employees[1].name,
      register_number: employees[1].register_number,
    },
    company: { id: companies[0].id, name: companies[0].name },
    role_name: 'Caixa',
    date_time_in: '2025-03-01 12:30',
    date_time_out: '2025-03-01 21:09',
    worked_hours: '8.6',
  },
  {
    id: 8,
    employee: {
      id: employees[5].id,
      name: employees[5].name,
      register_number: employees[5].register_number,
    },
    company: { id: companies[3].id, name: companies[3].name },
    role_name: 'Desenvolvedor Front-end',
    date_time_in: '2025-03-01 13:15',
    date_time_out: '2025-03-01 20:30',
    worked_hours: '7.2',
  },
  {
    id: 9,
    employee: {
      id: employees[2].id,
      name: employees[2].name,
      register_number: employees[2].register_number,
    },
    company: { id: companies[1].id, name: companies[1].name },
    role_name: 'Engenheiro Civil',
    date_time_in: '2025-03-01 17:45',
    date_time_out: '2025-03-01 22:03',
    worked_hours: '4.3',
  },
  {
    id: 10,
    employee: {
      id: employees[6].id,
      name: employees[6].name,
      register_number: employees[6].register_number,
    },
    company: { id: companies[4].id, name: companies[4].name },
    role_name: 'Gerente de Vendas',
    date_time_in: '2025-03-02 08:10',
    date_time_out: '2025-03-02 13:30',
    worked_hours: '5.3',
  },
  {
    id: 11,
    employee: {
      id: employees[7].id,
      name: employees[7].name,
      register_number: employees[7].register_number,
    },
    company: { id: companies[2].id, name: companies[2].name },
    role_name: 'RH Assistente',
    date_time_in: '2025-03-02 08:20',
    date_time_out: '2025-03-02 16:11',
    worked_hours: '7.8',
  },
  {
    id: 12,
    employee: {
      id: employees[8].id,
      name: employees[8].name,
      register_number: employees[8].register_number,
    },
    company: { id: companies[1].id, name: companies[1].name },
    role_name: 'Engenheiro Elétrico',
    date_time_in: '2025-03-02 08:45',
    date_time_out: '2025-03-02 17:17',
    worked_hours: '8.5',
  },
  {
    id: 13,
    employee: {
      id: employees[3].id,
      name: employees[3].name,
      register_number: employees[3].register_number,
    },
    company: { id: companies[2].id, name: companies[2].name },
    role_name: 'Analista Financeiro',
    date_time_in: '2025-03-02 17:50',
    date_time_out: '2025-03-02 23:02',
    worked_hours: '5.2',
  },
  {
    id: 14,
    employee: {
      id: employees[9].id,
      name: employees[9].name,
      register_number: employees[9].register_number,
    },
    company: { id: companies[0].id, name: companies[0].name },
    role_name: 'Estoquista',
    date_time_in: '2025-03-03 07:30',
    date_time_out: '2025-03-04 00:08',
    worked_hours: '16.6',
  },
  {
    id: 15,
    employee: {
      id: employees[4].id,
      name: employees[4].name,
      register_number: employees[4].register_number,
    },
    company: { id: companies[1].id, name: companies[1].name },
    role_name: 'Arquiteto',
    date_time_in: '2025-03-03 18:20',
    date_time_out: '',
    worked_hours: '',
  },
  {
    id: 16,
    employee: {
      id: employees[0].id,
      name: employees[0].name,
      register_number: employees[0].register_number,
    },
    company: { id: companies[0].id, name: companies[0].name },
    role_name: 'Açougueiro',
    date_time_in: '',
    date_time_out: '2025-05-14 16:11',
    worked_hours: '',
  },
  {
    id: 17,
    employee: {
      id: employees[1].id,
      name: employees[1].name,
      register_number: employees[1].register_number,
    },
    company: { id: companies[0].id, name: companies[0].name },
    role_name: 'Pintor',
    date_time_in: '2025-08-22 07:45',
    date_time_out: '',
    worked_hours: '',
  },
  {
    id: 18,
    employee: {
      id: employees[6].id,
      name: employees[6].name,
      register_number: employees[6].register_number,
    },
    company: { id: companies[0].id, name: companies[0].name },
    role_name: 'Açougueiro',
    date_time_in: '',
    date_time_out: '2025-11-05 16:42',
    worked_hours: '',
  },
  {
    id: 19,
    employee: {
      id: employees[7].id,
      name: employees[7].name,
      register_number: employees[7].register_number,
    },
    company: { id: companies[0].id, name: companies[0].name },
    role_name: 'Açougueiro',
    date_time_in: '2025-02-18 07:30',
    date_time_out: '',
    worked_hours: '',
  },
  {
    id: 20,
    employee: {
      id: employees[8].id,
      name: employees[8].name,
      register_number: employees[8].register_number,
    },
    company: { id: companies[0].id, name: companies[0].name },
    role_name: 'Açougueiro',
    date_time_in: '',
    date_time_out: '2025-09-30 16:25',
    worked_hours: '',
  },
  {
    id: 21,
    employee: {
      id: employees[9].id,
      name: employees[9].name,
      register_number: employees[9].register_number,
    },
    company: { id: companies[0].id, name: companies[0].name },
    role_name: 'Açougueiro',
    date_time_in: '2025-12-15 07:18',
    date_time_out: '',
    worked_hours: '',
  },
];

let clockInOutData = [...initialClockInOut];
let deletedIds = new Set();

const resetClockInOut = () => {
  clockInOutData = [...initialClockInOut];
  deletedIds = new Set();
};

const getClockInOut = () => {
  return clockInOutData.filter((record) => !deletedIds.has(record.id));
};

const deleteClockInOut = (id) => {
  if (clockInOutData.some((record) => record.id == id)) {
    deletedIds.add(id);
    return true;
  }
  return false;
};

const addClockInOut = (newRecord) => {
  const newId = Math.max(...clockInOutData.map((r) => r.id), 0) + 1;
  clockInOutData.push({ ...newRecord, id: newId });
  return newId;
};

const updateEmployeeInClockInOut = (employeeId, newName) => {
  clockInOutData.forEach((record) => {
    if (record.employee.id == employeeId) {
      record.employee.name = newName;
    }
  });
};

const updateCompanyInClockInOut = (companyId, newName) => {
  clockInOutData.forEach((record) => {
    if (record.company.id == companyId) {
      record.company.name = newName;
    }
  });
};

export {
  addClockInOut,
  deleteClockInOut,
  getClockInOut,
  resetClockInOut,
  updateCompanyInClockInOut,
  updateEmployeeInClockInOut,
};
