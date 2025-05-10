<script>
import { onMounted, ref } from 'vue';
import { Cascader } from 'ant-design-vue';
import company from '@/services/company';
import dashboard from '@/services/dashboard';
import DailyRegisters from '@/components/DailyRegisters.vue';
import GraphEmployeesByGender from '@/components/Graphs/GraphEmployeesByGender.vue';
import GraphHoursWorkedByRole from '@/components/Graphs/GraphHoursWorkedByRole.vue';

export default {
  name: 'Dashboard',

  components: {
    'a-cascader': Cascader,
    'daily-registers': DailyRegisters,
    'graph-employees-by-gender': GraphEmployeesByGender,
    'graph-hours-worked-by-role': GraphHoursWorkedByRole,
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
      clockInQtt.value = dailyRegisters.clock_in;
      clockOutQtt.value = dailyRegisters.clock_out;

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
      <daily-registers
        :clock-in-qtt="clockInQtt"
        :clock-out-qtt="clockOutQtt"
      />
      <div class="content__graphs">
        <graph-hours-worked-by-role class="graph-container" />
        <graph-employees-by-gender class="graph-container" />
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

    .content__graphs {
      display: flex;
      gap: $spacingXxl;

      .graph-container {
        background-color: $colorBackgroundNeutral;
        border: 1px solid $colorBorder;
        padding: $spacingXxl;
      }
    }
  }
}
</style>
