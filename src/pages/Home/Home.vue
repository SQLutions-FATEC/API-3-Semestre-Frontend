<script>
import { Select, Table } from 'ant-design-vue';
import { onMounted, ref } from 'vue';
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons-vue';
import clockInOut from '@/services/clockInOut';
import { h } from 'vue';
import { RouterLink } from 'vue-router';

export default {
  name: 'Home',

  components: {
    'a-select': Select,
    'a-table': Table,
    'arrow-up-outlined': ArrowUpOutlined,
    'arrow-down-outlined': ArrowDownOutlined,
  },

  setup() {
    const currentPage = ref(1);
    const dataSource = ref([]);
    const pageSize = ref(10);
    const totalInfos = ref(0);

    const getEmployeesClockInOut = async () => {
      try {
        const { data } = await clockInOut.get({
          page: currentPage.value,
          size: pageSize.value,
        });
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
      } catch (error) {
        console.error(error);
      }
    };

    const handleTableChange = (paginator) => {
      currentPage.value = paginator.current;
      pageSize.value = paginator.pageSize;
      getEmployeesClockInOut();
    };

    onMounted(async () => {
      await getEmployeesClockInOut();
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
    ];

    return {
      columns,
      currentPage,
      dataSource,
      handleTableChange,
      pageSize,
      totalInfos,
    };
  },
};
</script>

<template>
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
</template>
