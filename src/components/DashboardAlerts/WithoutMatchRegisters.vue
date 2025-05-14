<script>
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons-vue';
import { Table } from 'ant-design-vue';
import { h, ref } from 'vue';
import { formatDate } from '@/utils';

export default {
  name: 'WithoutMatchRegisters',

  components: {
    'a-table': Table,
    'arrow-up-outlined': ArrowUpOutlined,
    'arrow-down-outlined': ArrowDownOutlined,
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
        customRender: ({ text }) => {
          const masked = text.replace(
            /^(\d{3})(\d{5})(\d{2})(\d{1})$/,
            '$1.$2.$3-$4'
          );
          return masked;
        },
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
        dataIndex: 'direction',
        key: 'direction',
        customRender: ({ text }) => {
          if (text === 'Entrada') {
            return h(ArrowUpOutlined, { style: { color: 'green' } });
          } else {
            return h(ArrowDownOutlined, { style: { color: 'red' } });
          }
        },
      },
    ];

    dataSource.value = props.data.map((info) => ({
      key: info.id,
      registerNumber: info.employee.register_number,
      employee: info.employee.name,
      company: info.company.name,
      role: info.role_name,
      datetime: formatDate(info.date_time_in || info.date_time_out),
      direction: info.date_time_in ? 'Entrada' : 'Saída',
    }));

    return {
      columns,
      dataSource,
    };
  },
};
</script>

<template>
  <div class="without-match-registers">
    <h2>Registros sem par</h2>
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
.without-match-registers {
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
