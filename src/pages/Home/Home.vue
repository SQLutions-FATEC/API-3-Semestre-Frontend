<script>
import { Button, Select, Table } from 'ant-design-vue';
import { onMounted, onBeforeUnmount, ref } from 'vue';
import {
  ArrowUpOutlined,
  ArrowDownOutlined,
  EditOutlined,
} from '@ant-design/icons-vue';
import clockInOut from '@/services/clockInOut';
import EditClockInModal from '@/components/Modals/EditClockInModal.vue';
import HomeHeader from '@/components/Headers/HomeHeader.vue';
import { h } from 'vue';
import { RouterLink } from 'vue-router';
import { eventBus } from '@/utils/eventBus';

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

        if (filters && filters.company) params.company = filters.company;
        if (filters && filters.employee) params.employee = filters.employee;
        if (filters && filters.role) params.role = filters.role;
        if (filters && filters.dateRange?.length === 2) {
          params.start_date = filters.dateRange[0].format(
            'YYYY-MM-DD HH:mm:ss'
          );
          params.end_date = filters.dateRange[1].format('YYYY-MM-DD HH:mm:ss');
        }

        const { data } = await clockInOut.get(params);

        dataSource.value = data.items.map((info) => ({
          key: info.id,
          registerNumber: info.register_number,
          employee: info.employee.name,
          employeeId: info.employee.id,
          company: info.company.name,
          role: info.role_name,
          datetime: info.date_time,
          clocked: info.direction,
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
      await getEmployeesClockInOut();
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
      },
      {
        title: 'Empresa',
        dataIndex: 'company',
        key: 'company',
        customRender: ({ text, record }) => {
          return h(
            RouterLink,
            {
              to: { path: `/company/${record.employeeId}` },
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
        title: 'Horário',
        dataIndex: 'datetime',
        key: 'datetime',
      },
      {
        title: '',
        dataIndex: 'clocked',
        key: 'clocked',
        customRender: ({ text }) => {
          if (text === 'Entrada') {
            return h(ArrowUpOutlined, { style: { color: 'green' } });
          } else {
            return h(ArrowDownOutlined, { style: { color: 'red' } });
          }
        },
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
</style>
