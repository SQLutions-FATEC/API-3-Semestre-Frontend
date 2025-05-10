<script>
import { onMounted, ref } from 'vue';
import { Cascader } from 'ant-design-vue';
import company from '@/services/company';
import dashboard from '@/services/dashboard';

export default {
  name: 'Dashboard',

  components: {
    'a-cascader': Cascader,
  },

  setup() {
    const clockInQtt = ref(0);
    const clockOutQtt = ref(0);
    const companies = ref([]);
    const companyOptions = ref([]);
    const selectedCompanyId = ref(null);

    const fetchCompanies = async () => {
      try {
        const { data } = await company.get();
        companies.value = data;
        companyOptions.value = data.map((item) => ({
          label: item.name,
          value: item.id,
          data: item,
          key: item.id,
        }));
      } catch (error) {
        console.error(error);
      }
    };

    const fetchDailyRegisters = async () => {
      try {
        const { data } = await dashboard.getDailyRegisters(
          selectedCompanyId.value
        );
        return data;
      } catch (error) {
        console.error(error);
      }
    };

    const fetchEmployeesByGender = async () => {
      try {
        const { data } = await dashboard.getEmployeesByGender(
          selectedCompanyId.value
        );
        return data;
      } catch (error) {
        console.error(error);
      }
    };

    const fetchHoursWorkedByRole = async () => {
      try {
        const { data } = await dashboard.getHoursWorkedByRole(
          selectedCompanyId.value
        );
        return data;
      } catch (error) {
        console.error(error);
      }
    };

    const handleCompanyChange = (value, selectedOptions) => {
      if (value && selectedOptions.length) {
        selectedCompanyId.value = value;
      }
    };

    onMounted(async () => {
      await fetchCompanies();
      selectedCompanyId.value = companies.value[0].id;
      const [dailyRegisters, hoursWorkedByRole, employeesByGender] =
        await Promise.all([
          fetchDailyRegisters(),
          fetchHoursWorkedByRole(),
          fetchEmployeesByGender(),
        ]);
      if (dailyRegisters.status === 'fulfilled') {
        clockInQtt.value = dailyRegisters.value.clockIn;
        clockOutQtt.value = dailyRegisters.value.clockOut;
      }
      if (hoursWorkedByRole.status === 'fulfilled') {
      }
      if (employeesByGender.status === 'fulfilled') {
      }
    });

    return {
      clockInQtt,
      clockOutQtt,
      companyOptions,
      handleCompanyChange,
      selectedCompanyId,
    };
  },
};
</script>

<template>
  <div class="dashboard">
    <div class="dashboard__header">
      <h1>Dashboard</h1>
      <a-cascader
        v-model:value="selectedCompanyId"
        placeholder="Empresa"
        style="width: 300px"
        :options="companyOptions"
        :showSearch="{
          filter: (inputValue, path) =>
            path.some((option) =>
              option.label.toLowerCase().includes(inputValue.toLowerCase())
            ),
        }"
        @change="handleCompanyChange"
      />
    </div>
    <div class="dashboard__content">
      <div class="daily-registers">
        <span>{{ clockInQtt }}</span>
        <span>{{ clockOutQtt }}</span>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.dashboard {
  padding: $spacingXxl 0px;

  .dashboard__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: $spacingXxl;

    h1 {
      @include heading(large);
    }
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
