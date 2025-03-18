<script>
import { Button } from 'ant-design-vue';

export default {
  name: 'Employee',

  components: {
    'a-button': Button,
  },

  setup() {
    const createEmployee = () => {};

    return {
      createEmployee,
    };
  },
};
</script>

<template>
  <div class="employee">
    <h1>Cadastro de empresa</h1>
    <a-button type="primary" @click="createEmployee">Cadastrar</a-button>
  </div>
</template>

<style lang="scss" scoped>
.employee {
  padding: $spacingXxl;
}
</style>
