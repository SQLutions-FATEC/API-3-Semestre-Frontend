<script>
import { Button } from 'ant-design-vue';
import { ref } from 'vue';

export default {
  name: 'Employee',

  components: {
    'a-button': Button,
  },

  setup() {
    const count = ref(0);

    return {
      count,
    };
  },

  mounted() {},
};
</script>

<template>
  <div class="employee">
    <h1>Cadastro de empresa</h1>
    <div class="employee__content">
      <div class="content__input">
        <a-input v-model:value="employeeName" placeholder="Nome completo" />
      </div>
      <div class="content__input">
        <a-input v-model:value="cpf" placeholder="CPF" />
      </div>
      <div class="ant-dropdown-link">
        <a-input v-model:value="birthDate" placeholder="Data de nascimento" />
      </div>
      <div class="content__input">
        <a-input v-model:value="bloodType" placeholder="Tipo sanguíneo" />
      </div>
      <div class="content__input">
        <a-input v-model:value="occupation" placeholder="Função" />
      </div>
      <div class="content__input">
        <a-input v-model:value="company" placeholder="Empresa" />
      </div>
      <div class="content__action">
        <a-button type="primary" style="width: 250px" @click="createEmployee">
          Cadastrar
        </a-button>
      </div>
    </div>
  </div>
</template>
