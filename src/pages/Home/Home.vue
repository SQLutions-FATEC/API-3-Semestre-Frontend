<script>
import HomeHeader from '@/components/Headers/HomeHeader.vue';
import EditClockInModal from '@/components/Modals/EditClockInModal.vue';
import CompanyModal from '@/components/Modals/CompanyModal.vue';
import EmployeeModal from '@/components/Modals/EmployeeModal.vue';
import clockInOut from '@/services/clockInOut';
import { eventBus } from '@/utils/eventBus';
import {
  ArrowDownOutlined,
  ArrowUpOutlined,
  EditOutlined,
} from '@ant-design/icons-vue';
import { Button, Select, Table, Tooltip } from 'ant-design-vue';
import {
  h,
  onBeforeUnmount,
  onMounted,
  ref,
  provide,
  resolveComponent,
} from 'vue';
import { registerNumberMask } from '../../utils';

export default {
  name: 'Home',

  components: {
    'a-button': Button,
    'a-select': Select,
    'a-tooltip': Tooltip,
    'a-table': Table,
    'arrow-up-outlined': ArrowUpOutlined,
    'arrow-down-outlined': ArrowDownOutlined,
    'company-modal': CompanyModal,
    'edit-clock-in-modal': EditClockInModal,
    'edit-outlined': EditOutlined,
    'employee-modal': EmployeeModal,
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
    const isCompanyModalOpened = ref(false);
    const isEmployeeModalOpened = ref(false);
    const selectedCompany = ref({});
    const selectedEmployee = ref({});

    const closeEditModal = () => {
      isEditClockInOpened.value = false;
    };

    const openEmployeeModal = (employee) => {
      selectedEmployee.value = employee;
      isEmployeeModalOpened.value = true;
    };

    const openCompanyModal = (company) => {
      selectedCompany.value = company;
      isCompanyModalOpened.value = true;
    };

    const closeEmployeeModal = () => {
      isEmployeeModalOpened.value = false;
      selectedEmployee.value = {};
    };

    const closeCompanyModal = () => {
      isCompanyModalOpened.value = false;
      selectedCompany.value = {};
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

    provide('apiCall', getEmployeesClockInOut);

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
        customRender: ({ text }) => registerNumberMask(text),
      },
      {
        title: 'Funcionário',
        dataIndex: 'employee',
        key: 'employee',
        customRender: ({ text, record }) => {
          return h(
            'div',
            {
              style: {
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '4px',
              },
            },
            [
              h('span', text),
              h(Button, {
                type: 'primary',
                shape: 'circle',
                size: 'small',
                icon: h(EditOutlined),
                onClick: () => openEmployeeModal(record),
              }),
            ]
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
            'div',
            {
              style: {
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '8px',
                minWidth: '0',
              },
            },
            [
              h(
                resolveComponent('a-tooltip'),
                { placement: 'top', title: text },
                {
                  default: () =>
                    h(
                      'span',
                      {
                        class: 'ellipsis-text',
                        style: {
                          maxWidth: '120px',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                          display: 'inline-block',
                          verticalAlign: 'middle',
                        },
                      },
                      text
                    ),
                }
              ),
              h(Button, {
                type: 'primary',
                shape: 'circle',
                size: 'small',
                icon: h(EditOutlined),
                onClick: () => openCompanyModal(record),
              }),
            ]
          );
        },
      },
      {
        title: 'Função',
        dataIndex: 'role',
        key: 'role',
      },
      {
        title: 'Horas trabalhadas',
        dataIndex: 'worked_hours',
        key: 'double',
        customRender: ({ text }) => {
          const convertToHoursMinutes = (decimalHours) => {
            if (isNaN(decimalHours)) return '00:00';

            const hours = Math.floor(decimalHours);
            const minutes = Math.round((decimalHours - hours) * 60);

            return `${hours}h${minutes.toString().padStart(2, '0')}min`;
          };

          return convertToHoursMinutes(text);
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
      closeCompanyModal,
      closeEditModal,
      closeEmployeeModal,
      currentPage,
      dataSource,
      getEmployeesClockInOut,
      handleTableChange,
      isEditClockInOpened,
      isCompanyModalOpened,
      isEmployeeModalOpened,
      openCompanyModal,
      openEmployeeModal,
      pageSize,
      selectedClockIn,
      selectedCompany,
      selectedEmployee,
      totalInfos,
    };
  },
};
</script>

<template>
  <div class="home">
    <home-header />
    <div class="table-container">
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
        :scroll="{ y: 'calc(100vh - 404px)' }"
        @change="handleTableChange"
      />
    </div>
    <edit-clock-in-modal
      v-if="isEditClockInOpened"
      :clock-in="selectedClockIn"
      @close="closeEditModal"
      @reload="getEmployeesClockInOut"
    />
    <company-modal
      v-if="isCompanyModalOpened"
      v-model:open="isCompanyModalOpened"
      :employee-id="selectedCompany.companyId"
      @close="closeCompanyModal"
    />
    <employee-modal
      v-if="isEmployeeModalOpened"
      v-model:open="isEmployeeModalOpened"
      :employee-id="selectedEmployee.employeeId"
      @close="closeEmployeeModal"
    />
  </div>
</template>

<style lang="scss" scoped>
.home {
  padding: $spacingXxl 0px;
  display: flex;
  flex-direction: column;
  gap: $spacingXl;
}
.table-container {
  :deep(.ant-table-container) {
    overflow: auto;
  }
}

:deep(.ant-table-cell) {
  @include paragraph(medium);
  padding: $spacingXs $spacingSm !important;
}

:deep(.ant-pagination-item-active) {
  border-color: $colorBorderSecondary;

  a {
    color: $colorTextOrange;
  }
}
</style>
