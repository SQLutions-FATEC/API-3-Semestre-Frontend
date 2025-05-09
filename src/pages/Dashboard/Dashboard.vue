<script>
import { onMounted } from 'vue';

export default {
  name: 'Dashboard',

  setup() {
    const clockInQtt = ref(0);
    const clockOutQtt = ref(0);

    const fetchDailyRegisters = () => {
      try {
        const { data } = await dashboard.getDailyRegisters()
        return data
      } catch (error) {
        console.error(error)
      }
    };

    const fetchEmployeesByGender = () => {
      try {
        const { data } = await dashboard.getEmployeesByGender()
        return data
      } catch (error) {
        console.error(error)
      }
    };

    const fetchHoursWorkedByRole = () => {
      try {
        const { data } = await dashboard.getHoursWorkedByRole()
        return data
      } catch (error) {
        console.error(error)
      }
    };

    onMounted(async () => {
      const [dailyRegisters, hoursWorkedByRole, employeesByGender] =
        await Promise.all(
          fetchDailyRegisters(),
          fetchHoursWorkedByRole(),
          fetchEmployeesByGender()
        );
        if (dailyRegisters.status === 'fulfilled') {
          clockInQtt.value = dailyRegisters.value.clockIn;
          clockOutQtt.value = dailyRegisters.value.clockOut;
        }
        if (hoursWorkedByRole.status === 'fulfilled') {
        }
        if (employeesByGender.status === 'fulfilled') {
        }
    });
    return {};
  },
};
</script>

<template>
  <div class="dashboard">
    <h1>Dashboard</h1>
    <div class="dashboard__content">
      <div class="daily-registers">
        <span>{{ clockIn }}</span>
        <span>{{ clockOut }}</span>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.dashboard {
  padding: $spacingXxl 0px;

  h1 {
    @include heading(large);
  }
  .dashboard__content {
    padding: $spacingXxl 0px;
    display: flex;
    flex-wrap: wrap;
    gap: $spacingXxl;

    .daily-registers {
      padding: $spacingMd $spacingXl;
      background-color: $colorBackgroundNeutral;
      border-radius: $borderRadiusSm;
    }
  }
}
</style>
