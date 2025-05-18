<script>
import { ref, onMounted } from 'vue';
import { Table } from 'ant-design-vue';
import { h } from 'vue';
import { RouterLink } from 'vue-router';
import employee from '@/services/employee';
import { formatDate } from '@/utils';
import EmployeeHeader from '@/components/Headers/EmployeeHeader.vue';

export default {
  name: 'EmployeeHome',

  components: {
    'a-table': Table,
    'employee-header': EmployeeHeader,
  },

  setup() {
    const currentPage = ref(1);
    const pageSize = ref(10);
    const totalInfos = ref(0);
    const dataSource = ref([]);

    const fetchEmployees = async () => {
      try {
        const { data } = await employee.getAll({
          page: currentPage.value,
          size: pageSize.value,
        });

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
      }
    };

    const handleTableChange = async (pagination) => {
      currentPage.value = pagination.current;
      pageSize.value = pagination.pageSize;
      await fetchEmployees();
    };

    onMounted(fetchEmployees);

    const columns = [
      {
        title: 'Número de registro',
        dataIndex: 'registerNumber',
        key: 'registerNumber',
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
    ];

    return {
      columns,
      dataSource,
      currentPage,
      pageSize,
      totalInfos,
      handleTableChange,
    };
  },
};
</script>

<template>
  <div class="employee-home">
    <employee-header />
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
        :scroll="{ y: 'calc(100vh - 296px)' }"
        @change="handleTableChange"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.employee-home {
  padding: $spacingLg 0 $spacingXxl 0;
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
</style>
