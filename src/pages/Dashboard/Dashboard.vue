<script>
import { onMounted, ref } from 'vue';
import { Cascader, Spin } from 'ant-design-vue';
import company from '@/services/company';
import dashboard from '@/services/dashboard';
import ContractsToExpire from '@/components/DashboardAlerts/ContractsToExpire.vue';
import DailyRegisters from '@/components/DailyRegisters.vue';
import GraphEmployeesByGender from '@/components/Graphs/GraphEmployeesByGender.vue';
import GraphEmployeesByShift from '@/components/Graphs/GraphEmployeesByShift.vue';
import GraphHoursWorkedByRole from '@/components/Graphs/GraphHoursWorkedByRole.vue';
import WithoutMatchRegisters from '@/components/DashboardAlerts/WithoutMatchRegisters.vue';
import dayjs from 'dayjs';
import isoWeek from 'dayjs/plugin/isoWeek';

dayjs.extend(isoWeek);

export default {
  name: 'Dashboard',

  components: {
    'a-cascader': Cascader,
    'a-spin': Spin,
    'daily-registers': DailyRegisters,
    'contracts-to-expire': ContractsToExpire,
    'graph-employees-by-gender': GraphEmployeesByGender,
    'graph-employees-by-shift': GraphEmployeesByShift,
    'graph-hours-worked-by-role': GraphHoursWorkedByRole,
    'without-match-registers': WithoutMatchRegisters,
  },

  setup() {
    const startOfWeek = dayjs().startOf('isoWeek');
    const endOfWeek = dayjs().endOf('isoWeek');
    const selectedWeek = ref([
      dayjs().startOf('isoWeek'),
      dayjs().endOf('isoWeek'),
    ]);

    const clockInQtt = ref(0);
    const clockOutQtt = ref(0);
    const companies = ref([]);
    const companyOptions = ref([]);
    const contractsToExpire = ref([]);
    const employeesGenderObj = ref({});
    const employeesShiftObj = ref({});
    const incompleteRegisters = ref([]);
    const loadingGraphs = ref(true);
    const roleHoursObj = ref({});
    const selectedCompanyId = ref(null);

    const fetchCompanies = async () => {
      try {
        const { data } = await company.get();
        companies.value = data.items;
        companyOptions.value = data.items.map((item) => ({
          label: item.name,
          value: item.id,
          data: item,
          key: item.id,
        }));
      } catch (error) {
        console.error(error);
      }
    };

    const fetchAlertsAndGraphsInfos = async (dateRange = []) => {
      loadingGraphs.value = true;
      if (dateRange.length) {
        selectedWeek.value[0] = dateRange[0];
        selectedWeek.value[1] = dateRange[1];
      }

      const { data } = await dashboard.getByCompany(
        selectedCompanyId.value,
        selectedWeek.value[0].format('YYYY-MM-DD'),
        selectedWeek.value[1].format('YYYY-MM-DD')
      );

      clockInQtt.value = data.daily_registers.clock_in_with_in_count;
      clockOutQtt.value = data.daily_registers.clock_in_with_out_count;

      roleHoursObj.value = data.hours_worked_by_role.reduce(
        (acc, item) => {
          acc['labels'].push(item.role_name);
          acc['hours'].push(item.total_hours.toFixed(2));
          return acc;
        },
        { labels: [], hours: [] }
      );

      employeesGenderObj.value = {
        female: data.employee_count.female_workers,
        male: data.employee_count.male_workers,
      };

      employeesShiftObj.value = {
        labels: Object.keys(data.employees_by_period).map((item) => {
          if (item === 'midnight_to_morning') return 'Noturno (23h - 6h59)';
          else if (item === 'morning_to_afternoon')
            return 'Diurno (7h - 13h59)';
          else if (item === 'afternoon_to_night')
            return 'Vespertino (14h - 22h59)';
        }),
        quantity: Object.values(data.employees_by_period),
      };

      incompleteRegisters.value = data.incomplete_clock_ins;

      contractsToExpire.value = data.expiring_contracts;

      loadingGraphs.value = false;
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
      employeesShiftObj,
      fetchAlertsAndGraphsInfos,
      handleCompanyChange,
      incompleteRegisters,
      loadingGraphs,
      roleHoursObj,
      selectedWeek,
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
        <graph-employees-by-shift class="col-6" :data="employeesShiftObj" />
        <graph-employees-by-gender
          class="col-6 gender-graph"
          :data="employeesGenderObj"
        />
        <graph-hours-worked-by-role
          class="col-6"
          :data="roleHoursObj"
          :date-range="selectedWeek"
          @date-range-change="fetchAlertsAndGraphsInfos"
        />
      </div>
      <h1>Alertas</h1>
      <div class="content__graphs">
        <div v-if="!incompleteRegisters.length" class="col-6 empty-state">
          <p>Nenhum registro encontrado.</p>
        </div>
        <without-match-registers
          v-else
          class="col-6"
          :data="incompleteRegisters"
        />
        <div v-if="!contractsToExpire.length" class="col-6 empty-state">
          <p>Nenhum contrato encontrado.</p>
        </div>
        <contracts-to-expire v-else class="col-6" :data="contractsToExpire" />
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
    max-height: calc(100vh - 154px);
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    gap: $spacingXxl;
    padding: $spacingXxl $spacingSm $spacingXxl 0px;

    .content__graphs {
      display: flex;
      flex-wrap: wrap;
      gap: $spacingXxl;

      .empty-state {
        margin: $spacingLg auto;

        p {
          @include paragraph(medium);
        }
      }
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
