<script>
import AtInput from '@/components/Input/AtInput.vue';
import AtNumberInput from '@/components/Input/AtNumberInput.vue';
import company from '@/services/company';
import employee from '@/services/employee';
import role from '@/services/role';
import { validateRN } from '@/utils/validations/registerNumber';
import { Button, Cascader, DatePicker, Image, Modal } from 'ant-design-vue';
import dayjs from 'dayjs';
import { computed, onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

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
    const roleOptions = ref([]);
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

      const params = {
        id: route.params.id,
        employee_name: employeeName.value,
        birth_date: formattedDate,
        blood_type: employeeBloodType.value,
        employee_Role: employeeRole.value,
        company_id: companyId.value,
        reg_num: employeeRN.value,
      };

      if (isEditing.value) {
        await editEmployee(params);
      } else {
        await createEmployee(params);
      }
    };

    const createEmployee = async (params) => {
      try {
        await employee.create(params);
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

    const editEmployee = async (params) => {
      try {
        await employee.edit(params);
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
        employeeName.value = data.name;
        employeeBirthDate.value = dayjs(data.birth_date, 'DD/MM/YYYY');
        employeeBloodType.value = data.blood_type;
        employeeRN.value = String(data.reg_num);
        employeeRole.value = data.role_id;
        pageTitle.value = `Editar ${employeeName.value}`;
        companyId.value = data.company_id;

        const foundRole = roleOptions.value.find(
          (role) => role.value === data.role_id
        );
        if (foundRole) {
          employeeRole.label = role.label;
        }

        const company = companyOptions.value.find(
          (c) => c.value === data.company_id
        );
        if (company) {
          companyId.label = company.label;
        }
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

    const fetchRoles = async () => {
      try {
        const response = await role.get();
        roleOptions.value = response.data.map((item) => ({
          value: item.id,
          label: item.name,
        }));
        ensureAddNewIsLast();
      } catch (error) {
        console.error('Erro ao buscar funções:', error);
      }
    };

    onMounted(async () => {
      fetchCompanies();
      fetchRoles();
      const employeeId = route.params.id;
      if (!!employeeId) {
        buttonAction.value = 'Editar';
        isEditing.value = true;
        await getEmployee(employeeId);
      } else {
        clearFields();
      }
    });

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
      employeeBloodType.value = '';
      employeeRole.value = '';
      companyId.value = '';
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
      company,
      role,
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
            v-model:value="employeeBloodType"
            :options="bloodTypeOptions"
            placeholder="Tipo Sanguíneo"
            @change="handleBloodTypeChange"
          />
        </div>

        <div class="dropdown">
          <a-cascader
            v-model:value="employeeRole"
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
            v-model:value="companyId"
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
