import { companies } from './companySeeds';
import { roles } from './roleSeeds';

const dailyRegisters = {
  [companies[0].id]: {
    clockInQtt: 10,
    clockOutQtt: 5,
  },
  [companies[1].id]: {
    clockInQtt: 7,
    clockOutQtt: 1,
  },
  [companies[2].id]: {
    clockInQtt: 9,
    clockOutQtt: 0,
  },
  [companies[3].id]: {
    clockInQtt: 10,
    clockOutQtt: 10,
  },
  [companies[4].id]: {
    clockInQtt: 1,
    clockOutQtt: 0,
  },
};

const weeklyHoursWorkedByRole = {
  [companies[0].id]: [
    {
      role: roles[0].name,
      hoursWorked: 160,
    },
    {
      role: roles[1].name,
      hoursWorked: 156,
    },
    {
      role: roles[2].name,
      hoursWorked: 173,
    },
  ],
  [companies[1].id]: [
    {
      role: roles[0].name,
      hoursWorked: 120,
    },
    {
      role: roles[1].name,
      hoursWorked: 80,
    },
    {
      role: roles[2].name,
      hoursWorked: 200,
    },
  ],
  [companies[2].id]: [
    {
      role: roles[0].name,
      hoursWorked: 100,
    },
    {
      role: roles[1].name,
      hoursWorked: 140,
    },
    {
      role: roles[2].name,
      hoursWorked: 180,
    },
  ],
  [companies[3].id]: [
    {
      role: roles[0].name,
      hoursWorked: 200,
    },
    {
      role: roles[1].name,
      hoursWorked: 160,
    },
    {
      role: roles[2].name,
      hoursWorked: 120,
    },
  ],
  [companies[4].id]: [
    {
      role: roles[0].name,
      hoursWorked: 80,
    },
    {
      role: roles[1].name,
      hoursWorked: 100,
    },
    {
      role: roles[2].name,
      hoursWorked: 140,
    },
  ],
};

const employeesByGender = {
  [companies[0].id]: { male: 3, female: 7 },
  [companies[1].id]: { male: 4, female: 6 },
  [companies[2].id]: { male: 5, female: 5 },
  [companies[3].id]: { male: 6, female: 4 },
  [companies[4].id]: { male: 7, female: 3 },
};

const employeesByShift = {
  [companies[0].id]: [
    {
      shift: 'diurno',
      employees_quantity: 1,
    },
    {
      shift: 'vespertino',
      employees_quantity: 2,
    },
    {
      shift: 'noturno',
      employees_quantity: 7,
    },
  ],
  [companies[1].id]: [
    {
      shift: 'diurno',
      employees_quantity: 2,
    },
    {
      shift: 'vespertino',
      employees_quantity: 4,
    },
    {
      shift: 'noturno',
      employees_quantity: 4,
    },
  ],
  [companies[2].id]: [
    {
      shift: 'diurno',
      employees_quantity: 3,
    },
    {
      shift: 'vespertino',
      employees_quantity: 5,
    },
    {
      shift: 'noturno',
      employees_quantity: 2,
    },
  ],
  [companies[3].id]: [
    {
      shift: 'diurno',
      employees_quantity: 4,
    },
    {
      shift: 'vespertino',
      employees_quantity: 3,
    },
    {
      shift: 'noturno',
      employees_quantity: 3,
    },
  ],
  [companies[4].id]: [
    {
      shift: 'diurno',
      employees_quantity: 5,
    },
    {
      shift: 'vespertino',
      employees_quantity: 4,
    },
    {
      shift: 'noturno',
      employees_quantity: 1,
    },
  ],
};

export {
  dailyRegisters,
  employeesByGender,
  employeesByShift,
  weeklyHoursWorkedByRole,
};
