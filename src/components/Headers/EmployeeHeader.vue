<script>
import { Button } from 'ant-design-vue';

export default {
  name: 'EmployeeHeader',

  components: {
    'a-button': Button,
  },

  setup() {
    const openEmployeeModal = () => {
      this.$emit('open-employee-modal');
    };

    return {
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
  </div>
</template>

<style lang="scss" scoped>
.employee-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
