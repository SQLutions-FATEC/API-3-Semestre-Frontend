<script>
import { Button, Cascader, DatePicker, Image, Modal } from 'ant-design-vue';
import dayjs from 'dayjs';
import { ref } from 'vue';
import employee from '@/services/employee';
import AtNumberInput from '@/components/Input/AtNumberInput.vue';
import AtInput from '@/components/Input/AtInput.vue';
import { validateRN } from '@/utils/validations/registerNumber';

export default {
  name: 'Employee',

  components: {
    'a-button': Button,
    'a-cascader': Cascader,
    'a-date-picker': DatePicker,
    'a-modal': Modal,
    'at-input': AtInput,
    'at-number-input': AtNumberInput,
    'a-image': Image,
  },

  setup() {
    const dateFormatList = ['DD/MM/YYYY'];
    const employeeName = ref('');
    const employeeRN = ref('');
    const employeeBirthDate = ref(dayjs());
    const employeeBloodType = ref('');
    const employeeRole = ref('');
    const company = ref('');
    const isEditing = ref(false);
    const errorMessage = ref('');
    const isRoleModalOpen = ref(false);
    const newRole = ref('');
    const profileImage = ref(
      'https://i.pinimg.com/custom_covers/222x/85498161615209203_1636332751.jpg'
    );

    const employeeAction = async () => {
      if (
        !employeeName.value ||
        !employeeBirthDate.value ||
        !employeeBloodType.value ||
        !employeeRole.value ||
        !company.value ||
        !employeeRN.value
      ) {
        alert('Todos os campos são obrigatórios');
        return;
      }

      if (verifyAge(employeeBirthDate.value) < 16) {
        alert('Não é possivel cadastrar usuários menores de 16 anos');
        return;
      }
      const payload = {
        employee_name: employeeName.value,
        employee_birth_date: formattedEmployeeDate,
        employee_blood_type: employeeBloodType.value,
        employee_Role: employeeRole.value,
        company: company.value,
        employee_rn: employeeRN.value,
      };

      if (isEditing.value) {
        await createEmployee(payload);
      } else {
        await editEmployee(payload);
      }
    };

    const createEmployee = async () => {
      try {
        await employee.create(payload);
        alert(`Usuario ${employeeName.value} cadastrado com sucesso`);
        clearFields();
      } catch (error) {
        console.error('Erro completo:', {
          message: error.message,
          response: error.response?.data,
          status: error.response?.status,
          config: error.config,
        });
      }
    };

    const editEmployee = async () => {
      try {
        await employee.edit(payload);
        alert(`Usuario ${employeeName.value} foi editado`);
        clearFields();
      } catch (error) {
        console.error('Erro completo:', {
          message: error.message,
          response: error.response?.data,
          status: error.response?.status,
          config: error.config,
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

    const RoleOptions = ref([
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
      if (value != null) {
        employeeBloodType.value = value[0];
      }
    };

    const handleRoleChange = (value) => {
      if (value != null) {
        if (value.includes('add-new')) {
          employeeRole.value = [];
          openRoleModal();
          ensureAddNewIsLast();
        } else {
          employeeRole.value = value[0];
        }
      }
    };

    const handleCompanyChange = (value) => {
      if (value != null) {
        company.value = value[0];
      }
    };

    const handleDateChange = (date) => {
      if (date) {
        employeeBirthDate.value = dayjs(date);
      } else {
        employeeBirthDate.value = null;
      }
    };

    const ensureAddNewIsLast = () => {
      const regularOptions = RoleOptions.value.filter(
        (opt) => opt.value !== 'add-new'
      );

      RoleOptions.value = [
        ...regularOptions,
        { value: 'add-new', label: '➕ Adicionar Função' },
      ];
    };

    ensureAddNewIsLast();

    const openRoleModal = () => {
      isRoleModalOpen.value = true;
    };

    const addRole = () => {
      if (newRole.value.trim()) {
        RoleOptions.value.push({
          value: newRole.value,
          label: newRole.value,
        });
        employeeRole.value = newRole.value;
        newRole.value = '';
        isRoleModalOpen.value = false;
        ensureAddNewIsLast();
      }
    };

    const clearFields = () => {
      employeeName.value = '';

      employeeBirthDate.value = '';

      employeeRN.value = '';
    };

    const validateRNInput = (event) => {
      const newValue = event.target.value;
      errorMessage.value = validateRN(newValue);
    };

    const verifyAge = (birthDate) => {
      const today = dayjs();
      const birth = dayjs(birthDate);

      return today.diff(birth, 'year');
    };

    return {
      employeeName,
      employeeRN,
      employeeBirthDate,
      employeeBloodType,
      employeeRole,
      company,
      isEditing,
      errorMessage,
      profileImage,
      createEmployee,
      bloodTypeOptions,
      RoleOptions,
      companyOptions,
      handleBloodTypeChange,
      handleRoleChange,
      handleCompanyChange,
      isRoleModalOpen,
      newRole,
      openRoleModal,
      addRole,
      handleDateChange,
      dateFormatList,
      ensureAddNewIsLast,
      validateRNInput,
      clearFields,
      verifyAge,
      employeeAction,
      employeeEdit,
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
          <at-input
            v-model:value="employeeName"
            placeholder="Nome completo"
            text
          />
        </div>

        <div class="content__input">
          <at-number-input
            v-model:value="employeeRN"
            placeholder="Número de registro"
            mask="###########"
            :error-message="errorMessage"
            @input="validateRNInput"
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
            :options="RoleOptions"
            placeholder="Função"
            @change="handleRoleChange"
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
          <a-image :width="225" :height="225" :src="profileImage" />
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
        <a-button type="primary" style="width: 250px" @click="employeeAction">
          Cadastrar
        </a-button>
      </div>
    </div>

    <a-modal v-model:open="isRoleModalOpen" title="Nova Função" @ok="addRole">
      <a-input v-model:value="newRole" placeholder="Digite a nova função" />
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
      margin-bottom: $spacingXxl;
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
