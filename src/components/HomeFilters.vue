<script>
import { Button, DatePicker, Select } from 'ant-design-vue';
import AtInput from '@/components/Input/AtInput.vue';
import { ref } from 'vue';

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
    const selectedFilter = ref('Funcionário');

    const teste = () => {
      console.log('oi');
    };

    const selectFilter = (value) => {
      selectedFilter.value = value;
    };

    return {
      teste,
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
      style="width: 250px"
      placeholder="Digite o nome do funcionário"
    />
    <at-input
      v-else-if="selectedFilter === 'Empresa'"
      style="width: 250px"
      placeholder="Digite o nome da empresa"
    />
    <at-input
      v-else-if="selectedFilter === 'Função'"
      style="width: 250px"
      placeholder="Digite a função"
    />
    <div v-else-if="selectedFilter === 'Data'" class="filters__date">
      <a-range-picker
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
    <a-button @click="teste">Filtrar</a-button>
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
