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
      <div v-if="selectedFilter === 'employee'" class="filter-group">
        <label class="filter-label"> Nome do Funcionário</label>
        <at-input
          v-model:value="employeeNameFilter"
          class="filter-input"
          placeholder="Digite o nome do funcionário"
        />
      </div>
      <div v-else-if="selectedFilter === 'company'" class="filter-group">
        <label class="filter-label">Nome da Empresa</label>
        <at-input
          v-model:value="companyNameFilter"
          class="filter-input"
          placeholder="Digite o nome da empresa"
        />
      </div>
      <div v-else-if="selectedFilter === 'role'" class="filter-group">
        <label class="filter-label">Função</label>
        <at-input
          v-model:value="roleFilter"
          class="filter-input"
          placeholder="Digite a função"
        />
      </div>
      <div v-else-if="selectedFilter === 'datetime'" class="filter-group">
        <label class="filter-label">Período</label>
        <a-range-picker
          v-model:value="datetimeFilter"
          class="filter-input"
          format="DD/MM/YYYY HH:mm"
          show-time
          style="width: 300px"
          :placeholder="['Hora inicial', 'Hora final']"
          :time-picker-props="{ format: 'HH:mm' }"
        />
      </div>
      <a-select
        v-model:value="selectedFilter"
        class="filter-select"
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
  padding: $spacingLg;
  background: $colorBackground;
  border-radius: $borderRadiusMd;
  margin-bottom: $spacingLg;

  .filters {
    display: flex;
    align-items: flex-end;
    gap: $spacingMd;
    .filter-group {
      display: flex;
      flex-direction: column;
      margin-right: $spacingSm;
    }
    .filter-label {
      @include label(small);
      margin-bottom: $spacingXs;
    }
    .filter-input {
      width: 250px;
    }
    .filter-select {
      width: 150px;
    }
    .filters__date {
      display: flex;
      align-items: center;
      gap: $spacingMd;
    }
  }
}
</style>