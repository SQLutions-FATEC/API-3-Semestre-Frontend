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
          role: newRole.value,
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
    title="Nova Função"
    cancelText="Cancelar"
    okText="Salvar"
    :open="open"
    @cancel="closeModal"
    @ok="addRole"
  >
    <a-input v-model:value="newRole" placeholder="Digite a nova função" />
  </a-modal>
</template>
