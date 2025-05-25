<script>
import ActiveContract from '@/components/Contracts/ActiveContract.vue';
import InactiveContracts from '@/components/Contracts/InactiveContracts.vue';
import ContractModal from '@/components/Modals/ContractModal.vue';
import contracts from '@/services/contracts';
import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
dayjs.extend(isBetween);
import { PlusOutlined } from '@ant-design/icons-vue';
import { Modal, message } from 'ant-design-vue';
import { computed } from 'vue';
import { onMounted, ref } from 'vue';

export default {
  name: 'Contracts',

  props: {
    employeeId: {
      default: null,
      type: Number,
    },
    isEditing: {
      default: false,
      type: Boolean,
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
    let employeeId = null;
    let inactivatedContractId = null;

    const activeContract = ref({});
    const currentPagination = ref({ page: 1, size: 5 });
    const inactiveContracts = ref([]);
    const isContractModalOpened = ref(false);

    const addContract = (contract) => {
      const start = dayjs(contract.date_start);
      const end = dayjs(contract.date_end);
      const today = dayjs();

      const hasConflict = (existingContract) => {
        const existingStart = dayjs(existingContract.date_start);
        const existingEnd = dayjs(existingContract.date_end);
        return (
          start.isBetween(existingStart, existingEnd, null, '[]') ||
          end.isBetween(existingStart, existingEnd, null, '[]') ||
          existingStart.isBetween(start, end, null, '[]') ||
          existingEnd.isBetween(start, end, null, '[]')
        );
      };

      const allContracts = [
        ...inactiveContracts.value,
        ...(Object.keys(activeContract.value).length
          ? [activeContract.value]
          : []),
      ];
      const conflict = allContracts.some(hasConflict);

      if (conflict) {
        message.error('Já existe um contrato com datas conflitantes.');
        return;
      }

      if (today.isBetween(start, end, 'day', '[]')) {
        if (Object.keys(activeContract.value).length) {
          activeContract.value.active = false;
          inactiveContracts.value = [
            ...inactiveContracts.value,
            activeContract.value,
          ];
        }
        contract.active = true;
        activeContract.value = contract;
      } else {
        contract.active = false;
        inactiveContracts.value = [...inactiveContracts.value, contract];
      }
    };

    const clearFields = () => {
      activeContract.value = {};
      inactiveContracts.value = [];
    };

    const createContracts = async (employeeId) => {
      if (!Object.keys(activeContract.value).length) return;

      const formattedActiveContract = {
        company_id: activeContract.value.company.value,
        role_id: activeContract.value.role.value,
        date_start: activeContract.value.date_start,
        date_end: activeContract.value.date_end,
      };
      const formattedInactiveContracts = inactiveContracts.value.map(
        (contract) => ({
          company_id: contract.company.value,
          role_id: contract.role.value,
          date_start: contract.date_start,
          date_end: contract.date_end,
        })
      );

      const params = {
        contracts: [formattedActiveContract],
        employee_id: employeeId,
      };

      params.contracts.push(...formattedInactiveContracts);

      try {
        await contracts.create(params);
      } catch (error) {
        console.error(error);
      }
    };

    const editContracts = async () => {
      if (!Object.keys(activeContract.value).length) return;

      const formattedActiveContract = {
        id: activeContract.value.id,
        company_id: activeContract.value.company.id,
        role_id: activeContract.value.role.id,
        date_start: activeContract.value.date_start,
        date_end: activeContract.value.date_end,
        action: activeContract.value.action,
      };
      const formattedInactiveContracts = inactiveContracts.value.map(
        (contract) => ({
          id: contract.id,
          company_id: contract.company.id,
          role_id: contract.role.id,
          date_start: contract.date_start,
          date_end: contract.date_end,
          action: contract.action,
        })
      );

      const params = {
        contracts: [formattedActiveContract],
        employee_id: employeeId,
      };

      params.contracts.push(...formattedInactiveContracts);

      try {
        await contracts.edit(params);
      } catch (error) {
        console.error(error);
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

        const formattedContracts = data.map((contract) => ({
          ...contract,
          company: { id: contract.company.id, label: contract.company.name },
          role: { id: contract.role.id, label: contract.role.name },
          action: 'update',
        }));

        activeContract.value =
          formattedContracts.find((contract) => contract.active) || {};

        inactiveContracts.value = formattedContracts.filter(
          (contract) => !contract.active
        );
      } catch (error) {
        console.error('Erro buscando contratos:', error);
      }
    };

    const inactivateContract = (contractId) => {
      inactivatedContractId = contractId;

      activeContract.value.active = false;
      inactiveContracts.value = [
        ...inactiveContracts.value,
        activeContract.value,
      ];
      activeContract.value = {};
    };

    const modifyContract = async (edittedContract) => {
      if (activeContract.value.id) {
        activeContract.value = {
          id: activeContract.value.id,
          ...edittedContract,
        };
      }
    };

    const openContractModal = () => {
      isContractModalOpened.value = true;
    };

    const isEditing = computed(() => props.isEditing);

    onMounted(() => {
      employeeId = props.employeeId;

      if (!!employeeId) {
        fetchContracts();
      }
    });

    expose({
      clearFields,
      createContracts,
      editContracts,
    });

    return {
      activeContract,
      addContract,
      isEditing,
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
      :is-editing="isEditing"
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
