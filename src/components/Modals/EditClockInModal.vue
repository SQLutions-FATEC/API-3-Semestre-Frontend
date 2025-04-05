<script>
import { Modal } from 'ant-design-vue';
import { onMounted } from 'vue';

export default {
  name: 'EditClockInModal',

  components: {
    'a-modal': Modal,
  },

  props: {
    clockIn: {
      required: true,
      type: Object,
    },
  },

  emits: ['close'],

  setup(props, { emit }) {
    const registerNumber = ref('');
    const employeeName = ref('');
    const companyName = ref('');
    const employeeRole = ref('');
    const clockInTime = ref('');

    const handleClose = () => {
      emit('close');
    };

    const teste = () => {
      console.log('oi');
    };

    onMounted(() => {
      registerNumber.value = props.clockIn.registerNumber;
      employeeName.value = props.clockIn.employee;
      companyName.value = props.clockIn.company;
      employeeRole.value = props.clockIn.role;
      clockInTime.value = props.clockIn.datetime;
    });

    return { handleClose, teste };
  },
};
</script>

<template>
  <a-modal
    :open="true"
    title="Deletar empresa"
    @cancel="handleClose"
    @ok="teste"
  >
    <span>Oi</span>
  </a-modal>
</template>
