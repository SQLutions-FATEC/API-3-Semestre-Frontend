<script>
import { Button, Cascader, DatePicker, Image, Modal, Upload, message } from 'ant-design-vue';
import { CameraOutlined } from '@ant-design/icons-vue';
import { onMounted, ref } from 'vue';
import { validateRN } from '@/utils/validations/registerNumber';
import { useRoute, useRouter } from 'vue-router';
import { computed } from 'vue';
import dayjs from 'dayjs';
import router from '../../router/router';
import employee from '@/services/employee';
import company from '@/services/company';
import role from '@/services/role';
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
    'a-upload': Upload,
    CameraOutlined,
  },

  setup() {
    const route = useRoute();
    const router = useRouter();
    const dateFormatList = ['DD/MM/YYYY'];
    const employeeName = ref('');
    const employeeRN = ref('');
    const employeeBirthDate = ref('');
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
    const defaultProfileImage = 'https://i.pinimg.com/custom_covers/222x/85498161615209203_1636332751.jpg';
    const profileImage = ref(defaultProfileImage);
    const fileList = ref([]);
    const uploading = ref(false);

    const beforeUpload = (file) => {
      const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
      if (!isJpgOrPng) {
        message.error('Você só pode enviar arquivos JPG/PNG!');
      }
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        message.error('A imagem deve ser menor que 2MB!');
      }
      return isJpgOrPng && isLt2M;
    };

    const handleImageChange = (info) => {
      if (info.file.status === 'uploading') {
        uploading.value = true;
        return;
      }
      if (info.file.status === 'done') {
        message.success(`${info.file.name} carregado com sucesso`);
        uploading.value = false;
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} falhou no upload.`);
        uploading.value = false;
      }
    };

const customRequest = ({ file, onSuccess, onError }) => {
  const reader = new FileReader();

  reader.onload = () => {
    // Armazena apenas a representação em base64 da imagem
    const base64String = reader.result.split(',')[1];
    profileImage.value = `data:image/jpeg;base64,${base64String}`;
    onSuccess("Imagem carregada com sucesso", file);
  };

  reader.onerror = (error) => {
    onError(error);
  };

  reader.readAsDataURL(file);
};


    const employeeAction = async () => {
      if (
        !employeeName.value ||
        !employeeBirthDate.value ||
        !employeeBloodType.value ||
        !employeeRole.value ||
        !companyId.value ||
        !employeeRN.value
      ) {
        message.error('Todos os campos são obrigatórios');
        return;
      }
      const age = verifyAge(employeeBirthDate.value);

      if (age < 16 || age > 100) {
        message.error('Não é possivel cadastrar usuários com esta idade');
        return;
      }

      const formattedDate = employeeBirthDate.value.format('DD/MM/YYYY');

      const payload = {
        employee_id: route.params.id,
        employee_name: employeeName.value,
        employee_birth_date: formattedDate,
        employee_blood_type: employeeBloodType.value,
        employee_role: employeeRole.value,
        company_id: companyId.value,
        employee_rn: employeeRN.value,
      };

  if (profileImage.value && profileImage.value !== defaultProfileImage) {
    const base64Data = profileImage.value.split(',')[1];
    payload.profile_image_base64 = base64Data;
  }

      if (isEditing.value) {
        await editEmployee(payload);
      } else {
        await createEmployee(payload);
      }
    };

    const createEmployee = async (payload) => {
      try {
        await employee.create(payload);
        message.success(`Usuário ${employeeName.value} cadastrado com sucesso`);
        clearFields();
        router.push({ name: 'Home' });
      } catch (error) {
        console.error('Erro completo:', {
          message: error.message,
          response: error.response?.data,
          status: error.response?.status,
          config: error.config,
        });
        message.error('Erro ao cadastrar funcionário');
      }
    };

    const editEmployee = async (payload) => {
      try {
        await employee.edit(payload);
        message.success(`Usuário ${employeeName.value} foi editado com sucesso`);
        router.push({ name: 'Home' });
      } catch (error) {
        console.error('Erro completo:', {
          message: error.message,
          response: error.response?.data,
          status: error.response?.status,
          config: error.config,
        });
        message.error('Erro ao editar funcionário');
      }
    };

    const getEmployee = async (employeeId) => {
      try {
        const { data } = await employee.get(employeeId);
        employeeName.value = data.employee_name;
        employeeBirthDate.value = dayjs(data.birth_date, 'DD/MM/YYYY');
        employeeBloodType.value = data.blood_type;
        employeeRole.value = data.role_id;

        if (data.profile_image) {
          profileImage.value = data.profile_image;
        }

        const foundRole = roleOptions.value.find(
          (role) => role.value === data.role_id
        );
        if (foundRole) {
          employeeRole.label = role.label;
        }

        companyId.value = data.company_id;

        const company = companyOptions.value.find(
          (c) => c.value === data.company_id
        );
        if (company) {
          companyId.label = company.label;
        }

        employeeRN.value = String(data.reg_num);
        pageTitle.value = `Editar ${employeeName.value}`;
      } catch (error) {
        console.error(error);
        message.error('Erro ao carregar dados do funcionário');
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
        message.error('Erro ao carregar empresas');
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
        message.error('Erro ao carregar funções');
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
        message.success('Funcionário deletado com sucesso');
        router.push({ name: 'Home' });
      } catch (error) {
        console.error(error);
        message.error('Erro ao deletar funcionário');
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
      employeeBirthDate.value = '';
      employeeRN.value = '';
      employeeBloodType.value = '';
      employeeRole.value = '';
      companyId.value = '';
      employeeRN.value = '';
      profileImage.value = defaultProfileImage;
      fileList.value = [];
    };

    const validateRNInput = (event) => {
      const newValue = event.target.value;
      errorMessage.value = validateRN(newValue);
    };

    const verifyAge = (birthDate) => {
      return dayjs().diff(birthDate, 'year');
    };

    const showDeleteButton = computed(() => {
      return isEditing.value;
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
      defaultProfileImage,
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
      beforeUpload,
      handleImageChange,
      customRequest,
      fileList,
      uploading,
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
          <a-upload
            name="avatar"
            list-type="picture-card"
            class="avatar-uploader"
            :show-upload-list="false"
            :before-upload="beforeUpload"
            :custom-request="customRequest"
            @change="handleImageChange"
          >
            <template v-if="profileImage === defaultProfileImage">
              <div class="upload-placeholder">
                <camera-outlined />
                <div class="upload-text">Adicionar Foto</div>
              </div>
            </template>
            <img
              v-else
              :src="profileImage"
              alt="Foto do Funcionário"
              class="profile-image"
            />
          </a-upload>
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
        <a-button type="primary" style="width: 250px" @click="employeeAction" :loading="uploading">
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

      :deep(.avatar-uploader) {
        width: 225px;
        height: 225px;

        .ant-upload {
          width: 100% !important;
          height: 100% !important;
          margin: 0;
          padding: 0;
          border-radius: 8px;
          border: 1px dashed #d9d9d9;
          background: #fafafa;
          transition: border-color 0.3s;

          &:hover {
            border-color: #1890ff;
          }

          .upload-placeholder {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            height: 100%;
            color: #666;

            .anticon {
              font-size: 32px;
              margin-bottom: 12px;
              color: #999;
            }

            .upload-text {
              font-size: 14px;
            }
          }

          img.profile-image {
            width: 100%;
            height: 100%;
            object-fit: cover;
            border-radius: 8px;
          }
        }
      }
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