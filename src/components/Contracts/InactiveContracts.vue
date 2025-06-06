<script>
import { Table } from 'ant-design-vue';
import { ref, watch } from 'vue';
import dayjs from 'dayjs';

export default {
  name: 'InactiveContracts',

  props: {
    contracts: {
      required: true,
      type: Array,
    },
  },

  components: {
    'a-table': Table,
  },

  setup(props, { emit }) {
    const columns = [
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
        title: 'Data do contrato',
        dataIndex: 'date',
        key: 'date',
      },
    ];
    const currentPage = ref(1);
    const dataSource = ref([]);
    const pageSize = ref(5);
    const totalInfos = ref(0);

    const formatContractDate = (start, end) => {
      const startDate = dayjs(start).format('DD/MM/YYYY');
      const endDate = dayjs(end).format('DD/MM/YYYY');
      return `${startDate} até ${endDate}`;
    };

    const getContracts = async () => {
      try {
        const params = {
          page: currentPage.value,
          size: pageSize.value,
        };

        emit('fetch-contracts', params);
      } catch (error) {
        console.error(error);
      }
    };

    const handleTableChange = async (paginator) => {
      currentPage.value = paginator.current;
      pageSize.value = paginator.pageSize;
      await getContracts();
    };

    const updateDataSource = (contracts) => {
      dataSource.value = contracts.map((contract) => ({
        key: contract.id,
        company: contract.company.label,
        role: contract.role.label,
        date: formatContractDate(contract.date_start, contract.date_end),
      }));
    };

    watch(
      () => props.contracts,
      (newContracts) => {
        updateDataSource(newContracts);
        totalInfos.value = newContracts.length;
      },
      { immediate: true }
    );

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
  <div class="inactive-contracts">
    <h2>Contratos inativos</h2>
    <a-table
      :dataSource="dataSource"
      :columns="columns"
      :pagination="{
        current: currentPage,
        pageSize: pageSize,
        total: totalInfos,
        pageSizeOptions: ['5'],
      }"
      @change="handleTableChange"
    />
  </div>
</template>

<style lang="scss" scoped>
.inactive-contracts {
  display: flex;
  flex-direction: column;
  padding: 0px 0px 0px $spacingXxl;
  gap: $spacingMd;

  h2 {
    @include label(medium);
    color: $colorTextDisabled;
  }
}
</style>
