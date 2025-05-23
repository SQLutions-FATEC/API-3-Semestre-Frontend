<script>
import { Table } from 'ant-design-vue';
import { ref } from 'vue';
import { formatDate, registerNumberMask } from '@/utils';

export default {
  name: 'ContractsToExpire',

  components: {
    'a-table': Table,
  },

  props: {
    data: {
      required: true,
      type: Object,
    },
  },

  setup(props) {
    const dataSource = ref([]);

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
      },
      {
        title: 'Empresa',
        dataIndex: 'company',
        key: 'company',
        ellipsis: true,
      },
      {
        title: 'Vencimento',
        dataIndex: 'datetime',
        key: 'datetime',
      },
    ];

    dataSource.value = props.data.map((info) => ({
      key: info.contract_id,
      registerNumber: info.register_number,
      employee: info.employee_name,
      company: info.company_name,
      datetime: formatDate(info.end_date),
    }));

    return {
      columns,
      dataSource,
    };
  },
};
</script>

<template>
  <div class="contracts-to-expire">
    <h2>Próximos contratos a vencer</h2>
    <div class="graph-container">
      <a-table
        :dataSource="dataSource"
        :columns="columns"
        :pagination="false"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.contracts-to-expire {
  display: flex;
  flex-direction: column;
  gap: $spacingSm;

  h2 {
    @include paragraph(medium);
    text-align: start;
  }
}
:deep(.ant-table-cell) {
  padding: 0px 2px !important;
  font-size: 11px !important;
  text-align: center !important;
}
</style>
