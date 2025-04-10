<script>
import { Button, Cascader, DatePicker, Image, Modal } from 'ant-design-vue';
import { onMounted, ref } from 'vue';
import { validateRN } from '@/utils/validations/registerNumber';
import { useRoute, useRouter } from 'vue-router';
import { computed } from 'vue';
import dayjs from 'dayjs';
import router from '../../router/router';
import employee from '@/services/employee';
import company from '@/services/company';
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
    const router = useRouter();
    const dateFormatList = ['DD/MM/YYYY'];
    const employeeName = ref('');
    const employeeRN = ref('');
    const employeeBirthDate = ref(null);
    const employeeBloodType = ref('');
    const employeeRole = ref('');
    const isConfirmationModalOpened = ref(false);
    const companyId = ref('');
    const companyOptions = ref([]);
    const pageTitle = ref('Cadastro de funcionário');
    const buttonAction = ref('Cadastrar');
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
        !companyId.value ||
        !employeeRN.value
      ) {
        alert('Todos os campos são obrigatórios');
        return;
      }
      const age = verifyAge(employeeBirthDate.value);

      if (age < 16 || age > 100) {
        alert('Não é possivel cadastrar usuários com esta idades');
        return;
      }

      const formattedDate = employeeBirthDate.value.format('DD/MM/YYYY');

      const payload = {
        employee_name: employeeName.value,
        employee_birth_date: formattedDate,
        employee_blood_type: employeeBloodType.value,
        employee_Role: employeeRole.value,
        company_id: companyId.value,
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
        //await employee.edit(payload);
        alert(`Usuario ${employeeName.value} foi editado`);
      } catch (error) {
        console.error('Erro completo:', {
          message: error.message,
          response: error.response?.data,
          status: error.response?.status,
          config: error.config,
        });
      }
    };

    const getEmployee = async (employeeId) => {
      try {
        const { data } = await employee.get(employeeId);
        employeeName.value = data.employee_name;
        employeeBirthDate.value = data.employee_birth_date;
        employeeBloodType.value = data.employee_blood_type;
        employeeRole.value = data.employee_role;
        companyId.value = data.company_id;
        employeeRN.value = String(data.employee_rn);
        pageTitle.value = `Editar ${employeeName.value}`;
      } catch (error) {
        console.error(error);
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

    const fetchCompanies = async () => {
      try {
        const response = await company.get();
        companyOptions.value = response.data.map((item) => ({
          value: item.id,
          label: item.company_name,
        }));
      } catch (error) {
        console.error('Erro ao buscar empresas:', error);
      }
    };

    onMounted(async () => {
      fetchCompanies();
      const employeeId = route.params.id;
      if (!!employeeId) {
        buttonAction.value = 'Editar';
        isEditing.value = true;
        await getEmployee(employeeId);
      } else {
        clearFields();
      }
    });

    const roleOptions = ref([
      { value: 'Engenheiro', label: 'Engenheiro' },
      { value: 'Mecânico', label: 'Mecânico' },
      { value: 'Pintor', label: 'Pintor' },
    ]);

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
        companyId.value = value[0];
      }
    };

    const handleDateChange = (date) => {
      employeeBirthDate.value = date;
    };

    const ensureAddNewIsLast = () => {
      const regularOptions = roleOptions.value.filter(
        (opt) => opt.value !== 'add-new'
      );

      roleOptions.value = [
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
        roleOptions.value.push({
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

      employeeBirthDate.value = null;

      employeeRN.value = '';
    };

    const validateRNInput = (event) => {
      const newValue = event.target.value;
      errorMessage.value = validateRN(newValue);
    };

    const verifyAge = (birthDate) => {
      return dayjs().diff(birthDate, 'year');
    };

    const showDeleteButton = computed(() => {
      // enquanto nao refatora tela de edit pra ser a mesma que essa, deixei sempre true
      return isEditing.value || true;
    });

    return {
      deleteEmployee,
      employeeName,
      employeeRN,
      employeeBirthDate,
      employeeBloodType,
      employeeRole,
      isConfirmationModalOpened,
      companyId,
      buttonAction,
      isEditing,
      errorMessage,
      profileImage,
      createEmployee,
      bloodTypeOptions,
      roleOptions,
      companyOptions,
      handleBloodTypeChange,
      handleRoleChange,
      handleCompanyChange,
      isRoleModalOpen,
      newRole,
      openRoleModal,
      openConfirmationModal,
      addRole,
      handleDateChange,
      dateFormatList,
      ensureAddNewIsLast,
      showDeleteButton,
      clearFields,
      validateRNInput,
      verifyAge,
      employeeAction,
      onMounted,
      fetchCompanies,
      getEmployee,
      router,
      route,
      pageTitle,
    };
  },
};
</script>
<template>
  <div class="employee">
    <h1>{{ pageTitle }}</h1>

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
            :options="roleOptions"
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
        <a-button
          v-if="showDeleteButton"
          danger
          style="width: 250px"
          @click="openConfirmationModal"
        >
          Deletar funcionario
        </a-button>
        <a-button type="primary" style="width: 250px" @click="employeeAction">
          {{ buttonAction }}
        </a-button>
      </div>
    </div>

    <a-modal v-model:open="isRoleModalOpen" title="Nova Função" @ok="addRole">
      <a-input v-model:value="newRole" placeholder="Digite a nova função" />
    </a-modal>
    <a-modal
      v-model:open="isConfirmationModalOpened"
      title="Deletar funcionário"
      @ok="deleteEmployee"
    >
      <span>
        Tem certeza que deseja deletar o funcionário {{ employeeName }}?
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
