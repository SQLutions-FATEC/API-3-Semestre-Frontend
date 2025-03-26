<script>
import { Button, Cascader, Input } from 'ant-design-vue';
import { ref } from 'vue';

export default {
  name: 'EmployeeEdit',
  components: {
    'a-button': Button,
    'a-input': Input,
    'a-cascader': Cascader
  },
  setup() {
    const employeeName = ref('');
    const employeeCpf = ref('');
    const employeeBirthDate = ref('');
    const employeeBloodType = ref('Tipo Sanguíneo');
    const employeeFunction = ref('Função');
    const company = ref('Empresa');
    const isEditing = ref(false);
    const profileImage = ref('https://i.pinimg.com/custom_covers/222x/85498161615209203_1636332751.jpg');

    const toggleEdit = () => {
      isEditing.value = !isEditing.value;
    };

    const bloodTypeOptions = [
      { value: 'A+', label: 'A+' },
      { value: 'A-', label: 'A-' },
      { value: 'B+', label: 'B+' },
      { value: 'B-', label: 'B-' },
      { value: 'AB+', label: 'AB+' },
      { value: 'AB-', label: 'AB-' },
      { value: 'O+', label: 'O+' },
      { value: 'O-', label: 'O-' }
    ];

    const functionOptions = [
      { value: 'Engenheiro', label: 'Engenheiro' },
      { value: 'Mecânico', label: 'Mecânico' },
      { value: 'Pintor', label: 'Pintor' },
      { value: 'Criar nova função', label: 'Criar nova função' }
    ];

    const companyOptions = [
      { value: 'Empresa A', label: 'Empresa A' },
      { value: 'Empresa B', label: 'Empresa B' },
      { value: 'Empresa C', label: 'Empresa C' },
      { value: 'Adicionar uma empresa', label: 'Adicionar uma empresa' }
    ];

    return {
      toggleEdit,
      employeeName,
      employeeCpf,
      employeeBirthDate,
      employeeBloodType,
      employeeFunction,
      company,
      isEditing,
      profileImage,
      bloodTypeOptions,
      functionOptions,
      companyOptions,
    };
  }
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
        <a-cascader
          :options="bloodTypeOptions"
          placeholder="Tipo Sanguíneo"
          :disabled="!isEditing"
          @change="handleBloodTypeChange"
        />
      </div>

      <div class="content__input">
        <a-cascader
          :options="functionOptions"
          placeholder="Função"
          :disabled="!isEditing"
          @change="handleFunctionChange"
        />
      </div>

      <div class="content__input">
        <a-cascader
          :options="companyOptions"
          placeholder="Empresa"
          :disabled="!isEditing"
          @change="handleCompanyChange"
        />
      </div>

      <div class="content__action">
        <a-button type="primary" @click="toggleEdit">
          {{ isEditing ? 'Confirmar' : 'Editar' }}
        </a-button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
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
