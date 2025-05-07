<script>
import { Modal } from 'ant-design-vue';
import { PlusOutlined } from '@ant-design/icons-vue';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import ActiveContract from '@/components/Contracts/ActiveContract.vue';
import InactiveContracts from '@/components/Contracts/InactiveContracts.vue';
import ContractModal from '@/components/Modals/ContractModal.vue';
import contract from '@/services/contracts';
import dayjs from 'dayjs';

export default {
  name: 'Contracts',

  components: {
    'a-modal': Modal,
    ActiveContract,
    InactiveContracts,
    ContractModal,
    PlusOutlined,
  },

  setup(props) {
    const route = useRoute();
    let employeeId = null;

    const activeContract = ref({});
    const currentPagination = ref({ page: 1, size: 5 });
    const inactiveContracts = ref([]);
    const isContractModalOpened = ref(false);

    const fetchContracts = async (pagination) => {
      if (pagination) currentPagination.value = pagination;

      const params = {
        page: currentPagination.value.page,
        size: currentPagination.value.size,
      };

      try {
        const { data } = await contract.getByEmployeeId(employeeId, params);
        activeContract.value = data.find((contract) => contract.active) || {};
        inactiveContracts.value = data.filter((contract) => !contract.active);
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
      employeeId = route.params.id;
      if (!!employeeId) {
        fetchContracts();
      }
    });

    return {
      activeContract,
      fetchContracts,
      formatDate,
      inactiveContracts,
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
      v-if="Object.keys(activeContract).length"
      :contract="activeContract"
      @fetch-contracts="fetchContracts"
    />
    <inactive-contracts
      v-if="inactiveContracts.length"
      :contracts="inactiveContracts"
      @fetch-contracts="fetchContracts"
    />
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
}
</style>
