<script>
import { Button, Cascader, DatePicker, Image, Modal } from 'ant-design-vue';
import { onMounted, ref } from 'vue';
import { validateRN } from '@/utils/validations/registerNumber';
import { useRoute, useRouter } from 'vue-router';
import { computed } from 'vue';
import dayjs from 'dayjs';
import employee from '@/services/employee';
import AtNumberInput from '@/components/Input/AtNumberInput.vue';
import AtInput from '@/components/Input/AtInput.vue';
import Contracts from '@/components/Contracts.vue';

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
    contracts: Contracts,
  },

  setup() {
    const route = useRoute();
    const router = useRouter();
    const dateFormatList = ['DD/MM/YYYY'];
    const employeeContracts = [];

    const contractsRef = ref(null);
    const employeeName = ref('');
    const employeeRN = ref('');
    const employeeBirthDate = ref('');
    const employeeBloodType = ref('');
    const isConfirmationModalOpened = ref(false);
    const pageTitle = ref('Cadastro de funcionário');
    const buttonAction = ref('Cadastrar');
    const isEditing = ref(false);
    const errorMessage = ref('');
    const profileImage = ref(
      'https://i.pinimg.com/custom_covers/222x/85498161615209203_1636332751.jpg'
    );

    const addContract = (contract) => {
      employeeContracts.push(contract);
    };

    const employeeAction = async () => {
      if (
        !employeeName.value ||
        !employeeBirthDate.value ||
        !employeeBloodType.value ||
        !employeeRN.value ||
        !employeeContracts.length
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
        id: route.params.id,
        name: employeeName.value,
        blood_type: employeeBloodType.value,
        birth_date: formattedDate,
        reg_num: employeeRN.value,
        contracts: employeeContracts,
      };

      if (isEditing.value) {
        await editEmployee(payload);
      } else {
        await createEmployee(payload);
      }
    };

    const createEmployee = async (payload) => {
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

    const editEmployee = async (payload) => {
      try {
        await employee.edit(payload);
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
        contractsRef.value.fillContracts(data.contracts)

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

    onMounted(async () => {
      const employeeId = route.params.id;
      if (!!employeeId) {
        buttonAction.value = 'Editar';
        isEditing.value = true;
        await getEmployee(employeeId);
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
      bloodTypeOptions,
      buttonAction,
      contractsRef,
      dateFormatList,
      deleteEmployee,
      employeeBirthDate,
      employeeBloodType,
      employeeName,
      employeeRN,
      employeeAction,
      errorMessage,
      handleBloodTypeChange,
      handleDateChange,
      isConfirmationModalOpened,
      openConfirmationModal,
      pageTitle,
      profileImage,
      showDeleteButton,
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
          <a-image :width="225" :height="225" :src="profileImage" />
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
        <a-button type="primary" style="width: 250px" @click="employeeAction">
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
</style>
