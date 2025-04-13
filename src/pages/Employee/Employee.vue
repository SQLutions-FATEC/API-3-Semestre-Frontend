<script>
import { Button, Cascader, DatePicker, Modal, Upload, message, Image } from 'ant-design-vue';
import { CameraOutlined } from '@ant-design/icons-vue';
import { onMounted, ref, computed } from 'vue';
import { validateRN } from '@/utils/validations/registerNumber';
import { useRoute, useRouter } from 'vue-router';
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
    'a-upload': Upload,
    'a-image': Image,
    'at-input': AtInput,
    'at-number-input': AtNumberInput,
    CameraOutlined,
  },

  setup() {
    const route = useRoute();
    const router = useRouter();
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
    const profileImage = ref(
      'https://i.pinimg.com/custom_covers/222x/85498161615209203_1636332751.jpg'
    );
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
      deleteEmployee,
      openConfirmationModal,
      showDeleteButton,
    };
  },
};
</script>
