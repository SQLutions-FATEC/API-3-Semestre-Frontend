<script>
import { Button, Tooltip } from 'ant-design-vue';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons-vue';
import { ref, computed } from 'vue';
import ContractModal from '@/components/Modals/ContractModal.vue';
import InactivateContractModal from '@/components/Modals/InactivateContractModal.vue';

export default {
  name: 'ActiveContract',

  props: {
    contract: {
      required: true,
      type: Object,
    },
  },

  components: {
    'a-button': Button,
    'a-tooltip': Tooltip,
    'contract-modal': ContractModal,
    'delete-outlined': DeleteOutlined,
    'edit-outlined': EditOutlined,
    'inactivate-contract-modal': InactivateContractModal,
  },

  setup(props, { emit }) {
    const isEditContractModalOpened = ref(false);
    const isInactivateContractModalOpened = ref(false);

    const contract = computed(() => props.contract);

    const editContract = (edittedContract) => {
      emit('edit-contract', edittedContract);
    };

    const inactivateContract = (inactivatedContractId) => {
      emit('inactivate-contract', inactivatedContractId);
    };

    const openEditContractModal = () => {
      isEditContractModalOpened.value = true;
    };

    const openInactivateContractModal = () => {
      isInactivateContractModalOpened.value = true;
    };

    return {
      contract,
      editContract,
      inactivateContract,
      isEditContractModalOpened,
      isInactivateContractModalOpened,
      openEditContractModal,
      openInactivateContractModal,
    };
  },
};
</script>

<template>
  <div class="active-contract">
    <a-tooltip>
      <template #title>Contrato ativo</template>
      <div class="active-icon"></div>
    </a-tooltip>
    <div class="contract">
      <div class="contract__infos">
        <div class="info">
          <h3>Empresa</h3>
          <p>{{ contract.company.name }}</p>
        </div>
        <div class="info">
          <h3>Função</h3>
          <p>{{ contract.role.name }}</p>
        </div>
        <div class="info">
          <h3>Data de contrato</h3>
          <p>
            {{ new Date(contract.datetime_start).toLocaleDateString('pt-BR') }}
            - {{ new Date(contract.datetime_end).toLocaleDateString('pt-BR') }}
          </p>
        </div>
      </div>
      <div class="contract__actions">
        <a-button type="primary" shape="circle" @click="openEditContractModal">
          <template #icon>
            <edit-outlined style="color: white" />
          </template>
        </a-button>
        <a-button
          class="delete-button"
          shape="circle"
          @click="openInactivateContractModal"
        >
          <template #icon>
            <delete-outlined style="color: white" />
          </template>
        </a-button>
      </div>
    </div>
    <contract-modal
      v-model:open="isEditContractModalOpened"
      :contract="contract"
      @edit-contract="editContract"
    />
    <inactivate-contract-modal
      v-model:open="isInactivateContractModalOpened"
      :contract="contract"
      @inactivate-contract="inactivateContract"
    />
  </div>
</template>

<style lang="scss" scoped>
@use 'sass:color';

.active-contract {
  display: flex;
  gap: $spacingMd;
  align-items: center;

  .active-icon {
    background-color: $colorBackgroundSuccess;
    border-radius: $borderRadiusXxl;
    height: 15px;
    width: 15px;
  }
  .contract {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: $colorBackgroundPrimary;
    width: 100%;
    border-radius: $borderRadiusSm;
    padding: $spacingSm $spacingMd;

    .contract__infos {
      display: flex;
      gap: $spacingXxl;

      .info {
        display: flex;
        gap: $spacingMd;
        align-items: baseline;

        h3 {
          @include heading(xsmall);
          color: $colorTextDisabled;
          font-size: 14px;
        }
        p {
          @include paragraph(large);
        }
      }
    }
    .contract__actions {
      display: flex;
      gap: $spacingXl;

      .delete-button {
        background-color: $colorBackgroundError;
        border-color: $colorError;

        &:hover {
          background-color: color.adjust(
            $colorBackgroundError,
            $lightness: -15%
          ) !important;
          border-color: color.adjust(
            $colorBackgroundError,
            $lightness: -15%
          ) !important;
        }
      }
    }
  }
}
</style>
