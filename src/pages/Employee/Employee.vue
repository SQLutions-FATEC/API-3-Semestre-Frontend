<script>
import { Button, Cascader, DatePicker, Image, Modal } from 'ant-design-vue';
import { onMounted, ref } from 'vue';
import { validateRN } from '@/utils/validations/registerNumber';
import { useRoute } from 'vue-router';
import { computed } from 'vue';
import dayjs from 'dayjs';
import employee from '@/services/employee';
import AtNumberInput from '@/components/Input/AtNumberInput.vue';
import AtInput from '@/components/Input/AtInput.vue';

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
    const route = useRoute();
    const dateFormatList = ['DD/MM/YYYY'];
    const employeeName = ref('');
    const employeeRN = ref('');
    const employeeBirthDate = ref(dayjs());
    const employeeBloodType = ref('');
    const employeeFunction = ref('');
    const isEditing = ref(false);
    const isConfirmationModalOpened = ref(false);
    const company = ref('');
    const errorMessage = ref('');
    const isFunctionModalOpen = ref(false);
    const newFunction = ref('');
    const profileImage = ref(
      'https://i.pinimg.com/custom_covers/222x/85498161615209203_1636332751.jpg'
    );

    const createEmployee = async () => {
      if (
        !employeeName.value ||
        !employeeBirthDate.value ||
        !employeeBloodType.value ||
        !employeeFunction.value ||
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

      const formattedEmployeeDate =
        employeeBirthDate.value.format('YYYY-MM-DD');

      const payload = {
        employee_name: employeeName.value,
        employee_birth_date: formattedEmployeeDate,
        employee_blood_type: employeeBloodType.value,
        employee_function: employeeFunction.value,
        company: company.value,
        employee_rn: employeeRN.value,
      };

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

    const deleteEmployee = async () => {
      try {
        const employeeId = route.params.id;
        await employee.delete(employeeId);
        isConfirmationModalOpened.value = false;
        router.push({ name: 'Home' });
      } catch (error) {
        console.error(error);
      }
    };

    const openConfirmationModal = () => {
      isConfirmationModalOpened.value = true;
    };

    const handleBloodTypeChange = (value) => {
      if (value != null) {
        employeeBloodType.value = value[0];
      }
    };

    const handleFunctionChange = (value) => {
      if (value != null) {
        if (value.includes('add-new')) {
          employeeFunction.value = [];
          openFunctionModal();
          ensureAddNewIsLast();
        } else {
          employeeFunction.value = value[0];
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

    onMounted(async () => {
      const employeeId = route.params.id;
      if (!!employeeId) {
        isEditing.value = true;
      }
    });

    const showDeleteButton = computed(() => {
      // enquanto nao refatora tela de edit pra ser a mesma que essa, deixei sempre true
      return isEditing.value || true
    })

    return {
      deleteEmployee,
      employeeName,
      employeeRN,
      employeeBirthDate,
      employeeBloodType,
      employeeFunction,
      isConfirmationModalOpened,
      company,
      errorMessage,
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
      openConfirmationModal,
      addFunction,
      handleDateChange,
      dateFormatList,
      ensureAddNewIsLast,
      showDeleteButton,
      clearFields,
      validateRNInput,
      verifyAge,
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
        <a-button v-if="showDeleteButton" danger style="width: 250px" @click="openConfirmationModal">
          Deletar funcionario
        </a-button>
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
    <a-modal
      v-model:open="isConfirmationModalOpened"
      title="Deletar funcionário"
      @ok="deleteEmployee"
    >
      <span>
        Tem certeza que deseja deletar o funcionário {{ employeeName.value }}?
      </span>
    </a-modal>
  </div>
</template>

<style lang="scss" scoped>
.employee {
  padding: $spacingXxl 0px;

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
      flex: 0 0 100%;
      display: flex;
      justify-content: center;
      gap: 12px;
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
