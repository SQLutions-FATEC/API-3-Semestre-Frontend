<script>
import { inject } from 'vue';
import { Button, Modal, message } from 'ant-design-vue';
import { onMounted, ref } from 'vue';
import { validateCnpj } from '@/utils/validations/cnpj';
import company from '@/services/company';
import AtNumberInput from '@/components/Input/AtNumberInput.vue';
import AtInput from '@/components/Input/AtInput.vue';
import { computed } from 'vue';

export default {
  name: 'CompanyModal',

  props: {
    companyId: {
      default: null,
      type: Number,
    },
    open: {
      required: true,
      type: Boolean,
    },
  },

  components: {
    'a-button': Button,
    'a-modal': Modal,
    'at-input': AtInput,
    'at-number-input': AtNumberInput,
  },

  setup(props, { emit }) {
    const apiCall = inject('apiCall');
    const companyName = ref('');
    const cnpj = ref('');
    const isEditing = ref(false);
    const errorMessage = ref('');
    const tradeName = ref('');

    const closeModal = () => {
      emit('update:open', false);
    };

    const companyAction = async () => {
      if (!companyName.value || !cnpj.value || !tradeName.value) {
        message.error('Todos os campos são obrigatórios');
        return;
      }
      if (!!errorMessage.value) {
        message.error('Corrija o CNPJ');
        return;
      }
      const params = {
        id: props.companyId,
        name: companyName.value,
        cnpj: cnpj.value,
        trade_name: tradeName.value,
      };
      if (isEditing.value) {
        await editCompany(params);
      } else {
        await createCompany(params);
      }

      closeModal();
      await apiCall();
    };

    const createCompany = async (params) => {
      try {
        await company.create(params);
        message.success(`Empresa ${tradeName.value} criada`);
      } catch (error) {
        console.error(error);
      }
    };

    const editCompany = async (params) => {
      try {
        params.company_id = props.companyId;
        await company.edit(params);
        message.success(`Empresa ${tradeName.value} editada`);
      } catch (error) {
        console.error(error);
      }
    };

    const getCompany = async (companyId) => {
      try {
        const { data } = await company.getById(companyId);
        companyName.value = data.name;
        cnpj.value = String(data.cnpj);
        tradeName.value = data.trade_name;
      } catch (error) {
        console.error(error);
      }
    };

    const validateCnpjInput = (event) => {
      const newValue = event.target.value;
      errorMessage.value = validateCnpj(newValue);
    };

    onMounted(async () => {
      const companyId = props.companyId;

      if (!!companyId) {
        isEditing.value = true;
        await getCompany(companyId);
      }
    });

    const modalTitle = computed(() => {
      return isEditing.value ? 'Editar Empresa' : 'Cadastrar Empresa';
    });

    return {
      companyAction,
      companyName,
      cnpj,
      closeModal,
      errorMessage,
      modalTitle,
      tradeName,
      validateCnpjInput,
    };
  },
};
</script>

<template>
  <a-modal
    :open="open"
    :title="modalTitle"
    :width="600"
    @cancel="closeModal"
    @ok="companyAction"
  >
    <div class="company-modal">
      <at-input v-model:value="companyName" placeholder="Razão social" text />
      <at-number-input
        v-model:value="cnpj"
        mask="##.###.###/####-##"
        placeholder="CNPJ"
        :error-message="errorMessage"
        @input="validateCnpjInput"
      />
      <at-input v-model:value="tradeName" placeholder="Nome fantasia" text />
    </div>
  </a-modal>
</template>

<style lang="scss" scoped>
.company-modal {
  padding: $spacingXxl 0px;
  display: flex;
  flex-direction: column;
  gap: $spacingXxl;
}
</style>
