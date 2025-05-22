<script>
import ActiveContract from '@/components/Contracts/ActiveContract.vue';
import InactiveContracts from '@/components/Contracts/InactiveContracts.vue';
import ContractModal from '@/components/Modals/ContractModal.vue';
import contracts from '@/services/contracts';
import { PlusOutlined } from '@ant-design/icons-vue';
import { Modal, message } from 'ant-design-vue';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

export default {
  name: 'Contracts',

  props: {
    employeeId: {
      default: null,
      type: Number,
    },
  },

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

      params.contracts.push(...inactiveContracts.value);

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

        const contractsWithFallback = data.map((contract) => ({
          ...contract,
          company: contract.company ?? { name: 'Não informado' },
          role: contract.role ?? { name: 'Não informado' },
        }));

        activeContract.value =
          contractsWithFallback.find((contract) => contract.active) || {};

        inactiveContracts.value = contractsWithFallback.filter(
          (contract) => !contract.active
        );
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
      employeeId = props.employeeId;

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
      <h2>Contratos</h2>
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
    <div
      v-if="!Object.keys(activeContract).length && !inactiveContracts.length"
      class="contracts__empty-state"
    >
      <p>Nenhum contrato encontrado.</p>
    </div>
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

    h2 {
      @include label(medium);
    }
  }
  .contracts__empty-state {
    margin: $spacingLg auto;

    p {
      @include paragraph(medium);
    }
  }
}
</style>
