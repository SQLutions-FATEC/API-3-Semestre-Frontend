<script>
import { ref, onMounted, provide, h } from 'vue';
import { Button, Modal, Table } from 'ant-design-vue';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons-vue';
import employee from '@/services/employee';
import { formatDate, genderMask, registerNumberMask } from '@/utils';
import EmployeeHeader from '@/components/Headers/EmployeeHeader.vue';
import EmployeeModal from '@/components/Modals/EmployeeModal.vue';

export default {
  name: 'EmployeeHome',

  components: {
    'a-button': Button,
    'a-modal': Modal,
    'a-table': Table,
    'employee-header': EmployeeHeader,
    'employee-modal': EmployeeModal,
  },

  setup() {
    const currentPage = ref(1);
    const dataSource = ref([]);
    const isConfirmationModalOpened = ref(false);
    const isEmployeeModalOpened = ref(false);
    const loading = ref(false);
    const pageSize = ref(10);
    const totalInfos = ref(0);
    const selectedEmployee = ref({});

    const deleteEmployee = async () => {
      try {
        await employee.delete(selectedEmployee.value.key);
        isConfirmationModalOpened.value = false;
        await fetchEmployees();
      } catch (error) {
        console.error(error);
      }
    };

    const fetchEmployees = async (filter = null) => {
      console.log(filter);
      loading.value = true;
      const params = {
        page: currentPage.value,
        size: pageSize.value,
      };
      if (filter) {
        params.name = filter;
      }

      try {
        const { data } = await employee.getAll(params);

        dataSource.value = data.items.map((employee) => ({
          key: employee.id,
          birthDate: formatDate(employee.birth_date),
          registerNumber: employee.register_number,
          name: employee.name,
          gender: employee.gender,
          bloodType: employee.blood_type,
        }));

        totalInfos.value = data.total;
      } catch (error) {
        console.error('Erro ao buscar funcionários:', error);
      } finally {
        loading.value = false;
      }
    };

    provide('apiCall', fetchEmployees);

    const handleTableChange = async (pagination) => {
      currentPage.value = pagination.current;
      pageSize.value = pagination.pageSize;
      await fetchEmployees();
    };

    const openEmployeeModal = (employee) => {
      selectedEmployee.value = employee;
      isEmployeeModalOpened.value = true;
    };

    const openDeleteModal = (employee) => {
      selectedEmployee.value = employee;
      isConfirmationModalOpened.value = true;
    };

    onMounted(fetchEmployees);

    const columns = [
      {
        title: 'Número de registro',
        dataIndex: 'registerNumber',
        key: 'registerNumber',
        customRender: ({ text }) => registerNumberMask(text),
      },
      {
        title: 'Nome do funcionário',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: 'Gênero',
        dataIndex: 'gender',
        key: 'gender',
        customRender: ({ text }) => genderMask(text),
      },
      {
        title: 'Tipo sanguíneo',
        dataIndex: 'bloodType',
        key: 'bloodType',
      },
      {
        title: 'Data de nascimento',
        dataIndex: 'birthDate',
        key: 'birthDate',
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
                onClick: () => openEmployeeModal(record),
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
      deleteEmployee,
      fetchEmployees,
      handleTableChange,
      isConfirmationModalOpened,
      isEmployeeModalOpened,
      loading,
      openEmployeeModal,
      pageSize,
      selectedEmployee,
      totalInfos,
    };
  },
};
</script>

<template>
  <div class="employee-home">
    <employee-header @filter-changed="fetchEmployees" />
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
        :scroll="{ y: 'calc(100vh - 316px)' }"
        @change="handleTableChange"
      />
    </div>
    <employee-modal
      v-if="isEmployeeModalOpened"
      v-model:open="isEmployeeModalOpened"
      :employee-id="selectedEmployee.key"
    />
    <a-modal
      v-model:open="isConfirmationModalOpened"
      title="Deletar funcionário"
      @ok="deleteEmployee"
    >
      <span>
        Tem certeza que deseja deletar o funcionário
        <strong>{{ selectedEmployee?.name }}</strong
        >?
      </span>
    </a-modal>
  </div>
</template>

<style lang="scss" scoped>
@use 'sass:color';

.employee-home {
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
