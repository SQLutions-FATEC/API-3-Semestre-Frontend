import { companies } from '@/mock/seeds/companySeeds';

const clockInOut = [
  {
    id: 1,
    register_number: '12345678910',
    employee: { id: 1, name: 'Teste Testerson' },
    company: { id: companies[0].id, name: companies[0].company_name },
    role_name: 'Açougueiro',
    direction: 'Entrada',
    date_time: '2025-02-01 08:10',
  },
  {
    id: 2,
    register_number: '10987654321',
    employee: { id: 2, name: 'Exemplo Exemplorson' },
    company: { id: companies[1].id, name: companies[1].company_name },
    role_name: 'Engenheiro',
    direction: 'Saída',
    date_time: '2025-02-02 15:26',
  },
  {
    id: 3,
    register_number: '65432178910',
    employee: { id: 3, name: 'John Doe' },
    company: { id: companies[2].id, name: companies[2].company_name },
    role_name: 'Investidor',
    direction: 'Entrada',
    date_time: '2025-02-03 10:53',
  },
];

export { clockInOut };
