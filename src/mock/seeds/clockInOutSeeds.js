import { companies } from '@/mock/seeds/companySeeds';
import { employees } from '@/mock/seeds/employeeSeeds';

const initialClockInOut = [
  {
    id: 1,
    register_number: '20230001',
    employee: { id: employees[0].id, name: employees[0].name },
    company: { id: companies[0].id, name: companies[0].name },
    role_name: 'Açougueiro',
    direction: 'Entrada',
    date_time: '2025-03-01 07:58',
  },
  {
    id: 2,
    register_number: '20230002',
    employee: { id: employees[1].id, name: employees[1].name },
    company: { id: companies[0].id, name: companies[0].name },
    role_name: 'Caixa',
    direction: 'Entrada',
    date_time: '2025-03-01 08:02',
  },
  {
    id: 3,
    register_number: '20230003',
    employee: { id: employees[2].id, name: employees[2].name },
    company: { id: companies[1].id, name: companies[1].name },
    role_name: 'Engenheiro Civil',
    direction: 'Entrada',
    date_time: '2025-03-01 08:15',
  },
  {
    id: 4,
    register_number: '20230004',
    employee: { id: employees[3].id, name: employees[3].name },
    company: { id: companies[2].id, name: companies[2].name },
    role_name: 'Analista Financeiro',
    direction: 'Entrada',
    date_time: '2025-03-01 08:30',
  },
  {
    id: 5,
    register_number: '20230005',
    employee: { id: employees[4].id, name: employees[4].name },
    company: { id: companies[1].id, name: companies[1].name },
    role_name: 'Arquiteto',
    direction: 'Entrada',
    date_time: '2025-03-01 09:00',
  },
  {
    id: 6,
    register_number: '20230001',
    employee: { id: employees[0].id, name: employees[0].name },
    company: { id: companies[0].id, name: companies[0].name },
    role_name: 'Açougueiro',
    direction: 'Saída',
    date_time: '2025-03-01 12:05',
  },
  {
    id: 7,
    register_number: '20230002',
    employee: { id: employees[1].id, name: employees[1].name },
    company: { id: companies[0].id, name: companies[0].name },
    role_name: 'Caixa',
    direction: 'Saída',
    date_time: '2025-03-01 12:30',
  },
  {
    id: 8,
    register_number: '20230006',
    employee: { id: employees[5].id, name: employees[5].name },
    company: { id: companies[3].id, name: companies[3].name },
    role_name: 'Desenvolvedor Front-end',
    direction: 'Entrada',
    date_time: '2025-03-01 13:15',
  },
  {
    id: 9,
    register_number: '20230003',
    employee: { id: employees[2].id, name: employees[2].name },
    company: { id: companies[1].id, name: companies[1].name },
    role_name: 'Engenheiro Civil',
    direction: 'Saída',
    date_time: '2025-03-01 17:45',
  },
  {
    id: 10,
    register_number: '20230007',
    employee: { id: employees[6].id, name: employees[6].name },
    company: { id: companies[4].id, name: companies[4].name },
    role_name: 'Gerente de Vendas',
    direction: 'Entrada',
    date_time: '2025-03-02 08:10',
  },
  {
    id: 11,
    register_number: '20230008',
    employee: { id: employees[7].id, name: employees[7].name },
    company: { id: companies[2].id, name: companies[2].name },
    role_name: 'RH Assistente',
    direction: 'Entrada',
    date_time: '2025-03-02 08:20',
  },
  {
    id: 12,
    register_number: '20230009',
    employee: { id: employees[8].id, name: employees[8].name },
    company: { id: companies[1].id, name: companies[1].name },
    role_name: 'Engenheiro Elétrico',
    direction: 'Entrada',
    date_time: '2025-03-02 08:45',
  },
  {
    id: 13,
    register_number: '20230004',
    employee: { id: employees[3].id, name: employees[3].name },
    company: { id: companies[2].id, name: companies[2].name },
    role_name: 'Analista Financeiro',
    direction: 'Saída',
    date_time: '2025-03-02 17:50',
  },
  {
    id: 14,
    register_number: '20230010',
    employee: { id: employees[9].id, name: employees[9].name },
    company: { id: companies[0].id, name: companies[0].name },
    role_name: 'Estoquista',
    direction: 'Entrada',
    date_time: '2025-03-03 07:30',
  },
  {
    id: 15,
    register_number: '20230005',
    employee: { id: employees[4].id, name: employees[4].name },
    company: { id: companies[1].id, name: companies[1].name },
    role_name: 'Arquiteto',
    direction: 'Saída',
    date_time: '2025-03-03 18:20',
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

export {
  addClockInOut,
  deleteClockInOut,
  getClockInOut,
  resetClockInOut,
  updateEmployeeInClockInOut,
};
