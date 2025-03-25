<script>

import { Button, Dropdown, Input, Menu } from 'ant-design-vue';
import { ref } from 'vue';

export default {
  name: 'Employee',

  components: {
    'a-button': Button,
    'a-input': Input,
    'a-dropdown': Dropdown,
    'a-menu': Menu,
    'a-menu-item': Menu.Item,
  },

  setup() {

    const createEmployee = () => { return 0 };
    const employeeName = ref('');
    const employeeCpf = ref('');
    const employeeBirthDate = ref('');
    const employeeBloodType = ref('');
    const employeeFunction = ref('Selecione uma função');
    const company = ref('');


    const handleMenuClick = ({ key }) => {
      switch (key) {
        case '1':
          employeeFunction.value = 'Engenheiro';
          break;
        case '2':
          employeeFunction.value = 'Mecânico';
          break;
        case '3':
          employeeFunction.value = 'Pintor';
          break;
        default:
          createEmployee
          employeeFunction.value = 'Criar nova função';
      }
    };

    return {
      employeeName,
      employeeCpf,
      employeeBirthDate,
      employeeBloodType,
      employeeFunction,
      company,
      handleMenuClick,
      createEmployee,
    };
  },
};

</script>
<template>
  <div class="employee">
    <h1>Cadastro de Funcionário</h1>

    <div class="employee_content">
      <div class="content__input">
        <a-input v-model:value="employeeName" placeholder="Nome completo" />
      </div>

      <div class="content__input">
        <a-input v-model:value="employeeCpf" placeholder="CPF" />
      </div>

      <div class="content__input">
        <a-input v-model:value="employeeBirthDate" placeholder="Data de nascimento" />
      </div>

      <div class="content__input">
        <a-input v-model:value="employeeBloodType" placeholder="Tipo sanguíneo" />
      </div>

      <div class="dropdown">
        <a-dropdown>

          <a-button>
            {{ employeeFunction }}
          </a-button>

          <template #overlay>
            <a-menu @click="handleMenuClick">
              <a-menu-item key="1">Engenheiro</a-menu-item>
              <a-menu-item key="2">Mecânico</a-menu-item>
              <a-menu-item key="3">Pintor</a-menu-item>
              <a-menu-item key="4">Criar nova função</a-menu-item>
            </a-menu>
          </template>
        </a-dropdown>
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

<style lang="scss" scoped>
.employee {
  padding: $spacingXxl;

  .employee_content {
    padding: $spacingXxl 0px;
    display: flex;
    flex-wrap: wrap;
    gap: 32px;

    .content__input {
      flex: 0 0 calc(50% - 128px);
      box-sizing: border-box;
    }

    .content__action {
      flex: 0 0 calc(100% - 220px);
      display: inline-flex;
      justify-content: center;
    }

    .dropdown {
      flex: 0 0 calc(50% - 128px);
      box-sizing: border-box;

      :deep(.ant-dropdown-trigger) {

        text-align: left;
        width: 100%;

        button {
          width: 100%;
          text-align: left;
        }
      }
    }

  }
}
</style>