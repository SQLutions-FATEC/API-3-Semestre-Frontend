<script>
import { Button, Modal, message } from 'ant-design-vue';
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { validateCnpj } from '@/utils/validations/cnpj';
import company from '@/services/company';
import AtNumberInput from '@/components/Input/AtNumberInput.vue';
import AtInput from '@/components/Input/AtInput.vue';
import { computed } from 'vue';

export default {
  name: 'Company',

  components: {
    'a-button': Button,
    'a-modal': Modal,
    'at-input': AtInput,
    'at-number-input': AtNumberInput,
  },

  setup() {
    const route = useRoute();
    const router = useRouter();
    const buttonAction = ref('Cadastrar');
    const companyName = ref('');
    const cnpj = ref('');
    const isEditing = ref(false);
    const isConfirmationModalOpened = ref(false);
    const errorMessage = ref('');
    const pageTitle = ref('Cadastro de empresa');
    const tradeName = ref('');

    const createEditCompany = async () => {
      if (!companyName.value || !cnpj.value || !tradeName.value) {
        message.error('Todos os campos são obrigatórios');
        return;
      }
      if (!!errorMessage.value) {
        message.error('Corrija o CNPJ');
        return;
      }
      const params = {
        id: route.params.id,
        name: companyName.value,
        cnpj: cnpj.value,
        trade_name: tradeName.value,
      };
      if (isEditing.value) {
        await editCompany(params);
      } else {
        await createCompany(params);
      }
    };

    const createCompany = async (params) => {
      try {
        await company.create(params);
        message.success(`Empresa ${tradeName.value} criada`);
        resetInputs();
      } catch (error) {
        console.error(error);
      }
    };

    const deleteCompany = async () => {
      try {
        const companyId = route.params.id;
        await company.delete(companyId);
        isConfirmationModalOpened.value = false;
        router.push({ name: 'Home' });
      } catch (error) {
        console.error(error);
      }
    };

    const editCompany = async (params) => {
      try {
        params.company_id = route.params.id;
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
        pageTitle.value = `Editar ${tradeName.value}`;
      } catch (error) {
        console.error(error);
      }
    };

    const openConfirmationModal = () => {
      isConfirmationModalOpened.value = true;
    };

    const validateCnpjInput = (event) => {
      const newValue = event.target.value;
      errorMessage.value = validateCnpj(newValue);
    };

    const resetInputs = () => {
      companyName.value = '';
      cnpj.value = '';
      tradeName.value = '';
    };

    onMounted(async () => {
      const companyId = route.params.id;
      if (!!companyId) {
        buttonAction.value = 'Editar';
        isEditing.value = true;
        await getCompany(companyId);
      } else {
        resetInputs();
      }
    });

    const showDeleteButton = computed(() => {
      return isEditing.value;
    });

    return {
      buttonAction,
      companyName,
      cnpj,
      createEditCompany,
      deleteCompany,
      errorMessage,
      isConfirmationModalOpened,
      openConfirmationModal,
      pageTitle,
      showDeleteButton,
      tradeName,
      validateCnpjInput,
    };
  },
};
</script>

<template>
  <div class="company">
    <h1>{{ pageTitle }}</h1>
    <div class="company__content">
      <div class="content__input">
        <label for="companyName">Razão social</label>
        <at-input
          id="companyName"
          v-model:value="companyName"
          placeholder="Razão social"
          text
        />
      </div>
      <div class="content__input">
        <label for="cnpj">CNPJ</label>
        <at-number-input
          id="cnpj"
          v-model:value="cnpj"
          mask="##.###.###/####-##"
          placeholder="CNPJ"
          :error-message="errorMessage"
          @input="validateCnpjInput"
        />
      </div>
      <div class="content__input">
        <label for="tradeName">Nome fantasia</label>
        <at-input
          id="tradeName"
          v-model:value="tradeName"
          placeholder="Nome fantasia"
          text
        />
      </div>
      <div class="content__action">
        <a-button
          v-if="showDeleteButton"
          class="delete-button"
          style="width: 250px"
          @click="openConfirmationModal"
        >
          Deletar empresa
        </a-button>
        <a-button
          type="primary"
          style="width: 250px"
          @click="createEditCompany"
        >
          {{ buttonAction }}
        </a-button>
      </div>
    </div>
    <a-modal
      v-model:open="isConfirmationModalOpened"
      title="Deletar empresa"
      @ok="deleteCompany"
    >
      <span>Tem certeza que deseja deletar a empresa {{ tradeName }}?</span>
    </a-modal>
  </div>
</template>
<style lang="scss" scoped>
.company {
  padding: $spacingXxl 0px;

  h1 {
    @include heading(large);
  }
  .company__content {
    padding: $spacingXxl 0px;
    display: flex;
    flex-wrap: wrap;
    gap: $spacingXxl;

    .content__input {
      flex: 0 0 calc(50% - $spacingLg);
      box-sizing: border-box;
    }
    .content__action {
      flex: 0 0 100%;
      display: flex;
      justify-content: center;
      gap: $spacingMd;

      .delete-button {
        background-color: transparent;
        border-color: $colorError;
        color: $colorError;

        &:hover {
          background-color: $colorBackgroundError !important;
          color: $colorWhite;
        }
      }
    }
  }
}
</style>
