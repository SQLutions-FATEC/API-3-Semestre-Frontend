<script>
import { Button } from 'ant-design-vue';
import CompanyModal from '@/components/Modals/CompanyModal.vue';
import AtInput from '@/components/Input/AtInput.vue';
import { ref } from 'vue';

export default {
  name: 'CompanyHeader',

  components: {
    'a-button': Button,
    'at-input': AtInput,
    'company-modal': CompanyModal,
  },

  setup(props, { emit }) {
    const companyNameFilter = ref('');
    const isCompanyModalOpened = ref(false);

    const filterCompany = () => {
      emit('filter-changed', companyNameFilter.value);
    };

    const openCompanyModal = () => {
      isCompanyModalOpened.value = true;
    };

    return {
      companyNameFilter,
      filterCompany,
      isCompanyModalOpened,
      openCompanyModal,
    };
  },
};
</script>

<template>
  <div class="company-header">
    <h1>Empresas</h1>
    <div class="header__actions">
      <div class="filter__wrapper">
        <label class="filter-label">Nome da Empresa</label>
        <at-input
          v-model:value="companyNameFilter"
          class="filter-input"
          placeholder="Digite o nome da empresa"
        />
      </div>
      <a-button type="primary" @click="filterCompany">Filtrar</a-button>
      <a-button type="primary" @click="openCompanyModal">
        Adicionar empresa
      </a-button>
    </div>
    <company-modal
      v-if="isCompanyModalOpened"
      v-model:open="isCompanyModalOpened"
    />
  </div>
</template>

<style lang="scss" scoped>
.company-header {
  display: flex;
  flex-direction: column;
  gap: $spacingLg;

  h1 {
    @include heading(large);
  }
  .header__actions {
    display: flex;
    gap: $spacingSm;
    align-items: end;
    justify-content: end;

    .filter__wrapper {
      display: flex;
      flex-direction: column;
      gap: $spacingXs;
    }
    .filter-input {
      width: 250px;
    }
  }
}
</style>
