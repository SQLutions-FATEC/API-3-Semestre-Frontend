<script>
import HomeHeader from '@/components/Headers/HomeHeader.vue';
import EditClockInModal from '@/components/Modals/EditClockInModal.vue';
import clockInOut from '@/services/clockInOut';
import { eventBus } from '@/utils/eventBus';
import {
  ArrowDownOutlined,
  ArrowUpOutlined,
  EditOutlined,
} from '@ant-design/icons-vue';
import { Button, Select, Table } from 'ant-design-vue';
import { h, onBeforeUnmount, onMounted, ref } from 'vue';
import { RouterLink } from 'vue-router';

export default {
  name: 'Home',

  components: {
    'a-button': Button,
    'a-select': Select,
    'a-table': Table,
    'arrow-up-outlined': ArrowUpOutlined,
    'arrow-down-outlined': ArrowDownOutlined,
    'edit-clock-in-modal': EditClockInModal,
    'edit-outlined': EditOutlined,
    'home-header': HomeHeader,
  },

  setup() {
    const currentPage = ref(1);
    const currentFilters = ref({});
    const dataSource = ref([]);
    const isEditClockInOpened = ref(false);
    const pageSize = ref(10);
    const selectedClockIn = ref({});
    const totalInfos = ref(0);

    const closeEditModal = () => {
      isEditClockInOpened.value = false;
    };

    const getEmployeesClockInOut = async (filters) => {
      try {
        const params = {
          page: currentPage.value,
          size: pageSize.value,
        };

        if (filters) {
          currentFilters.value = filters;
        } else {
          currentFilters.value = {};
        }

        if (currentFilters.value.company)
          params.company = currentFilters.value.company;
        if (currentFilters.value.employee)
          params.employee = currentFilters.value.employee;
        if (currentFilters.value.role) params.role = currentFilters.value.role;
        if (currentFilters.value.dateRange?.length === 2) {
          params.start_date =
            currentFilters.value.dateRange[0].format('YYYY-MM-DD HH:mm');
          params.end_date =
            currentFilters.value.dateRange[1].format('YYYY-MM-DD HH:mm');
        }

        const { data } = await clockInOut.get(params);

        dataSource.value = data.items.map((info) => ({
          key: info.id,
          registerNumber: info.employee.register_number,
          employee: info.employee.name,
          employeeId: info.employee.id,
          company: info.company.name,
          companyId: info.company.id,
          role: info.role_name,
          date_time_in: info.date_time_in,
          date_time_out: info.date_time_out,
          worked_hours: info.worked_hours,
        }));
        totalInfos.value = data.total;

        eventBus.$emit('table-data', dataSource.value);
      } catch (error) {
        console.error(error);
      }
    };

    const handleEdit = (clockIn) => {
      selectedClockIn.value = clockIn;
      isEditClockInOpened.value = true;
    };

    const handleFilterChange = async (filters) => {
      await getEmployeesClockInOut(filters);
    };

    const handleTableChange = async (paginator) => {
      currentPage.value = paginator.current;
      pageSize.value = paginator.pageSize;
      await getEmployeesClockInOut(currentFilters.value);
    };

    onMounted(async () => {
      eventBus.$on('filter-changed', handleFilterChange);
      await getEmployeesClockInOut();
    });

    onBeforeUnmount(() => {
      eventBus.$off('filter-changed', handleFilterChange);
    });

    const columns = [
      {
        title: 'Número de registro',
        dataIndex: 'registerNumber',
        key: 'registerNumber',
      },
      {
        title: 'Funcionário',
        dataIndex: 'employee',
        key: 'employee',
        customRender: ({ text, record }) => {
          return h(
            RouterLink,
            {
              to: { path: `/employee/${record.employeeId}` },
              style: { color: 'inherit', textDecoration: 'underline' },
            },
            () => text
          );
        },
      },
      {
        title: 'Data de entrada',
        dataIndex: 'date_time_in',
        key: 'datetime',
      },
      {
        title: 'Data de saída',
        dataIndex: 'date_time_out',
        key: 'datetime',
      },
      {
        title: 'Empresa',
        dataIndex: 'company',
        key: 'company',
        customRender: ({ text, record }) => {
          return h(
            RouterLink,
            {
              to: { path: `/company/${record.companyId}` },
              style: { color: 'inherit', textDecoration: 'underline' },
            },
            () => text
          );
        },
      },
      {
        title: 'Função',
        dataIndex: 'role',
        key: 'role',
      },
      {
        title: 'Ações',
        key: 'actions',
        customRender: ({ record }) => {
          return h(
            Button,
            {
              type: 'primary',
              shape: 'circle',
              onClick: () => handleEdit(record),
            },
            () => h(EditOutlined)
          );
        },
      },
    ];

    return {
      columns,
      closeEditModal,
      currentPage,
      dataSource,
      getEmployeesClockInOut,
      isEditClockInOpened,
      handleTableChange,
      pageSize,
      selectedClockIn,
      totalInfos,
    };
  },
};
</script>

<template>
  <div class="home">
    <home-header />
    <a-table
      :dataSource="dataSource"
      :columns="columns"
      :pagination="{
        current: currentPage,
        pageSize: pageSize,
        total: totalInfos,
        showSizeChanger: true,
        pageSizeOptions: ['10', '20', '50'],
      }"
      @change="handleTableChange"
    />
    <edit-clock-in-modal
      v-if="isEditClockInOpened"
      :clock-in="selectedClockIn"
      @close="closeEditModal"
      @reload="getEmployeesClockInOut"
    />
  </div>
</template>

<style lang="scss" scoped>
.home {
  padding: $spacingLg 0px $spacingXxl 0px;
  display: flex;
  flex-direction: column;
  gap: $spacingXl;
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
</style>
