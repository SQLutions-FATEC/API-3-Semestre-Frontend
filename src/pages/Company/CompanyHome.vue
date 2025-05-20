<script>
import { ref, onMounted, provide, h } from 'vue';
import { Button, Modal, Table } from 'ant-design-vue';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons-vue';
import company from '@/services/company';
import CompanyHeader from '@/components/Headers/CompanyHeader.vue';
import CompanyModal from '@/components/Modals/CompanyModal.vue';
import { cnpjMask } from '@/utils';

export default {
  name: 'CompanyHome',

  components: {
    'a-button': Button,
    'a-modal': Modal,
    'a-table': Table,
    'company-header': CompanyHeader,
    'company-modal': CompanyModal,
  },

  setup() {
    const currentPage = ref(1);
    const dataSource = ref([]);
    const isConfirmationModalOpened = ref(false);
    const isCompanyModalOpened = ref(false);
    const loading = ref(false);
    const pageSize = ref(10);
    const totalInfos = ref(0);
    const selectedCompany = ref({});

    const deleteCompany = async () => {
      try {
        await company.delete(selectedCompany.value.key);
        isConfirmationModalOpened.value = false;
        await fetchCompanies();
      } catch (error) {
        console.error(error);
      }
    };

    const fetchCompanies = async () => {
      loading.value = true;

      try {
        const { data } = await company.getAll({
          page: currentPage.value,
          size: pageSize.value,
        });

        dataSource.value = data.items.map((company) => ({
          key: company.id,
          name: company.name,
          cnpj: company.cnpj,
          tradeName: company.trade_name,
        }));

        totalInfos.value = data.total;
      } catch (error) {
        console.error('Erro ao buscar empresas:', error);
      } finally {
        loading.value = false;
      }
    };

    provide('apiCall', fetchCompanies);

    const handleTableChange = async (pagination) => {
      currentPage.value = pagination.current;
      pageSize.value = pagination.pageSize;
      await fetchCompanies();
    };

    const openConfirmationModal = () => {
      isConfirmationModalOpened.value = true;
    };

    const openCompanyModal = (company) => {
      selectedCompany.value = company;
      isCompanyModalOpened.value = true;
    };

    const openDeleteModal = (company) => {
      selectedCompany.value = company;
      isConfirmationModalOpened.value = true;
    };

    onMounted(fetchCompanies);

    const columns = [
      {
        title: 'Razão social',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: 'CNPJ',
        dataIndex: 'cnpj',
        key: 'cnpj',
        customRender: ({ record }) => cnpjMask(record.cnpj),
      },
      {
        title: 'Nome fantasia',
        dataIndex: 'tradeName',
        key: 'tradeName',
      },
      {
        title: 'Ações',
        key: 'actions',
        customRender: ({ record }) => {
          return [
            h(
              Button,
              {
                type: 'primary',
                shape: 'circle',
                icon: h(EditOutlined),
                style: { marginRight: '8px' },
                onClick: () => openCompanyModal(record),
              },
              null
            ),
            h(
              Button,
              {
                class: 'delete-button',
                type: 'danger',
                shape: 'circle',
                icon: h(DeleteOutlined),
                onClick: () => openDeleteModal(record),
              },
              null
            ),
          ];
        },
      },
    ];

    return {
      columns,
      currentPage,
      dataSource,
      deleteCompany,
      handleTableChange,
      isConfirmationModalOpened,
      isCompanyModalOpened,
      loading,
      openConfirmationModal,
      openCompanyModal,
      pageSize,
      selectedCompany,
      totalInfos,
    };
  },
};
</script>

<template>
  <div class="company-home">
    <company-header />
    <div class="table-container">
      <a-table
        :dataSource="dataSource"
        :columns="columns"
        :loading="loading"
        :pagination="{
          current: currentPage,
          pageSize: pageSize,
          total: totalInfos,
          showSizeChanger: true,
          pageSizeOptions: ['10', '20', '50'],
        }"
        :scroll="{ y: 'calc(100vh - 312px)' }"
        @change="handleTableChange"
      />
    </div>
    <company-modal
      v-if="isCompanyModalOpened"
      v-model:open="isCompanyModalOpened"
      :company-id="selectedCompany.key"
    />
    <a-modal
      v-model:open="isConfirmationModalOpened"
      title="Deletar empresa"
      @ok="deleteCompany"
    >
      <span>
        Tem certeza que deseja deletar a empresa
        <strong>{{ selectedCompany?.name }}</strong
        >?
      </span>
    </a-modal>
  </div>
</template>

<style lang="scss" scoped>
@use 'sass:color';

.company-home {
  padding: $spacingXxl 0px;
  display: flex;
  flex-direction: column;
  gap: $spacingXl;

  .table-container {
    :deep(.ant-table-container) {
      overflow: auto;
    }
  }

  :deep(.ant-table-cell) {
    @include paragraph(medium);
  }

  :deep(.ant-pagination-item-active) {
    border-color: $colorBorderSecondary;

    a {
      color: $colorTextOrange;
    }
  }
}
:deep(.delete-button) {
  background-color: $colorBackgroundError;
  border-color: $colorError;
  color: $colorWhite;

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
</style>
