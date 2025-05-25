<script>
import { Modal } from 'ant-design-vue';

export default {
  name: 'InactivateContractModal',

  props: {
    contract: {
      required: true,
      type: Object,
    },
    open: {
      required: true,
      type: Boolean,
    },
  },

  components: {
    'a-modal': Modal,
  },

  setup(props, { emit }) {
    const inactivateContract = () => {
      emit('inactivate-contract', props.contract.id);
      closeModal();
    };

    const closeModal = () => {
      emit('update:open', false);
    };

    return {
      closeModal,
      inactivateContract,
    };
  },
};
</script>

<template>
  <a-modal
    title="Inativar Contrato"
    :open="open"
    cancelText="Cancelar"
    okText="Salvar"
    @cancel="closeModal"
    @ok="inactivateContract"
  >
    <div class="inactivate-contract-modal">
      <h2>
        Deseja desativar o contrato do usuário com a empresa
        {{ contract.company.name }}?
      </h2>
      <p>Esta ação é irreversível!</p>
    </div>
  </a-modal>
</template>

<style lang="scss" scoped>
.inactivate-contract-modal {
  padding: $spacingXl 0px;
  display: flex;
  flex-direction: column;
  gap: $spacingXl;

  h2 {
    @include heading(xsmall);
    text-align: center;
  }
  p {
    @include label(medium);
    text-align: center;
  }
}
</style>
