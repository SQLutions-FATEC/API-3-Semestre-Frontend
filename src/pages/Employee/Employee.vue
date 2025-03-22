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
    <h1>Cadastro de funcionario</h1>
    <div class="employee__content">
      <div class="content__input">
        <a-input v-model:value="employeeName" placeholder="Nome completo" />
      </div>
      <div class="content__input">
        <a-input v-model:value="cpf" placeholder="CPF" />
      </div>
      <div class="content__input">
        <a-input v-model:value="birthDate" placeholder="Data de nascimento" />
      </div>
      <div class="content__input">
        <a-input v-model:value="bloodType" placeholder="Tipo sanguíneo" />
      </div>
      <a-dropdown>
    <a class="ant-dropdown-link" @click.prevent>
      Função
      <DownOutlined />
    </a>
    <template #overlay>
      <a-menu>
        <a-menu-item key="1">
          <a href="javascript:;">Engenheiro</a>
        </a-menu-item>
        <a-menu-item key="2">
          <a href="javascript:;">Pintor</a>
        </a-menu-item>
        <a-menu-item key="3">
          <a href="javascript:;">Criar nova função</a>
        </a-menu-item>
      </a-menu>
    </template>
  </a-dropdown>
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