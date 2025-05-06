<script>
import { Button, Tooltip } from 'ant-design-vue';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons-vue';

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
    'delete-outlined': DeleteOutlined,
    'edit-outlined': EditOutlined,
  },

  setup(props) {
    const contract = props.contract;

    const editContract = () => {
      // todo
    };

    const inactivateContract = () => {
      // todo
    };

    return {
      contract,
      editContract,
      inactivateContract,
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
            {{
              new Date(contract.datetime_start).toLocaleDateString('pt-BR')
            }}
            - {{ new Date(contract.datetime_end).toLocaleDateString('pt-BR') }}
          </p>
        </div>
      </div>
      <div class="contract__actions">
        <a-button type="primary" shape="circle" @click="editContract">
          <template #icon>
            <edit-outlined style="color: white" />
          </template>
        </a-button>
        <a-button
          class="delete-button"
          shape="circle"
          @click="inactivateContract"
        >
          <template #icon>
            <delete-outlined style="color: white" />
          </template>
        </a-button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
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
          background-color: darken($colorBackgroundError, 15%) !important;
          border-color: darken($colorBackgroundError, 15%) !important;
        }
      }
    }
  }
}
</style>
