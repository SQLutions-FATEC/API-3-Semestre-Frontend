<script>
import { Modal } from 'ant-design-vue';
import { PlusOutlined } from '@ant-design/icons-vue';
import { onMounted, ref } from 'vue';
import ActiveContract from '@/components/Contracts/ActiveContract.vue';
import ContractModal from '@/components/Modals/ContractModal.vue';
import contract from '@/services/contracts';
import dayjs from 'dayjs';

export default {
  name: 'Contracts',

  components: {
    'a-modal': Modal,
    ActiveContract,
    ContractModal,
    PlusOutlined,
  },

  setup(props) {
    const contracts = ref([]);
    const isContractModalOpened = ref(false);

    const fetchContracts = async () => {
      try {
        const { data } = await contract.get();
        contracts.value = data;
      } catch (error) {
        console.error('Erro buscando contratos:', error);
      }
    };

    const formatDate = (dateString) => {
      return dayjs(dateString).format('DD/MM/YYYY HH:mm');
    };

    const openContractModal = () => {
      isContractModalOpened.value = true;
    };

    onMounted(() => {
      fetchContracts();
    });

    return {
      contracts,
      fetchContracts,
      formatDate,
      isContractModalOpened,
      openContractModal,
    };
  },
};
</script>

<template>
  <div class="contracts">
    <div class="contracts__header">
      <h1>Contratos</h1>
      <a-button type="primary" @click="openContractModal">
        <template #icon>
          <plus-outlined />
        </template>
        Adicionar Contrato
      </a-button>
    </div>
    <active-contract
      :contract="{
        company: { id: 1, name: 'Empresa Muito Boa' },
        role: { id: 1, name: 'Soldador' },
        start_date: '12/02/2024',
        end_date: '24/03/2025',
      }"
    />
    <div class="contracts__list">
      <div v-for="(contract, index) in contracts" :key="index" class="list">
        <p>
          Empresa: {{ contract.company.name }} / Função:
          {{ contract.role.name }} / Início:
          {{ formatDate(contract.datetime_start) }} / Fim:
          {{ formatDate(contract.datetime_end) }}
        </p>
      </div>
    </div>
    <contract-modal
      v-model:open="isContractModalOpened"
      @fetch-contracts="fetchContracts"
    />
  </div>
</template>

<style lang="scss" scoped>
.contracts {
  display: flex;
  flex-direction: column;
  gap: $spacingLg;
  flex: 1 1 auto;

  .contracts__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  h1 {
    @include heading(large);
  }
  .contracts__list {
    display: flex;
    flex-direction: column;
    gap: $spacingLg;

    .list {
      display: flex;
      align-items: center;
      gap: $spacingXxl;
    }
  }
}
</style>
