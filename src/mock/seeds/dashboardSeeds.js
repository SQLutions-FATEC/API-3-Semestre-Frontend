import { roles } from './roleSeeds';

const dailyRegisters = {
  clockInQtt: 10,
  clockOutQtt: 5,
};

const weeklyHoursWorkedByRole = [
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
];

export { dailyRegisters, weeklyHoursWorkedByRole };
