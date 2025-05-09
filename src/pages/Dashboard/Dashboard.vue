<script>
import { onMounted } from 'vue';

export default {
  name: 'Dashboard',

  setup() {
    const fetchDailyRegisters = () => {};

    const fetchEmployeesByGender = () => {};

    const fetchHoursWorkedByRole = () => {};

    onMounted(() => {
      const [dailyRegisters, hoursWorkedByRole, employeesByGender] =
        Promise.all(
          fetchDailyRegisters(),
          fetchHoursWorkedByRole(),
          fetchEmployeesByGender()
        );
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
