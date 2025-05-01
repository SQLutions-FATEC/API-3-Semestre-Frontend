<script>
import { Button, DatePicker, Select } from 'ant-design-vue';
import AtInput from '@/components/Input/AtInput.vue';
import { onMounted, ref } from 'vue';
import { eventBus } from '@/utils/eventBus';
import ExcelExportButton from '@/components/Button/ExcelExportButton.vue';
import { onBeforeUnmount } from 'vue';

export default {
  name: 'HomeFilters',

  components: {
    'a-button': Button,
    'a-date-picker': DatePicker,
    'a-option': Select.Option,
    'a-range-picker': DatePicker.RangePicker,
    'a-select': Select,
    'at-input': AtInput,
    'excel-export-button': ExcelExportButton,
  },

  setup() {
    const companyNameFilter = ref('');
    const datetimeFilter = ref([]);
    const employeeNameFilter = ref('');
    const roleFilter = ref('');
    const selectedFilter = ref('employee');
    const tableData = ref([]);

    const filterClockInOut = async () => {
      eventBus.$emit('filter-changed', {
        company: companyNameFilter.value,
        employee: employeeNameFilter.value,
        role: roleFilter.value,
        dateRange: datetimeFilter.value,
      });
    };

    const handleTableData = (value) => {
      tableData.value = value;
    };

    const selectFilter = (value) => {
      companyNameFilter.value = '';
      datetimeFilter.value = [];
      employeeNameFilter.value = '';
      roleFilter.value = '';
      selectedFilter.value = value;
    };

    onMounted(() => {
      eventBus.$on('table-data', handleTableData);
    });

    onBeforeUnmount(() => {
      eventBus.$off('table-data', handleTableData);
    });

    return {
      companyNameFilter,
      datetimeFilter,
      employeeNameFilter,
      filterClockInOut,
      roleFilter,
      selectedFilter,
      selectFilter,
      tableData,
    };
  },
};
</script>

<template>
  <div class="home-filters">
    <excel-export-button
      :data="tableData"
      fileName="movimentacoes"
      sheetName="Registros"
    />
    <div class="filters">
      <at-input
        v-if="selectedFilter === 'employee'"
        v-model:value="employeeNameFilter"
        style="width: 250px"
        placeholder="Digite o nome do funcionário"
      />
      <at-input
        v-else-if="selectedFilter === 'company'"
        v-model:value="companyNameFilter"
        style="width: 250px"
        placeholder="Digite o nome da empresa"
      />
      <at-input
        v-else-if="selectedFilter === 'role'"
        v-model:value="roleFilter"
        style="width: 250px"
        placeholder="Digite a função"
      />
      <div v-else-if="selectedFilter === 'datetime'" class="filters__date">
        <a-range-picker
          v-model:value="datetimeFilter"
          style="width: 300px"
          format="YYYY-MM-DD HH:mm"
          show-time
          :placeholder="['Hora inicial', 'Hora final']"
          :time-picker-props="{ format: 'HH:mm' }"
        />
      </div>
      <a-select
        v-model:value="selectedFilter"
        style="width: 150px"
        placeholder="Selecione um filtro"
        @change="selectFilter"
      >
        <a-option value="employee">Funcionário</a-option>
        <a-option value="company">Empresa</a-option>
        <a-option value="role">Função</a-option>
        <a-option value="datetime">Data</a-option>
      </a-select>
      <a-button type="primary" @click="filterClockInOut">Filtrar</a-button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.home-filters {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: $spacingXl;

  .filters {
    display: flex;
    align-items: center;
    gap: $spacingMd;
  }
  .filters__date {
    display: flex;
    align-items: center;
    gap: $spacingMd;
  }
}
</style>
