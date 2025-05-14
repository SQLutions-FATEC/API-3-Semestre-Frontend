<script>
import { onMounted, ref } from 'vue';
import { Cascader, Spin } from 'ant-design-vue';
import company from '@/services/company';
import dashboard from '@/services/dashboard';
import ContractsToExpire from '@/components/DashboardAlerts/ContractsToExpire.vue';
import DailyRegisters from '@/components/DailyRegisters.vue';
import GraphEmployeesByGender from '@/components/Graphs/GraphEmployeesByGender.vue';
import GraphHoursWorkedByRole from '@/components/Graphs/GraphHoursWorkedByRole.vue';
import WithoutMatchRegisters from '@/components/DashboardAlerts/WithoutMatchRegisters.vue';

export default {
  name: 'Dashboard',

  components: {
    'a-cascader': Cascader,
    'a-spin': Spin,
    'daily-registers': DailyRegisters,
    'contracts-to-expire': ContractsToExpire,
    'graph-employees-by-gender': GraphEmployeesByGender,
    'graph-hours-worked-by-role': GraphHoursWorkedByRole,
    'without-match-registers': WithoutMatchRegisters,
  },

  setup() {
    const clockInQtt = ref(0);
    const clockOutQtt = ref(0);
    const companies = ref([]);
    const companyOptions = ref([]);
    const contractsToExpire = ref([]);
    const employeesGenderObj = ref({});
    const loadingGraphs = ref(true);
    const roleHoursObj = ref({});
    const selectedCompanyId = ref(null);
    const singleRegisters = ref([]);

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

    const fetchContractsToExpire = async () => {
      try {
        const { data } = await dashboard.getContractsToExpire(
          selectedCompanyId.value
        );
        return data;
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

    const fetchSingleRegisters = async () => {
      try {
        const { data } = await dashboard.getSingleRegisters(
          selectedCompanyId.value
        );
        return data;
      } catch (error) {
        console.error(error);
      }
    };

    const fetchAlertsAndGraphsInfos = async () => {
      loadingGraphs.value = true;

      const [
        dailyRegisters,
        hoursWorkedByRole,
        employeesByGender,
        withoutMatchRegisters,
        contractsAboutToExpire,
      ] = await Promise.all([
        fetchDailyRegisters(),
        fetchHoursWorkedByRole(),
        fetchEmployeesByGender(),
        fetchSingleRegisters(),
        fetchContractsToExpire(),
      ]);
      clockInQtt.value = dailyRegisters.clock_in;
      clockOutQtt.value = dailyRegisters.clock_out;

      roleHoursObj.value = hoursWorkedByRole.reduce(
        (acc, item) => {
          acc['labels'].push(item.role);
          acc['hours'].push(item.hours_worked);
          return acc;
        },
        { labels: [], hours: [] }
      );

      employeesGenderObj.value = employeesByGender;

      singleRegisters.value = withoutMatchRegisters;

      contractsToExpire.value = contractsAboutToExpire;

      loadingGraphs.value = false;
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

    const handleCompanyChange = async (value, selectedOptions) => {
      if (value && selectedOptions.length) {
        selectedCompanyId.value = value;
        await fetchAlertsAndGraphsInfos();
      }
    };

    onMounted(async () => {
      await fetchCompanies();
      selectedCompanyId.value = companies.value[0].id;

      await fetchAlertsAndGraphsInfos();
    });

    return {
      clockInQtt,
      clockOutQtt,
      companyOptions,
      contractsToExpire,
      employeesGenderObj,
      handleCompanyChange,
      loadingGraphs,
      roleHoursObj,
      selectedCompanyId,
      singleRegisters,
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
    <a-spin
      v-if="loadingGraphs"
      class="loader"
      size="large"
      :spinning="loadingGraphs"
    />
    <div v-else class="dashboard__content">
      <daily-registers
        :clock-in-qtt="clockInQtt"
        :clock-out-qtt="clockOutQtt"
      />
      <div class="content__graphs">
        <graph-hours-worked-by-role class="col-6" :data="roleHoursObj" />
        <graph-employees-by-gender
          class="col-6 gender-graph"
          :data="employeesGenderObj"
        />
      </div>
      <h1>Alertas</h1>
      <div class="content__graphs">
        <without-match-registers class="col-6" :data="singleRegisters" />
        <contracts-to-expire class="col-6" :data="contractsToExpire" />
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
  .loader {
    display: flex;
    justify-content: center;
    align-items: center;
    height: calc(100vh - 160px);
  }
  .dashboard__content {
    display: flex;
    flex-direction: column;
    gap: $spacingXxl;
    padding: $spacingXxl 0px;

    .content__graphs {
      display: flex;
      justify-content: space-around;
      gap: $spacingXxl;
    }
  }
}
:deep(.graph-container) {
  background-color: $colorBackgroundNeutral;
  border: 1px solid $colorBorder;
  border-radius: $borderRadiusSm;
  padding: $spacingMd $spacingXl;
}
:deep(.col-6) {
  display: flex;
  flex-direction: column;
  gap: $spacingMd;
  flex: 0 0 calc(50% - (#{$spacingXxl} / 2));
  max-width: calc(50% - (#{$spacingXxl} / 2));
  box-sizing: border-box;
  text-align: center;
}
</style>
