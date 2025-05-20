<script>
import { Button } from 'ant-design-vue';
import CompanyModal from '@/components/Modals/CompanyModal.vue';
import { ref } from 'vue';

export default {
  name: 'CompanyHeader',

  components: {
    'a-button': Button,
    'comapny-modal': CompanyModal,
  },

  setup() {
    const isCompanyModalOpened = ref(false);

    const openCompanyModal = () => {
      isCompanyModalOpened.value = true;
    };

    return {
      isCompanyModalOpened,
      openCompanyModal,
    };
  },
};
</script>

<template>
  <div class="company-header">
    <h1>Empresas</h1>
    <a-button type="primary" @click="openCompanyModal">
      Adicionar empresa
    </a-button>
    <comapny-modal
      v-if="isCompanyModalOpened"
      v-model:open="isCompanyModalOpened"
    />
  </div>
</template>

<style lang="scss" scoped>
.company-header {
  display: flex;
  align-items: center;
  justify-content: space-between;

  h1 {
    @include heading(large);
  }
}
</style>
