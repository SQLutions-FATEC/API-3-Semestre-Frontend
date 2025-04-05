<script>
import { Modal } from 'ant-design-vue';

export default {
  name: 'EditClockInModal',

  components: {
    'a-modal': Modal,
  },

  setup() {
    const teste = () => {
      console.log('oi');
    };

    return { teste };
  },
};
</script>

<template>
  <a-modal :open="true" title="Deletar empresa" @ok="teste">
    <span>Oi</span>
  </a-modal>
</template>
