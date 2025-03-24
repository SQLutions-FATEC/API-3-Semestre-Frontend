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
                employeeFunction.value = 'Adicione uma função';
        }
    };

    return{
        createEmployee,
        employeeName,
        employeeCpf,
        employeeBirthDate,
        employeeBloodType,
        employeeFunction,
        handleMenuClick
    };
    },
}; 
</script>
<template>

</template>
<style lang = "scss" scoped>

</style>