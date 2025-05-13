<script>
import { Modal, message } from 'ant-design-vue';
import { PlusOutlined } from '@ant-design/icons-vue';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { formatDate } from '@/utils';
import ActiveContract from '@/components/Contracts/ActiveContract.vue';
import InactiveContracts from '@/components/Contracts/InactiveContracts.vue';
import ContractModal from '@/components/Modals/ContractModal.vue';
import contracts from '@/services/contracts';

export default {
  name: 'Contracts',

  components: {
    'a-modal': Modal,
    'active-contract': ActiveContract,
    'inactive-contracts': InactiveContracts,
    'contract-modal': ContractModal,
    'plus-outlined': PlusOutlined,
  },

  setup(props, { expose }) {
    const route = useRoute();
    let employeeId = null;
    let inactivatedContractId = null;

    const activeContract = ref({});
    const currentPagination = ref({ page: 1, size: 5 });
    const inactiveContracts = ref([]);
    const isContractModalOpened = ref(false);

    const addContract = (contract) => {
      if (Object.keys(activeContract.value).length) {
        activeContract.value.active = false;
        inactiveContracts.value = [
          ...inactiveContracts.value,
          activeContract.value,
        ];

        contract.active = true;
        activeContract.value = contract;
      } else {
        activeContract.value = contract;
      }
    };

    const clearFields = () => {
      activeContract.value = {};
      inactiveContracts.value = [];
    };

    const createContracts = async (employeeId) => {
      if (!Object.keys(activeContract.value).length) return;

      const params = {
        contracts: [activeContract.value],
        employee_id: employeeId,
      };
      if (inactiveContracts.value.length) {
        params.contracts.push(...inactiveContracts.value);
      }
      try {
        await contracts.create(params);
      } catch (error) {
        console.error(error);
      }
    };

    const deleteContract = async () => {
      try {
        await contracts.inactivate(inactivatedContractId);
        message.success('O contrato foi inativado');
      } catch (error) {
        message.error(
          'Houve um problema ao desativar o contrato. Tente novamente'
        );
        console.error('Erro ao desabilitar contrato:', error);
      }
    };

    const editContract = async () => {
      if (!!Object.keys(activeContract.value).length) {
        try {
          await contracts.edit(activeContract.value);
        } catch (error) {
          console.error(error);
        }
      } else {
        deleteContract();
      }
    };

    const fetchContracts = async (pagination) => {
      if (pagination) currentPagination.value = pagination;

      const params = {
        page: currentPagination.value.page,
        size: currentPagination.value.size,
      };

      try {
        const { data } = await contracts.getByEmployeeId(employeeId, params);
        activeContract.value = data.find((contract) => contract.active) || {};
        inactiveContracts.value = data.filter((contract) => !contract.active);
      } catch (error) {
        console.error('Erro buscando contratos:', error);
      }
    };

    const inactivateContract = (inactivatedContractId) => {
      activeContract.value.active = false;
      inactiveContracts.value = [
        ...inactiveContracts.value,
        activeContract.value,
      ];
      activeContract.value = {};

      inactivatedContractId = inactivatedContractId;
    };

    const modifyContract = async (edittedContract) => {
      activeContract.value = {
        id: activeContract.value.id,
        ...edittedContract,
      };
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

    expose({
      clearFields,
      createContracts,
      editContract,
    });

    return {
      activeContract,
      addContract,
      fetchContracts,
      formatDate,
      inactivateContract,
      inactiveContracts,
      isContractModalOpened,
      modifyContract,
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
      @edit-contract="modifyContract"
      @inactivate-contract="inactivateContract"
    />
    <inactive-contracts
      v-if="inactiveContracts.length"
      :contracts="inactiveContracts"
      @fetch-contracts="fetchContracts"
    />
    <contract-modal
      v-model:open="isContractModalOpened"
      @add-contract="addContract"
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
