<script>
import { Select, Table } from 'ant-design-vue';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import company from '@/services/company';
import clockInOut from '@/services/clockInOut';

export default {
  name: 'Home',

  components: {
    'a-select': Select,
    'a-table': Table,
  },

  setup() {
    const router = useRouter();
    const companies = ref([]);
    const currentPage = ref(1);
    const dataSource = ref([])
    const pageSize = ref(10);
    const selectedCompany = ref(null);
    const totalPages = ref(0);

    const getCompanies = async () => {
      try {
        const { data } = await company.get();
        companies.value = data.map((company) => ({
          label: company.company_name,
          value: company.id,
        }));
      } catch (error) {
        console.error(error);
      }
    };

    const getEmployeesClockInOut = async () => {
      try {
        const { data } = await clockInOut.get(
          {
            page: currentPage.value,
            size: pageSize.value,
          }
        );
        dataSource.value = data.items.map((info) => ({
          key: info.id,
          registerNumber: info.register_number,
          employee: info.employee.name,
          company: info.company.name,
          role: info.role_name,
          datetime: info.date_time,
          clocked: info.direction
        }));
        totalPages.value = data.total
      } catch (error) {
        console.error(error);
      }
    }

    const handleChange = (value) => {
      const companyId = value;

      router.push({
        name: 'Company',
        params: { id: String(companyId) },
      });
    };

    const handleTableChange = (paginator) => {
      currentPage.value = paginator.current;
      pageSize.value = paginator.pageSize;
      getEmployeesClockInOut();
    };

    onMounted(async () => {
      await Promise.allSettled([
        getCompanies(),
        getEmployeesClockInOut(),
      ]);
    });

    const columns = [
      {
        title: 'CPF',
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
      },
    ]

    return {
      columns,
      companies,
      currentPage,
      dataSource,
      getCompanies,
      handleChange,
      handleTableChange,
      pageSize,
      selectedCompany,
      totalPages
    };
  },
};
</script>

<template>
  <div>
    <a-select
      v-model:value="selectedCompany"
      placeholder="Empresas"
      style="width: 120px"
      :options="companies"
      @change="handleChange"
    />
    <a-table
      :dataSource="dataSource"
      :columns="columns"
      :pagination="{
        current: currentPage,
        pageSize: pageSize,
        total: totalPages,
        showSizeChanger: true,
        pageSizeOptions: ['10', '20', '50'],
      }"
    @change="handleTableChange" />
  </div>
</template>
