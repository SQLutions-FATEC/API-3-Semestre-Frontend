<script>
import { Button, Cascader, DatePicker, Modal, Upload, message } from 'ant-design-vue';
import { CameraOutlined } from '@ant-design/icons-vue';
import { Button, Cascader, DatePicker, Modal, Upload, message, Image } from 'ant-design-vue';
import { CameraOutlined } from '@ant-design/icons-vue';
import { onMounted, ref, computed } from 'vue';
import { validateRN } from '@/utils/validations/registerNumber';
import { useRoute, useRouter } from 'vue-router';
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
    'a-upload': Upload,
    'a-upload': Upload,
    'a-image': Image,
    'at-input': AtInput,
    'at-number-input': AtNumberInput,
    CameraOutlined,
  },

  setup() {
    const dateFormatList = ['DD/MM/YYYY'];
    const employeeName = ref('');
    const employeeRN = ref('');
    const employeeBirthDate = ref(dayjs());
    const employeeBloodType = ref('');
    const employeeFunction = ref('');
    const company = ref('');
    const errorMessage = ref('');
    const isFunctionModalOpen = ref(false);
    const newFunction = ref('');
    const defaultProfileImage = 'https://i.pinimg.com/custom_covers/222x/85498161615209203_1636332751.jpg';
    const profileImage = ref(defaultProfileImage);

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
        return;
      }
      if (info.file.status === 'done') {
        message.success(`${info.file.name} carregado com sucesso`);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} falhou no upload.`);
      }
    };

    const customRequest = ({ file, onSuccess, onError }) => {
      const reader = new FileReader();

      reader.onload = () => {
        profileImage.value = reader.result;
        onSuccess("Imagem carregada com sucesso", file);
      };

      reader.onerror = (error) => {
        onError(error);
      };

      reader.readAsDataURL(file);
    };
    const isConfirmationModalOpened = ref(false);
    const isEditing = ref(false);
    const defaultProfileImage = profileImage.value;

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
        return;
      }
      if (info.file.status === 'done') {
        message.success(`${info.file.name} carregado com sucesso`);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} falhou no upload.`);
      }
    };

    const customRequest = ({ file, onSuccess, onError }) => {
      const reader = new FileReader();

      reader.onload = () => {
        profileImage.value = reader.result;
        onSuccess("Imagem carregada com sucesso", file);
      };

      reader.onerror = (error) => {
        onError(error);
      };

      reader.readAsDataURL(file);
    };

    const createEmployee = async () => {
      if (
        !employeeName.value ||
        !employeeBirthDate.value ||
        !employeeBloodType.value ||
        !employeeFunction.value ||
        !company.value ||
        !employeeRN.value
      ) {
        message.error('Todos os campos são obrigatórios');
        return;
      }

      if (verifyAge(employeeBirthDate.value) < 16) {
        message.error('Não é possivel cadastrar usuários menores de 16 anos');
        return;
      }

      const formattedEmployeeDate = employeeBirthDate.value.format('YYYY-MM-DD');

      const formData = new FormData();
      formData.append('employee_name', employeeName.value);
      formData.append('employee_birth_date', formattedEmployeeDate);
      formData.append('employee_blood_type', employeeBloodType.value);
      formData.append('employee_function', employeeFunction.value);
      formData.append('company', company.value);
      formData.append('employee_rn', employeeRN.value);

      if (profileImage.value && profileImage.value !== defaultProfileImage) {
        const blob = await fetch(profileImage.value).then(res => res.blob());
        formData.append('profile_image', blob, 'profile.jpg');
      }

      try {
        await employee.create(formData);
        message.success(`Usuário ${employeeName.value} cadastrado com sucesso`);
        clearFields();
      } catch (error) {
        console.error('Erro completo:', error);
        message.error('Erro ao cadastrar funcionário');
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
      employeeBirthDate.value = dayjs();
      employeeRN.value = '';
      profileImage.value = defaultProfileImage;
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

    const showDeleteButton = computed(() => {
      return isEditing.value || true;
    });

    onMounted(async () => {
      const employeeId = route.params.id;
      if (!!employeeId) {
        isEditing.value = true;
      }
    });

    return {
      employeeName,
      employeeRN,
      employeeBirthDate,
      employeeBloodType,
      employeeFunction,
      company,
      errorMessage,
      profileImage,
      defaultProfileImage,
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
      validateRNInput,
      clearFields,
      verifyAge,
      beforeUpload,
      handleImageChange,
      customRequest,
      beforeUpload,
      handleImageChange,
      customRequest,
      deleteEmployee,
      openConfirmationModal,
      showDeleteButton,
    };
  },
};
</script>


<template>
  <div class="employee">
    <h1>Cadastro de Funcionário</h1>

    <div class="employee_content">
      <div class="form-column left-column">
        <div class="form-field">
          <at-input
            v-model:value="employeeName"
            placeholder="Nome completo"
            text
          />
        </div>

        <div class="form-field">
          <at-number-input
            v-model:value="employeeRN"
            placeholder="Número de registro"
            mask="###########"
            :error-message="errorMessage"
            @input="validateRNInput"
          />
        </div>

        <div class="form-field">
          <a-date-picker
            v-model:value="employeeBirthDate"
            placeholder="Data de nascimento"
            :format="dateFormatList"
            @change="handleDateChange"
          />
        </div>

        <div class="form-field">
          <a-cascader
            :options="bloodTypeOptions"
            placeholder="Tipo Sanguíneo"
            @change="handleBloodTypeChange"
          />
        </div>

        <div class="form-field">
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

      <div class="form-column right-column">
        <div class="photo-upload-container">
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

        <div class="form-field">
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

      <div class="form-actions">
        <a-button type="primary" @click="createEmployee">
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
  padding: 24px;
  max-width: 1200px;
  margin: 0 auto;

  h1 {
    text-align: center;
    margin-bottom: 32px;
    color: #333;
  }

  .employee_content {
    display: flex;
    flex-wrap: wrap;
    gap: 40px;
    justify-content: space-between;
  }

  .form-column {
    flex: 1;
    min-width: 300px;
    max-width: calc(50% - 20px);

    &.left-column {
      padding-right: 20px;
    }

    &.right-column {
      display: flex;
      flex-direction: column;
      gap: 24px;
    }
  }

  .form-field {
    margin-bottom: 24px;
    width: 100%;

    :deep(.ant-picker),
    :deep(.ant-cascader),
    :deep(.ant-input) {
      width: 100%;
      height: 40px;
    }
  }

  .photo-upload-container {
    display: flex;
    justify-content: center;
    margin-bottom: 24px;

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

  .form-actions {
    width: 100%;
    display: flex;
    justify-content: center;
    margin-top: 24px;

    .ant-btn {
      height: 40px;
      min-width: 200px;
      font-weight: 500;
    }
  }
}

@media (max-width: 768px) {
  .employee {
    padding: 16px;

    .employee_content {
      flex-direction: column;
      gap: 24px;
    }

    .form-column {
      max-width: 100%;

      &.left-column {
        padding-right: 0;
      }
    }

    .photo-upload-container {
      margin: 0 auto 24px;
    }
  }
}
</style>