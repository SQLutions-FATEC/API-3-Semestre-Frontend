<script>
import { Button,  } from 'ant-design-vue';
import { DownOutlined } from '@ant-design/icons-vue';

export default {
  name: 'Employee',

  components: {
    'a-button': Button,
  },

  setup() {
    createEmployee
    
const handleMenuClick = ({ key }) => {
  switch (key) {
    case '1':
      dropdownText.value = 'Opção 1 selecionada';
      break;
    case '2':
      dropdownText.value = 'Opção 2 selecionada';
      break;
    case '3':
      dropdownText.value = 'Opção 3 selecionada';
      break;
    default:
      dropdownText.value = 'Selecione uma opção';
};
}
  return {
      createEmployee
    };
  },
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

