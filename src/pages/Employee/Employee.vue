<script>
import AtInput from '@/components/Input/AtInput.vue';
import AtNumberInput from '@/components/Input/AtNumberInput.vue';
import employee from '@/services/employee';
import { CameraOutlined } from '@ant-design/icons-vue';
import { validateRN } from '@/utils/validations/registerNumber';
import { Button, Cascader, DatePicker, Upload, Modal } from 'ant-design-vue';
import dayjs from 'dayjs';
import { computed, onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import Contracts from '@/components/Contracts.vue';
import { message } from 'ant-design-vue';
import photo from '@/services/photo';

export default {
  name: 'Employee',

  components: {
    'a-button': Button,
    'a-cascader': Cascader,
    'a-date-picker': DatePicker,
    'a-modal': Modal,
    'at-input': AtInput,
    'at-number-input': AtNumberInput,
    'a-upload': Upload,
    'camera-outlined': CameraOutlined,
    contracts: Contracts,
  },

  setup() {
    const route = useRoute();
    const router = useRouter();
    const dateFormatList = ['DD/MM/YYYY'];
    const defaultProfileImage = '/assets/altave.jpg';
    let employeeContracts = [];
    let gender = 'F';

    const buttonAction = ref('Cadastrar');
    const contractsRef = ref(null);
    const employeeName = ref('');
    const employeeRN = ref('');
    const employeeBirthDate = ref('');
    const employeeBloodType = ref('');
    const errorMessage = ref('');
    const isConfirmationModalOpened = ref(false);
    const pageTitle = ref('Cadastro de funcionário');
    const isEditing = ref(false);
    const profileImage = ref(defaultProfileImage);
    const selectedFile = ref(null);
    const uploading = ref(false);

    const beforeUpload = (file) => {
      const isJpgOrPng =
        file.type === 'image/jpeg' || file.type === 'image/png';
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
        // temporario, para fazer funcionar sem contratos, que será na próxima sprint
        
        // !employeeName.value ||
        // !employeeBirthDate.value ||
        // !employeeBloodType.value ||
        // !employeeRN.value ||
        // profileImage.value === defaultProfileImage ||
        // !employeeContracts.length
        !employeeName.value ||
        !employeeBirthDate.value ||
        !employeeBloodType.value ||
        !employeeRN.value ||
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
        id: route.params.id,
        name: employeeName.value,
        blood_type: employeeBloodType.value,
        birth_date: employeeBirthDate.value,
        register_number: employeeRN.value,
        gender: gender
        // temporario, para fazer funcionar sem contratos, que será na próxima sprint
        // contracts: employeeContracts,
      };

      let employeeId;
      try {
        if (isEditing.value) {
          employeeId = await editEmployee(params);
          await uploadEmployeePhoto(employeeId);
        } else {
          employeeId = await createEmployee(params);
          await uploadEmployeePhoto(employeeId);
          clearFields();
        }
      } catch (error) {
        console.error(error);
      }
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

    const fillContracts = (contracts) => {
      const formattedContracts = [];
      contracts.forEach((contract) => {
        formattedContracts.push({
          company: contract.company,
          role: contract.role,
          datetime_start: contract.datetime_start,
          datetime_end: contract.datetime_end,
        });
      });
      employeeContracts = formattedContracts;
      contractsRef.value.fillContracts(formattedContracts);
    };

    const getEmployee = async (employeeId) => {
      try {
        const { data } = await employee.get(employeeId);
        employeeName.value = data.name;
        employeeBirthDate.value = dayjs(data.birth_date);
        employeeBloodType.value = data.blood_type;
        employeeRN.value = String(data.register_number);
        gender = data.gender
        fillContracts(data.contracts);

        pageTitle.value = `Editar ${employeeName.value}`;
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

    onMounted(async () => {
      const employeeId = route.params.id;
      if (!!employeeId) {
        buttonAction.value = 'Editar';
        isEditing.value = true;
        await Promise.all([getEmployee(employeeId), getPhoto(employeeId)]);
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

    const handleDateChange = (date) => {
      employeeBirthDate.value = date;
    };

    const clearFields = () => {
      employeeName.value = '';
      employeeBirthDate.value = '';
      employeeRN.value = '';
      employeeBloodType.value = '';
      employeeRN.value = '';
      contractsRef.value.resetContracts();
      profileImage.value = defaultProfileImage;
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
      addContract,
      beforeUpload,
      bloodTypeOptions,
      buttonAction,
      contractsRef,
      customRequest,
      dateFormatList,
      defaultProfileImage,
      deleteEmployee,
      employeeBirthDate,
      employeeBloodType,
      employeeName,
      employeeRN,
      employeeAction,
      errorMessage,
      handleBloodTypeChange,
      handleDateChange,
      handleImageChange,
      isConfirmationModalOpened,
      openConfirmationModal,
      pageTitle,
      profileImage,
      showDeleteButton,
      uploading,
      validateRNInput,
    };
  },
};
</script>
<template>
  <div class="employee">
    <h1>{{ pageTitle }}</h1>

    <div class="employee__content">
      <div class="content__inputs">
        <div class="left-column">
          <at-input
            v-model:value="employeeName"
            placeholder="Nome completo"
            text
          />
          <at-number-input
            v-model:value="employeeRN"
            placeholder="Número de registro"
            mask="###########"
            :error-message="errorMessage"
            @input="validateRNInput"
          />
          <a-date-picker
            v-model:value="employeeBirthDate"
            placeholder="Data de nascimento"
            valueFormat="YYYY-MM-DDTHH:mm:ss.SSSZ"
            :format="dateFormatList"
            @change="handleDateChange"
          />
          <a-cascader
            v-model:value="employeeBloodType"
            placeholder="Tipo Sanguíneo"
            style="width: 100%"
            :options="bloodTypeOptions"
            @change="handleBloodTypeChange"
          />
        </div>

        <div class="right-column">
          <a-upload
            class="employee-image__wrapper"
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
              class="employee-image"
              :src="profileImage"
            />
          </a-upload>
        </div>
      </div>
      <contracts ref="contractsRef" @add-contract="addContract" />
      <div class="content__action">
        <a-button
          v-if="showDeleteButton"
          danger
          style="width: 250px"
          @click="openConfirmationModal"
        >
          Deletar funcionario
        </a-button>
        <a-button
          type="primary"
          style="width: 250px"
          :loading="uploading"
          @click="employeeAction"
        >
          {{ buttonAction }}
        </a-button>
      </div>
    </div>

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

  .employee__content {
    padding: $spacingXxl 0px;
    display: flex;
    flex-wrap: wrap;
    overflow: auto;
    gap: $spacingXxl;

    .content__inputs {
      display: flex;
      gap: $spacingXxl;
      flex: 1 1 calc(100% - $spacingXxl);

      .left-column {
        display: flex;
        flex-direction: column;
        gap: $spacingXxl;
        flex: 1 1 calc(50% - $spacingXxl/2);
      }
      .right-column {
        flex: 1 1 calc(50% - $spacingXxl/2);
        text-align: center;

        .employee-image__wrapper {
          max-height: 100%;
          max-width: 100%;
          height: 100%;
          width: 100%;

          .employee-image {
            height: 100%;
            width: 100%;
          }
        }
      }
    }
    .content__contracts {
      display: flex;
      flex: 1 1 auto;
      gap: $spacingXxl;
    }
    .content__action {
      flex: 0 0 100%;
      display: flex;
      justify-content: center;
      gap: $spacingMd;
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