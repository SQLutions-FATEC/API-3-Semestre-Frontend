<script>
import { inject } from 'vue';
import AtInput from '@/components/Input/AtInput.vue';
import AtNumberInput from '@/components/Input/AtNumberInput.vue';
import employee from '@/services/employee';
import { CameraOutlined } from '@ant-design/icons-vue';
import { validateRN } from '@/utils/validations/registerNumber';
import {
  Button,
  Cascader,
  DatePicker,
  Divider,
  Upload,
  Modal,
} from 'ant-design-vue';
import dayjs from 'dayjs';
import { computed, onMounted, ref } from 'vue';
import Contracts from '@/components/Contracts/Contracts.vue';
import { message } from 'ant-design-vue';
import photo from '@/services/photo';

export default {
  name: 'EmployeeModal',

  props: {
    employeeId: {
      default: null,
      type: Number,
    },
    open: {
      required: true,
      type: Boolean,
    },
  },

  components: {
    'a-button': Button,
    'a-cascader': Cascader,
    'a-date-picker': DatePicker,
    'a-divider': Divider,
    'a-modal': Modal,
    'at-input': AtInput,
    'at-number-input': AtNumberInput,
    'a-upload': Upload,
    'camera-outlined': CameraOutlined,
    contracts: Contracts,
  },

  setup(props, { emit }) {
    const apiCall = inject('apiCall');
    const dateFormatList = ['DD/MM/YYYY'];
    const defaultProfileImage = '/assets/altave.jpg';
    let employeeContracts = [];

    const contractsRef = ref(null);
    const employeeName = ref('');
    const employeeRN = ref('');
    const employeeBirthDate = ref('');
    const employeeBloodType = ref('');
    const employeeGender = ref('');
    const errorMessage = ref('');
    const isEditing = ref(false);
    const profileImage = ref(defaultProfileImage);
    const selectedFile = ref(null);
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

    const closeModal = () => {
      emit('update:open', false);
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
      selectedFile.value = file;
      const reader = new FileReader();
      reader.onload = () => {
        profileImage.value = URL.createObjectURL(file);
        onSuccess('Imagem carregada com sucesso', file);
      };
      reader.onerror = (error) => {
        onError(error);
      };
      reader.readAsDataURL(file);
    };

    const addContract = (contract) => {
      employeeContracts.push(contract);
    };

    const employeeAction = async () => {
      if (
        !employeeName.value ||
        !employeeBirthDate.value ||
        !employeeBloodType.value ||
        !employeeRN.value ||
        !employeeGender.value ||
        profileImage.value === defaultProfileImage
      ) {
        message.error('Todos os campos são obrigatórios');
        return;
      }
      const age = verifyAge(employeeBirthDate.value);

      if (age < 16 || age > 100) {
        message.error('Não é possivel cadastrar usuários com esta idade');
        return;
      }

      const params = {
        name: employeeName.value,
        blood_type: employeeBloodType.value,
        birth_date: employeeBirthDate.value,
        register_number: employeeRN.value,
        gender: employeeGender.value,
      };

      try {
        if (isEditing.value) {
          params.id = props.employeeId;
          await editEmployee(params);
          editContract(props.employeeId);
          await uploadEmployeePhoto(props.employeeId);
        } else {
          params.contracts = employeeContracts;
          const employeeId = await createEmployee(params);
          createContracts(employeeId);
          await uploadEmployeePhoto(employeeId);
          clearFields();
        }
      } catch (error) {
        console.error(error);
      }

      closeModal();
      await apiCall();
    };

    const createEmployee = async (params) => {
      try {
        const { data } = await employee.create(params);
        message.success(`Usuario ${employeeName.value} cadastrado com sucesso`);
        return data.id;
      } catch (error) {
        message.error('Erro completo:', {
          message: error.message,
          response: error.response?.data,
          status: error.response?.status,
          config: error.config,
        });
      }
    };

    const createContracts = (employeeId) => {
      contractsRef.value.createContracts(employeeId);
    };

    const editEmployee = async (params) => {
      try {
        const { data } = await employee.edit(params);
        message.success(`Usuario ${employeeName.value} foi editado`);
        return data.id;
      } catch (error) {
        console.error('Erro completo:', {
          message: error.message,
          response: error.response?.data,
          status: error.response?.status,
          config: error.config,
        });
      }
    };

    const editContract = (employeeId) => {
      contractsRef.value.editContract(employeeId);
    };

    const getEmployee = async (employeeId) => {
      try {
        const { data } = await employee.get(employeeId);
        employeeName.value = data.name;
        employeeBirthDate.value = dayjs(data.birth_date);
        employeeBloodType.value = data.blood_type;
        employeeRN.value = String(data.register_number);
        employeeGender.value = data.gender;
      } catch (error) {
        console.error(error);
      }
    };

    const getPhoto = async (employeeId) => {
      try {
        const { data } = await photo.getByEmployee(employeeId);
        const imageUrl = URL.createObjectURL(data);
        profileImage.value = imageUrl;
      } catch (error) {
        console.error(error);
      }
    };

    const uploadEmployeePhoto = async (employeeId) => {
      if (selectedFile.value && profileImage.value !== defaultProfileImage) {
        try {
          const formData = new FormData();
          formData.append('file', selectedFile.value);
          formData.append('employeeId', employeeId.toString());

          await photo.create(formData);
        } catch (error) {
          console.error('Erro ao enviar foto:', error);
        }
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

    const genderOptions = [
      { value: 'Masculino', label: 'Masculino' },
      { value: 'Feminino', label: 'Feminino' },
    ];

    onMounted(async () => {
      const employeeId = props.employeeId;

      if (!!employeeId) {
        isEditing.value = true;
        await Promise.all([getEmployee(employeeId), getPhoto(employeeId)]);
      }
    });

    const handleBloodTypeChange = (value) => {
      if (value != null) {
        employeeBloodType.value = value[0];
      }
    };

    const handleGenderChange = (value) => {
      if (value != null) {
        employeeGender.value = value[0];
      }
    };

    const handleDateChange = (date) => {
      employeeBirthDate.value = date;
    };

    const clearFields = () => {
      employeeName.value = '';
      employeeBirthDate.value = '';
      employeeRN.value = '';
      employeeBloodType.value = '';
      employeeGender.value = '';
      employeeRN.value = '';
      profileImage.value = defaultProfileImage;
      contractsRef.value.clearFields();
    };

    const validateRNInput = (event) => {
      const newValue = event.target.value;
      errorMessage.value = validateRN(newValue);
    };

    const verifyAge = (birthDate) => {
      return dayjs().diff(birthDate, 'year');
    };

    const modalTitle = computed(() => {
      return isEditing.value ? 'Editar Funcionário' : 'Cadastrar Funcionário';
    });

    return {
      closeModal,
      addContract,
      beforeUpload,
      bloodTypeOptions,
      genderOptions,
      contractsRef,
      customRequest,
      dateFormatList,
      defaultProfileImage,
      employeeBirthDate,
      employeeBloodType,
      employeeName,
      employeeRN,
      employeeGender,
      employeeAction,
      errorMessage,
      handleBloodTypeChange,
      handleDateChange,
      handleGenderChange,
      handleImageChange,
      modalTitle,
      profileImage,
      uploading,
      validateRNInput,
    };
  },
};
</script>

<template>
  <a-modal
    :open="open"
    :title="modalTitle"
    :width="800"
    @cancel="closeModal"
    @ok="employeeAction"
  >
    <div class="employee-modal">
      <div class="modal__content">
        <label>Foto do Funcionário</label>
        <a-upload
          class="content__image"
          list-type="picture-card"
          name="avatar"
          :show-upload-list="false"
          :before-upload="beforeUpload"
          :custom-request="customRequest"
          @change="handleImageChange"
        >
          <template v-if="profileImage === defaultProfileImage">
            <div>
              <camera-outlined />
              <div>Adicionar Foto</div>
            </div>
          </template>
          <img
            v-else
            alt="Foto do Funcionário"
            class="image"
            :src="profileImage"
          />
        </a-upload>

        <div class="input-group">
          <label>Nome completo</label>
          <at-input
            v-model:value="employeeName"
            placeholder="Nome completo"
            text
          />
        </div>

        <div class="input-group">
          <label>Número de registro</label>
          <at-number-input
            v-model:value="employeeRN"
            placeholder="Número de registro"
            mask="###.#####.##-#"
            :error-message="errorMessage"
            @input="validateRNInput"
          />
        </div>

        <div class="input-group">
          <label>Data de nascimento</label>
          <a-date-picker
            v-model:value="employeeBirthDate"
            placeholder="Data de nascimento"
            valueFormat="YYYY-MM-DDTHH:mm:ss.SSSZ"
            :format="dateFormatList"
            @change="handleDateChange"
          />
        </div>

        <div class="content__dates">
          <div class="input-group">
            <label>Tipo Sanguíneo</label>
            <a-cascader
              v-model:value="employeeBloodType"
              placeholder="Tipo Sanguíneo"
              :options="bloodTypeOptions"
              @change="handleBloodTypeChange"
              style="width: 100%"
            />
          </div>
          <div class="input-group">
            <label>Gênero</label>
            <a-cascader
              v-model:value="employeeGender"
              placeholder="Gênero"
              style="width: 100%"
              :options="genderOptions"
              @change="handleGenderChange"
            />
          </div>
        </div>

        <a-divider />
        <contracts
          ref="contractsRef"
          :employee-id="employeeId"
          @add-contract="addContract"
        />
      </div>
    </div>
  </a-modal>
</template>

<style lang="scss" scoped>
.employee-modal {
  display: flex;
  flex-direction: column;
  gap: $spacingLg;

  .modal__content {
    display: flex;
    flex-direction: column;
    gap: $spacingXxl;

    .input-group {
      display: flex;
      flex-direction: column;
      gap: 4px;  // Espaçamento reduzido apenas entre label e input
      margin-bottom: 0;
    }

    .content__image {
      height: 220px;
      width: 220px;
      margin: 0px auto; // Mantido o espaçamento original
    }

    .ant-upload .image {
      height: 220px;
      width: 220px;
      object-fit: cover;
    }

    .content__dates {
      display: flex;
      gap: $spacingSm;
    }
  }
}

:deep(.ant-upload),
.ant-upload-select {
  height: 100% !important;
  width: 100% !important;
  margin: 0px !important;
}
</style>