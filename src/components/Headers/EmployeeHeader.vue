<script>
import { Button } from 'ant-design-vue';
import EmployeeModal from '@/components/Modals/EmployeeModal.vue';
import AtInput from '@/components/Input/AtInput.vue';
import { ref } from 'vue';

export default {
  name: 'EmployeeHeader',

  components: {
    'a-button': Button,
    'at-input': AtInput,
    'employee-modal': EmployeeModal,
  },

  setup(props, { emit }) {
    const employeeNameFilter = ref('');
    const isEmployeeModalOpened = ref(false);

    const filterEmployee = () => {
      emit('filter-changed', employeeNameFilter.value);
    };

    const openEmployeeModal = () => {
      isEmployeeModalOpened.value = true;
    };

    return {
      employeeNameFilter,
      isEmployeeModalOpened,
      filterEmployee,
      openEmployeeModal,
    };
  },
};
</script>

<template>
  <div class="employee-header">
    <h1>Funcionários</h1>
    <div class="header__actions">
      <div class="filter__wrapper">
        <label class="filter-label">Nome do Funcionário</label>
        <at-input
          v-model:value="employeeNameFilter"
          class="filter-input"
          placeholder="Digite o nome do funcionário"
        />
      </div>
      <a-button type="primary" @click="filterEmployee">Filtrar</a-button>
      <a-button type="primary" @click="openEmployeeModal">
        Adicionar funcionário
      </a-button>
    </div>
    <employee-modal
      v-if="isEmployeeModalOpened"
      v-model:open="isEmployeeModalOpened"
    />
  </div>
</template>

<style lang="scss" scoped>
.employee-header {
  display: flex;
  flex-direction: column;
  gap: $spacingLg;

  h1 {
    @include heading(large);
  }
  .header__actions {
    display: flex;
    gap: $spacingSm;
    align-items: end;
    justify-content: end;

    .filter__wrapper {
      display: flex;
      flex-direction: column;
      gap: $spacingXs;
    }
    .filter-input {
      width: 250px;
    }
  }
}
</style>
