<script>
import { Button } from 'ant-design-vue';
import EmployeeModal from '@/components/Modals/EmployeeModal.vue';
import { ref } from 'vue';

export default {
  name: 'EmployeeHeader',

  components: {
    'a-button': Button,
    'employee-modal': EmployeeModal,
  },

  setup() {
    const isEmployeeModalOpened = ref(false);

    const openEmployeeModal = () => {
      isEmployeeModalOpened.value = true;
    };

    return {
      isEmployeeModalOpened,
      openEmployeeModal,
    };
  },
};
</script>

<template>
  <div class="employee-header">
    <h1>Funcionários</h1>
    <a-button type="primary" @click="openEmployeeModal">
      Adicionar funcionário
    </a-button>
    <employee-modal v-model:open="isEmployeeModalOpened" />
  </div>
</template>

<style lang="scss" scoped>
.employee-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
