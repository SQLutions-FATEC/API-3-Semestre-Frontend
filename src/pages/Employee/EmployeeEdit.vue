<script>

import { Button, Dropdown, Input, Menu } from 'ant-design-vue';
import { ref } from 'vue';
import { Dayjs } from 'dayjs';

export default {
  name: 'EmployeeEdit',

  components: {
    'a-button': Button,
    'a-input': Input,
    'a-dropdown': Dropdown,
    'a-menu': Menu,
    'a-menu-item': Menu.Item,
  },

  setup() {
    const employeeName = ref('');
    const employeeCpf = ref('');
    const employeeBirthDate = ref('');
    const employeeBloodType = ref('');
    const employeeFunction = ref('Selecione uma função');
    const company = ref('');
    const isEditing = ref(false);
    const profileImage = ref('https://i.pinimg.com/custom_covers/222x/85498161615209203_1636332751.jpg');

    const editEmployee = () => {return 0};

    const toggleEdit = () => {
        isEditing.value = !isEditing.value;
    };

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
        toggleEdit,
        editEmployee,
        employeeName,
        employeeCpf,
        employeeBirthDate,
        employeeBloodType,
        employeeFunction,
        company,
        isEditing,
        handleMenuClick,
        profileImage,
    };
    },
}; 
</script>
<template>
 <div class="edit_employee">
    <h1>Edição de Funcionário</h1>
    <div class="edit_employee_content">
      <div class="profile-picture">
        <img :src="profileImage" alt="Profile Picture" />
      </div>
       <div class="content__input">
            <a-input v-model:value="employeeName" placeholder="Nome completo" :disabled="!isEditing" />
      </div>

      <div class="content__input">
        <a-input v-model:value="employeeCpf" placeholder="CPF" :disabled="!isEditing" />
      </div>

      <div class="content__input">
        <a-date-picker v-model:value="employeeBirthDate" placeholder="Data de nascimento" :disabled="!isEditing" />
      </div>
      
      <div class="content__input">
        <a-input v-model:value="employeeBloodType" placeholder="Tipo sanguíneo" :disabled="!isEditing" />
      </div>

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

      <div class="content__input">
        <a-input v-model:value="company" placeholder="Empresa" :disabled="!isEditing" />
      </div>

      <div class="content__action">
        <a-button type="primary" @click="toggleEdit">
          {{ isEditing ? 'Confirmar' : 'Editar' }}
        </a-button>
      </div>

    </div>
 </div>
</template>
<style lang = "scss" scoped>
 .edit_employee {
  padding: $spacingXxl;

  .edit_employee_content {
    padding: $spacingXxl 0px;
    display: flex;
    flex-wrap: wrap;
    gap: 32px;

    .content__input {
      flex: 0 0 calc(50% - 16px);
      box-sizing: border-box;
    }
    .content__action {
      flex: 0 0 100%;
      display: flex;
      justify-content: center;
    }
    .profile-picture {
      flex: 0 0 100%;
      display: flex;
      justify-content: center;
      margin-bottom: 16px;

      img {
        width: 150px; 
        height: 150px; 
        border-radius: 50%; 
        object-fit: cover; 
      }
   }
  }
}
</style>