<script>
import { Button, DatePicker, Select } from 'ant-design-vue';
import AtInput from '@/components/Input/AtInput.vue';
import { ref } from 'vue';
import { eventBus } from '@/utils/eventBus';

export default {
  name: 'HomeFilters',

  components: {
    'a-button': Button,
    'a-date-picker': DatePicker,
    'a-option': Select.Option,
    'a-range-picker': DatePicker.RangePicker,
    'a-select': Select,
    'at-input': AtInput,
  },

  setup() {
    const companyNameFilter = ref('');
    const datetimeFilter = ref([]);
    const employeeNameFilter = ref('');
    const roleFilter = ref('');
    const selectedFilter = ref('Funcionário');

    const filterClockInOut = async () => {
      let loading = true;
      try {
        eventBus.$emit('filter-changed', {
          company: companyNameFilter.value,
          employee: employeeNameFilter.value,
          role: roleFilter.value,
          dateRange: datetimeFilter.value,
        });
      } catch (error) {
        console.error(error);
      } finally {
        loading = false;
      }
    };

    const selectFilter = (value) => {
      selectedFilter.value = value;
    };

    return {
      filterClockInOut,
      companyNameFilter,
      datetimeFilter,
      employeeNameFilter,
      roleFilter,
      selectedFilter,
      selectFilter,
    };
  },
};
</script>

<template>
  <div class="home-filters">
    <at-input
      v-if="selectedFilter === 'Funcionário'"
      v-model:value="employeeNameFilter"
      style="width: 250px"
      placeholder="Digite o nome do funcionário"
    />
    <at-input
      v-else-if="selectedFilter === 'Empresa'"
      v-model:value="companyNameFilter"
      style="width: 250px"
      placeholder="Digite o nome da empresa"
    />
    <at-input
      v-else-if="selectedFilter === 'Função'"
      v-model:value="roleFilter"
      style="width: 250px"
      placeholder="Digite a função"
    />
    <div v-else-if="selectedFilter === 'Data'" class="filters__date">
      <a-range-picker
        v-model:value="datetimeFilter"
        style="width: 250px"
        show-time
        :placeholder="['Hora inicial', 'Hora final']"
      />
    </div>
    <a-select
      v-model:value="selectedFilter"
      style="width: 200px"
      placeholder="Selecione um filtro"
      @change="selectFilter"
    >
      <a-option value="Funcionário">Funcionário</a-option>
      <a-option value="Empresa">Empresa</a-option>
      <a-option value="Função">Função</a-option>
      <a-option value="Data">Data</a-option>
    </a-select>
    <a-button @click="filterClockInOut">Filtrar</a-button>
  </div>
</template>

<style lang="scss" scoped>
.home-filters {
  display: flex;
  align-items: center;
  gap: 12px;

  .filters__date {
    display: flex;
    align-items: center;
    gap: 12px;
  }
}
</style>
