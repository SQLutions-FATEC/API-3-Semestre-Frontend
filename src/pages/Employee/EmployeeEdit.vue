<script>
import { Button, Cascader, Input, Modal } from 'ant-design-vue';
import dayjs from 'dayjs';
import { ref } from 'vue';

export default {
  name: 'EmployeeEdit',
  components: {
    'a-button': Button,
    'a-input': Input,
    'a-cascader': Cascader,
    'a-modal': Modal,
  },
  setup() {
    const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY'];
    const employeeName = ref('');
    const employeeCpf = ref('');
    const employeeBirthDate = ref(dayjs());
    const employeeBloodType = ref('Tipo Sanguíneo');
    const employeeFunction = ref('Função');
    const company = ref('Empresa');
    const isEditing = ref(false);
    const profileImage = ref(
      'https://i.pinimg.com/custom_covers/222x/85498161615209203_1636332751.jpg'
    );

    const bloodTypeOptions = [
      { value: 'A+', label: 'A+' },
      { value: 'A-', label: 'A-' },
      { value: 'B+', label: 'B+' },
      { value: 'B-', label: 'B-' },
      { value: 'AB+', label: 'AB+' },
      { value: 'AB-', label: 'AB-' },
      { value: 'O+', label: 'O+' },
      { value: 'O-', label: 'O-' },
    ];

    const functionOptions = ref([
      { value: 'Engenheiro', label: 'Engenheiro' },
      { value: 'Mecânico', label: 'Mecânico' },
      { value: 'Pintor', label: 'Pintor' },
    ]);

    const companyOptions = [
      { value: 'Empresa A', label: 'Empresa A' },
      { value: 'Empresa B', label: 'Empresa B' },
      { value: 'Empresa C', label: 'Empresa C' },
    ];

    const handleBloodTypeChange = (value) => {
      employeeBloodType.value = value[0];
    };

    const handleFunctionChange = (value) => {
      if (value.includes('add-new')) {
        employeeFunction.value = [];
        openFunctionModal();
        ensureAddNewIsLast();
      } else {
        employeeFunction.value = value[0];
      }
    };

    const handleCompanyChange = (value) => {
      company.value = value[0];
    };

    const editEmployee = () => {
      console.log('Editando funcionário...');
    };

    const isFunctionModalVisible = ref(false);
    const newFunction = ref('');

    const openFunctionModal = () => {
      isFunctionModalVisible.value = true;
    };

    const ensureAddNewIsLast = () => {
      const regularOptions = functionOptions.value.filter(
        (opt) => opt.value !== 'add-new'
      );

      functionOptions.value = [
        ...regularOptions,
        { value: 'add-new', label: '➕ Adicionar Função' },
      ];
    };

    ensureAddNewIsLast();

    const addFunction = () => {
      if (newFunction.value.trim()) {
        functionOptions.value.push({
          value: newFunction.value,
          label: newFunction.value,
        });
        employeeFunction.value = newFunction.value;
        newFunction.value = '';
        isFunctionModalVisible.value = false;
        ensureAddNewIsLast();
      }
    };

    const handleDateChange = (date) => {
      if (date) {
        employeeBirthDate.value = dayjs(date);
      } else {
        employeeBirthDate.value = null;
      }
    };

    return {
      editEmployee,
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
      handleBloodTypeChange,
      handleFunctionChange,
      handleCompanyChange,
      isFunctionModalVisible,
      newFunction,
      openFunctionModal,
      addFunction,
      dateFormatList,
      handleDateChange,
      ensureAddNewIsLast,
    };
  },
};
</script>

<template>
  <div class="edit_employee">
    <h1>Edição de Funcionário</h1>

    <div class="edit_employee_content">
      <div class="left_collumn" style="width: 40%">
        <div class="content__input">
          <a-input
            v-model:value="employeeName"
            placeholder="Nome completo"
            :disabled="!isEditing"
          />
        </div>

        <div class="content__input">
          <a-input
            v-model:value="employeeCpf"
            placeholder="CPF"
            :disabled="!isEditing"
          />
        </div>

        <div class="dropdown">
          <a-date-picker
            v-model:value="employeeBirthDate"
            placeholder="Data de nascimento"
            :format="dateFormatList"
            @change="handleDateChange"
          />
        </div>

        <div class="dropdown">
          <a-cascader
            :options="bloodTypeOptions"
            placeholder="Tipo Sanguíneo"
            @change="handleBloodTypeChange"
          />
        </div>

        <div class="dropdown">
          <a-cascader
            :options="functionOptions"
            placeholder="Função"
            @change="handleFunctionChange"
            :showSearch="{
              filter: (inputValue, path) =>
                path.some((option) =>
                  option.label.toLowerCase().includes(inputValue.toLowerCase())
                ),
            }"
          />
        </div>
      </div>

      <div class="right_collumn" style="width: 40%">
        <div class="profile-picture">
          <img :src="profileImage" alt="Profile Picture" />
        </div>

        <div class="dropdown">
          <a-cascader
            :options="companyOptions"
            placeholder="Empresa"
            @change="handleCompanyChange"
            :showSearch="{
              filter: (inputValue, path) =>
                path.some((option) =>
                  option.label.toLowerCase().includes(inputValue.toLowerCase())
                ),
            }"
          />
        </div>
      </div>

      <div class="content__action">
        <a-button type="primary" @click="editEmployee"> Confirmar </a-button>
      </div>
    </div>

    <a-modal
      v-model:visible="isFunctionModalVisible"
      title="Nova Função"
      @ok="addFunction"
    >
      <a-input v-model:value="newFunction" placeholder="Digite a nova função" />
    </a-modal>
  </div>
</template>

<style lang="scss" scoped>
.edit_employee {
  padding: $spacingXxl;

  .edit_employee_content {
    padding: $spacingXxl 0px;
    display: flex;
    flex-wrap: wrap;
    overflow: auto;
    gap: $spacingXxl;

    .profile-picture {
      margin-bottom: $spacingXxl + 2px;
    }

    .content__input {
      margin-bottom: $spacingXxl;
    }

    .content__action {
      flex: 0 0 calc(100% - 200px);
      display: inline-flex;
      justify-content: center;
    }

    .dropdown {
      margin-bottom: $spacingXxl;

      :deep(.ant-picker),
      :deep(.ant-cascader) {
        width: 100%;
      }
    }
  }
}
</style>
