<script>

import { DownOutlined } from '@ant-design/icons-vue';
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
    DownOutlined,
  },

  setup() {
    const employeeName = ref('');
    const employeeCpf = ref('');
    const employeeBirthDate = ref('');
    const employeeBloodType = ref('');
    const employeeFunction = ref('Selecione uma função');
    const company = ref('');

    const createEmployee = () => {};

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
                employeeFunction.value = 'Criar nova função';
        }
    };

    return{
        createEmployee,
        employeeName,
        employeeCpf,
        employeeBirthDate,
        employeeBloodType,
        employeeFunction,
        company,
        handleMenuClick
    };
    },
}; 
</script>
<template>
 <div class="edit_employee">
    <h1>Edição de Funcionário</h1>
    <div class="edit_employee_content">
       <div class="content_input">
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

      
    </div>
 </div>
</template>
<style lang = "scss" scoped>

</style>