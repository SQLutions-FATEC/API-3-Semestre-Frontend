<script>
import { Button, Input } from 'ant-design-vue';
import { ref } from 'vue';
import company from '@/services/company';

export default {
  name: 'Company',

  components: {
    'a-button': Button,
    'a-input': Input,
  },

  setup() {
    const companyName = ref('');
    const cnpj = ref('');
    const tradeName = ref('');

    const createCompany = async () => {
      const payload = {
        company_name: companyName.value,
        cnpj: cnpj.value,
        trade_name: tradeName.value,
      };
      try {
        await company.create(payload);
      } catch (error) {
        console.log(error);
      }
    };

    return {
      createCompany,
      companyName,
      cnpj,
      tradeName,
    };
  },
};
</script>

<template>
  <div class="company">
    <h1>Cadastro de empresa</h1>
    <div class="company__content">
      <div class="content__input">
        <a-input v-model:value="companyName" placeholder="Razão social" />
      </div>
      <div class="content__input">
        <a-input v-model:value="cnpj" placeholder="CNPJ" />
      </div>
      <div class="content__input">
        <a-input v-model:value="tradeName" placeholder="Nome fantasia" />
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
