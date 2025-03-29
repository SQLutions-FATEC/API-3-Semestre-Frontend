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
    const selectedCompany = ref(null);
    const dataSource = ref([])

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
        const { data } = await clockInOut.get();
        dataSource.value = data.map((info) => ({
          key: info.id,
          registerNumber: info.register_number,
          company: info.company.name,
          role: info.role_name,
          datetime: info.date_time,
          clocked: info.direction
        }));
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
      companies,
      getCompanies,
      handleChange,
      selectedCompany,
      dataSource,
      columns
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
    <a-table :dataSource="dataSource" :columns="columns" />
  </div>
</template>
