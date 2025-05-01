<script>
import { ref } from 'vue';
import xlsx from 'node-xlsx';
import { message } from 'ant-design-vue';
import { DownloadOutlined } from '@ant-design/icons-vue';

export default {
  props: {
    data: {
      required: true,
      type: Array,
      validator: (value) => value.every((item) => typeof item === 'object'),
    },
    fileName: {
      default: 'exportacao',
      type: String,
    },
    sheetName: {
      default: 'Dados',
      type: String,
    },
  },

  components: {
    DownloadOutlined,
  },

  setup(props) {
    const isLoading = ref(false);
    const CHUNK_SIZE = import.meta.env.VITE_EXCEL_CHUNK_SIZE || 100;

    const processInChunks = async (data, processFn) => {
      const chunks = [];
      for (let index = 0; index < data.length; index += CHUNK_SIZE) {
        chunks.push(data.slice(index, index + CHUNK_SIZE));
      }

      const results = [];
      for (const chunk of chunks) {
        results.push(...(await processFn(chunk)));
        await new Promise((resolve) => setTimeout(resolve, 10));
      }
      return results;
    };

    const exportToExcel = async () => {
      if (!props.data || props.data.length === 0) {
        return message.error('Nenhum dado disponível para exportação')
      }

      isLoading.value = true;

      try {
        const formattedData = await processInChunks(props.data, (chunk) => {
          return formatData(chunk);
        });

        const headers = Object.keys(formattedData[0]);
        const rows = formattedData.map((item) => Object.values(item));

        const worksheet = [headers, ...rows];

        const buffer = xlsx.build([
          {
            name: props.sheetName,
            data: worksheet,
          },
        ]);

        const blob = new Blob([buffer], {
          type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        });
        const url = URL.createObjectURL(blob);

        const link = document.createElement('a');
        link.href = url;
        link.download = `${props.fileName}_${new Date().toISOString().slice(0, 10)}.xlsx`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      } catch (error) {
        message.error('Erro na exportação:', error)
      } finally {
        isLoading.value = false;
      }
    };

    const formatData = (data) => {
      return data.map((info) => {
        return {
          'Número de Registro': info.registerNumber,
          Funcionário: info.employee,
          Empresa: info.company,
          Função: info.role,
          Horário: info.datetime,
          Movimentação: info.direction,
        };
      });
    };

    return {
      exportToExcel,
      isLoading,
    };
  },
};
</script>

<template>
  <a-button type="primary" :loading="isLoading" @click="exportToExcel">
    <template #icon>
      <download-outlined />
    </template>
    Exportar para Excel
  </a-button>
</template>
