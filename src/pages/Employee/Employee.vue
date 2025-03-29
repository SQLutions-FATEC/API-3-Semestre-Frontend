<script>
import { Button, Cascader, DatePicker, Input, Modal } from 'ant-design-vue';
import dayjs from 'dayjs';
import { ref } from 'vue';
import employee from '@/services/employee';

export default {
  name: 'Employee',

  components: {
    'a-button': Button,
    'a-input': Input,
    'a-cascader': Cascader,
    'a-date-picker': DatePicker,
    'a-modal': Modal,
  },

  setup() {
    const dateFormatList = ['DD/MM/YYYY'];
    const employeeName = ref('');
    const employeeCpf = ref('');
    const employeeBirthDate = ref(dayjs());
    const employeeBloodType = ref('');
    const employeeFunction = ref('');
    const company = ref('');
    const isFunctionModalOpen = ref(false);
    const newFunction = ref('');
    const profileImage = ref(
      'https://i.pinimg.com/custom_covers/222x/85498161615209203_1636332751.jpg'
    );

    const createEmployee = async () => {
      const payload = {
        employee_name: employeeName.value,

        employee_birth_date: employeeBirthDate.value,

        employee_blood_type: employeeBloodType.value,

        employee_function: employeeFunction.value,

        company: company.value,

        employee_cpf: employeeCpf.value,
      };

      console.log('Dados sendo enviados:', JSON.stringify(payload, null, 2));

      try {
        await employee.create(payload);
      } catch (error) {
        console.error('Erro completo:', {
          message: error.message,
          response: error.response?.data,
          status: error.response?.status,
        });
      }
    };

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
      { value: 1, label: 'Empresa A' },
      { value: 2, label: 'Empresa B' },
      { value: 3, label: 'Empresa C' },
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

    const handleDateChange = (date) => {
      if (date) {
        employeeBirthDate.value = dayjs(date);
      } else {
        employeeBirthDate.value = null;
      }
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

    const openFunctionModal = () => {
      isFunctionModalOpen.value = true;
    };

    const addFunction = () => {
      if (newFunction.value.trim()) {
        functionOptions.value.push({
          value: newFunction.value,
          label: newFunction.value,
        });
        employeeFunction.value = newFunction.value;
        newFunction.value = '';
        isFunctionModalOpen.value = false;
        ensureAddNewIsLast();
      }
    };

    return {
      employeeName,
      employeeCpf,
      employeeBirthDate,
      employeeBloodType,
      employeeFunction,
      company,
      profileImage,
      createEmployee,
      bloodTypeOptions,
      functionOptions,
      companyOptions,
      handleBloodTypeChange,
      handleFunctionChange,
      handleCompanyChange,
      isFunctionModalOpen,
      newFunction,
      openFunctionModal,
      addFunction,
      handleDateChange,
      dateFormatList,
      ensureAddNewIsLast,
    };
  },
};
</script>
<template>
  <div class="employee">
    <h1>Cadastro de Funcionário</h1>

    <div class="employee_content">
      <div class="left_collumn" style="width: 40%">
        <div class="content__input">
          <a-input v-model:value="employeeName" placeholder="Nome completo" />
        </div>

        <div class="content__input">
          <a-input v-model:value="employeeCpf" placeholder="CPF" />
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
        <div class="profile-picture" style="text-align: center">
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
        <a-button type="primary" style="width: 250px" @click="createEmployee">
          Cadastrar
        </a-button>
      </div>
    </div>

    <a-modal
      v-model:open="isFunctionModalOpen"
      title="Nova Função"
      @ok="addFunction"
    >
      <a-input v-model:value="newFunction" placeholder="Digite a nova função" />
    </a-modal>
  </div>
</template>

<style lang="scss" scoped>
.employee {
  padding: $spacingXxl;

  .employee_content {
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
