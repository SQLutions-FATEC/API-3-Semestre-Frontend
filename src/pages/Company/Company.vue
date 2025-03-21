<script>
import { Button } from 'ant-design-vue';
import { ref } from 'vue';
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
    const companyName = ref('');
    const cnpj = ref('');
    const errorMessage = ref('');
    const tradeName = ref('');

    const createCompany = async () => {
      if (!companyName.value || !cnpj.value || !tradeName.value) {
        alert('Todos os campos são obrigatórios');
        return;
      }

      const payload = {
        company_name: companyName.value,
        cnpj: cnpj.value,
        trade_name: tradeName.value,
      };
      try {
        await company.create(payload);
        alert(`Empresa ${tradeName.value} criada`);
        resetInputs();
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

    return {
      createCompany,
      companyName,
      cnpj,
      errorMessage,
      tradeName,
      validateCnpj,
    };
  },
};
</script>

<template>
  <div class="company">
    <h1>Cadastro de empresa</h1>
    <div class="company__content">
      <div class="content__input">
        <at-input v-model:value="companyName" placeholder="Razão social" />
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
        <at-input v-model:value="tradeName" placeholder="Nome fantasia" />
      </div>
      <div class="content__action">
        <a-button type="primary" style="width: 250px" @click="createCompany">
          Cadastrar
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
