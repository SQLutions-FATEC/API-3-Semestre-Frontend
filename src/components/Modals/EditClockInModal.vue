<script>
import { Modal, message } from 'ant-design-vue';
import { ref, onMounted } from 'vue';
import AtInput from '@/components/Input/AtInput.vue';
import AtNumberInput from '@/components/Input/AtNumberInput.vue';
import clockInOut from '@/services/clockInOut';
import dayjs from 'dayjs';

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

  emits: ['close', 'reload'],

  setup(props, { emit }) {
    const clockInTime = ref(null);
    const clockOutTime = ref(null);
    const companyName = ref('');
    const employeeName = ref('');
    const employeeRole = ref('');
    const loading = ref(false);
    const registerNumber = ref('');

    const handleClose = () => emit('close');

    const handleCloseAndReload = () => {
      emit('reload');
      handleClose();
    };

    const editClockIn = async () => {
      loading.value = true;
      const params = {
        id: props.clockIn.key,
        date_time_in: dayjs(clockInTime.value).format('YYYY-MM-DD HH:mm:ss'),
        date_time_out: dayjs(clockOutTime.value).format('YYYY-MM-DD HH:mm:ss'),
        employee: props.clockIn.employeeId,
      };
      try {
        await clockInOut.edit(params);
        message.success('Movimentação editada com sucesso');
        handleCloseAndReload();
      } catch (error) {
        message.error('Houve um erro ao tentar editar a movimentação');
        console.error(error);
      } finally {
        loading.value = false;
      }
    };

    onMounted(() => {
      registerNumber.value = props.clockIn.registerNumber;
      employeeName.value = props.clockIn.employee;
      companyName.value = props.clockIn.company;
      employeeRole.value = props.clockIn.role;
      clockInTime.value = dayjs(props.clockIn.date_time_in);
      clockOutTime.value = dayjs(props.clockIn.date_time_out);
    });

    return {
      clockInTime,
      clockOutTime,
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
    cancelText="Cancelar"
    okText="Salvar"
    @cancel="handleClose"
    @ok="editClockIn"
  >
    <div class="edit-clock-in-modal">
      <div class="col-6">
        <label>Número de registro</label>
        <at-number-input
          v-model:value="registerNumber"
          placeholder="Número de registro"
          mask="###.#####.##-#"
          disabled
        />
      </div>
      <div class="col-6">
        <label>Nome do funcionário</label>
        <at-input
          v-model:value="employeeName"
          placeholder="Nome do funcionário"
          disabled
        />
      </div>
      <div class="col-6">
        <label>Nome da empresa</label>
        <at-input
          v-model:value="companyName"
          placeholder="Nome da empresa"
          disabled
        />
      </div>
      <div class="col-6">
        <label>Função do funcionário</label>
        <at-input
          v-model:value="employeeRole"
          placeholder="Função do funcionário"
          disabled
        />
      </div>
      <div class="col-6">
        <label>Horário de entrada</label>
        <a-date-picker
          v-model:value="clockInTime"
          show-time
          format="DD/MM/YYYY HH:mm"
          placeholder="Horário de entrada"
          style="width: 100%"
        />
      </div>
      <div class="col-6">
        <label>Horário de saída</label>
        <a-date-picker
          v-model:value="clockOutTime"
          show-time
          format="DD/MM/YYYY HH:mm"
          placeholder="Horário de saída"
          style="width: 100%"
        />
      </div>
    </div>
  </a-modal>
</template>

<style lang="scss" scoped>
.edit-clock-in-modal {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  width: 100%;

  .col-6 {
    flex: 1 1 calc(50% - 12px);
  }
  .col-12 {
    flex: 1 1 100%;
  }

  label {
    display: block;
    margin-bottom: 4px;
    font-weight: 500;
    color: rgba(0, 0, 0, 0.85);
  }
}
</style>
