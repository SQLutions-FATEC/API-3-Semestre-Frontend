<script>
import { ExclamationCircleOutlined } from '@ant-design/icons-vue';
import { Table } from 'ant-design-vue';
import { h, ref } from 'vue';
import { formatDateTime, registerNumberMask } from '@/utils';

export default {
  name: 'WithoutMatchRegisters',

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
        title: 'Função',
        dataIndex: 'role',
        key: 'role',
      },
      {
        title: 'Horário de entrada',
        dataIndex: 'date_time_in',
        key: 'date_time_in',
        customRender: ({ text }) => {
          if (!text) {
            return h(ExclamationCircleOutlined, {
              style: { color: 'orange', fontSize: '16px' },
            });
          }
          return text;
        },
      },
      {
        title: 'Horário de saída',
        dataIndex: 'date_time_out',
        key: 'date_time_out',
        customRender: ({ text }) => {
          if (!text) {
            return h(ExclamationCircleOutlined, {
              style: { color: 'orange', fontSize: '16px' },
            });
          }
          return text;
        },
      },
    ];

    dataSource.value = props.data.map((info) => ({
      key: info.id,
      registerNumber: info.register_number,
      employee: info.employee_name,
      company: info.company_name,
      role: info.role_name,
      date_time_in: info.date_time_in
        ? formatDateTime(info.date_time_in)
        : null,
      date_time_out: info.date_time_out
        ? formatDateTime(info.date_time_out)
        : null,
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
    <h2>Movimentações incompletas</h2>
    <div class="graph-container table-container">
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
  align-items: center;
  gap: $spacingSm;

  h2 {
    @include paragraph(medium);
    text-align: start;
  }
  .table-container {
    display: flex;
    flex-direction: column;
    gap: $spacingSm;

    span {
      @include paragraph(small);
    }
  }
}
:deep(.ant-table-cell) {
  padding: 0px 2px !important;
  font-size: 11px !important;
  text-align: center !important;
}
</style>
