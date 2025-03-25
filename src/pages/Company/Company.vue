<script>
import { Button } from 'ant-design-vue';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import company from '@/services/company';
import AtNumberInput from '@/components/Input/AtNumberInput.vue';
import AtInput from '@/components/Input/AtInput.vue';

export default {
  name: 'Company',

  components: {
    'a-button': Button,
    'at-input': AtInput,
    'at-number-input': AtNumberInput,
  },

  setup() {
    const route = useRoute();
    const buttonAction = ref('Cadastrar');
    const companyName = ref('');
    const cnpj = ref('');
    const isEditing = ref(false);
    const errorMessage = ref('');
    const pageTitle = ref('Cadastro de empresa');
    const tradeName = ref('');

    const companyAction = async () => {
      if (!companyName.value || !cnpj.value || !tradeName.value) {
        alert('Todos os campos são obrigatórios');
        return;
      }
      const payload = {
        company_name: companyName.value,
        cnpj: cnpj.value,
        trade_name: tradeName.value,
      };
      if (isEditing) {
        await editCompany(payload);
      } else {
        await createCompany(payload);
      }
    };

    const createCompany = async (payload) => {
      try {
        await company.create(payload);
        alert(`Empresa ${tradeName.value} criada`);
        resetInputs();
      } catch (error) {
        console.error(error);
      }
    };

    const editCompany = async (payload) => {
      try {
        payload.company_id = route.params.id;
        await company.edit(payload);
        alert(`Empresa ${tradeName.value} editada`);
      } catch (error) {
        console.error(error);
      }
    };

    const getCompany = async (companyId) => {
      try {
        const { data } = await company.getById(companyId);
        companyName.value = data.company_name;
        cnpj.value = String(data.cnpj);
        tradeName.value = data.trade_name;
        pageTitle.value = `Editar ${tradeName.value}`;
      } catch (error) {
        console.error(error);
      }
    };

    const validateCnpj = (event) => {
      const newValue = event.target.value;
      const rawValue = newValue.replace(/\D/g, '');
      if (rawValue.length === 14) {
        errorMessage.value = '';
      } else {
        errorMessage.value = 'CNPJ deve ter 14 dígitos.';
      }
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

    return {
      buttonAction,
      companyAction,
      companyName,
      cnpj,
      errorMessage,
      pageTitle,
      tradeName,
      validateCnpj,
    };
  },
};
</script>

<template>
  <div class="company">
    <h1>{{ pageTitle }}</h1>
    <div class="company__content">
      <div class="content__input">
        <at-input v-model:value="companyName" placeholder="Razão social" text />
      </div>
      <div class="content__input">
        <at-number-input
          v-model:value="cnpj"
          mask="##.###.###/####-##"
          placeholder="CNPJ"
          :error-message="errorMessage"
          @input="validateCnpj"
        />
      </div>
      <div class="content__input">
        <at-input v-model:value="tradeName" placeholder="Nome fantasia" text />
      </div>
      <div class="content__action">
        <a-button type="primary" style="width: 250px" @click="companyAction">
          {{ buttonAction }}
        </a-button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.company {
  padding: $spacingXxl;

  .company__content {
    padding: $spacingXxl 0px;
    display: flex;
    flex-wrap: wrap;
    gap: $spacingXxl;

    .content__input {
      flex: 0 0 calc(50% - 16px);
      box-sizing: border-box;
    }
    .content__action {
      flex: 0 0 100%;
      display: flex;
      justify-content: center;
    }
  }
}
</style>
