<script>
import { Modal } from 'ant-design-vue';
import { ref } from 'vue';
import { onMounted } from 'vue';
import AtInput from '@/components/Input/AtInput.vue';
import AtNumberInput from '@/components/Input/AtNumberInput.vue';
import clockInOut from '@/services/clockInOut';

export default {
  name: 'EditClockInModal',

  components: {
    'a-modal': Modal,
    'at-input': AtInput,
    'at-number-input': AtNumberInput,
  },

  props: {
    clockIn: {
      required: true,
      type: Object,
    },
  },

  emits: ['close'],

  setup(props, { emit }) {
    const clockInTime = ref('');
    const companyName = ref('');
    const employeeName = ref('');
    const employeeRole = ref('');
    const loading = ref(false);
    const registerNumber = ref('');

    const handleClose = () => {
      emit('close');
    };

    const editClockIn = async () => {
      loading.value = true;
      const params = {
        clock_in_time: clockInTime.value,
        register_number: registerNumber.value
      }
      try {
        await clockInOut.put(params);
        handleClose();
      } catch (error) {
        alert('Houve um erro ao tentar editar a movimentação');
      } finally {
        loading.value = false;
      }
    };

    onMounted(() => {
      registerNumber.value = props.clockIn.registerNumber;
      employeeName.value = props.clockIn.employee;
      companyName.value = props.clockIn.company;
      employeeRole.value = props.clockIn.role;
      clockInTime.value = props.clockIn.datetime;
    });

    return {
      clockInTime,
      companyName,
      editClockIn,
      employeeName,
      employeeRole,
      handleClose,
      loading,
      registerNumber,
    };
  },
};
</script>

<template>
  <a-modal
    title="Editar horário de movimentação"
    :open="true"
    :confirm-loading="loading"
    @cancel="handleClose"
    @ok="editClockIn"
  >
    <div class="edit-clock-in-modal">
      <div class="col-6">
        <at-number-input
          v-model:value="registerNumber"
          placeholder="Número de registro"
          mask="###########"
          disabled
        />
      </div>
      <div class="col-6">
        <at-input
        v-model:value="employeeName"
        placeholder="Nome do funcionário"
        disabled
        />
      </div>
      <div class="col-6">
        <at-input
          v-model:value="companyName"
          placeholder="Nome da empresa"
          disabled
        />
      </div>
      <div class="col-6">
        <at-input
          v-model:value="employeeRole"
          placeholder="Função do funcionário"
          disabled
        />
      </div>
      <div class="col-6">
        <at-number-input
          v-model:value="clockInTime"
          placeholder="Horário do registro"
          mask="####-##-## ##:##"
        />
      </div>
    </div>
  </a-modal>
</template>

<style land="scss" scoped>
.edit-clock-in-modal {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  width: 100%;

  .col-6 {
    flex: 1 1 calc(50% - 12px);
  }
}
</style>
