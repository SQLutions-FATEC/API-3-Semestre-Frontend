<script>

import { Button, Cascader, Input } from 'ant-design-vue';
import { ref } from 'vue';

export default {
  name: 'Employee',

  components: {
    'a-button': Button,
    'a-input': Input,
    'a-cascader': Cascader,
  },

  setup() {

    const createEmployee = () => { return 0 };
    const employeeName = ref('');
    const employeeCpf = ref('');
    const employeeBirthDate = ref('');
    const employeeBloodType = ref('');
    let employeeFunction = ref([]);
    const company = ref('');



    const options = [
      {
        value: 'zhejiang',
        label: 'Zhejiang',
      },
      {
        value: 'jiangsu',
        label: 'Jiangsu',
      },
    ];
    const filter = (inputValue, path) => {
      return path.some(option => option.label.toLowerCase().indexOf(inputValue.toLowerCase()) > -1);
    };
    const value = ref([]);
    employeeFunction = value;


    return {
      employeeName,
      employeeCpf,
      employeeBirthDate,
      employeeBloodType,
      employeeFunction,
      company,
      createEmployee,
      options,
      filter,
      value,
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
        <a-cascader v-model:value="value" :options="options" :show-search="{ filter }" placeholder="Função" />
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




    }

  }
}
</style>