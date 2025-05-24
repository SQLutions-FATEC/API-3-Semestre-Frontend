<script>
import { Input, Modal } from 'ant-design-vue';
import { ref } from 'vue';
import role from '@/services/role';

export default {
  name: 'RoleModal',

  props: {
    open: {
      required: true,
      type: Boolean,
    },
  },

  components: {
    'a-input': Input,
    'a-modal': Modal,
  },

  setup(props, { emit }) {
    const newRole = ref('');

    const addRole = async () => {
      if (newRole.value.trim()) {
        const params = {
          name: newRole.value,
        };
        try {
          await role.create(params);
          newRole.value = '';
        } catch (error) {
          console.error(error);
        }

        emit('fetch-roles');
        closeModal();
      }
    };

    const closeModal = () => {
      emit('update:open', false);
    };

    return { addRole, closeModal, newRole };
  },
};
</script>

<template>
  <a-modal
    class="role-modal"
    title="Nova Função"
    :open="open"
    cancelText="Cancelar"
    okText="Salvar"
    @cancel="closeModal"
    @ok="addRole"
  >
    <div class="input-group">
      <label>Nome da função</label>
      <a-input v-model:value="newRole" placeholder="Digite a nova função" />
    </div>
  </a-modal>
</template>

<style lang="scss" scoped>
.role-modal {
  .input-group {
    display: flex;
    flex-direction: column;
    gap: $spacingXs;
    margin-bottom: 0;
    width: 100%;
  }
}
</style>
