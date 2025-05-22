<script>
import { ref } from 'vue';
import xlsx from 'node-xlsx';
import { message } from 'ant-design-vue';
import { DownloadOutlined } from '@ant-design/icons-vue';
import clockInOut from '@/services/clockInOut';

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

    const exportToExcel = async (customData = null) => {
      const dataToExport = customData || props.data;

      if (!dataToExport || dataToExport.length === 0) {
        return message.error('Nenhum dado disponível para exportação');
      }

      isLoading.value = true;

      try {
        const formattedData = await processInChunks(dataToExport, formatData);
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
        message.error('Erro na exportação:' + error.message);
      } finally {
        isLoading.value = false;
      }
    };

    const getNestedProperty = (obj, path) => {
      return path.split('.').reduce((acc, part) => {
        const cleanPart = part.replace('?', '');
        return acc && acc[cleanPart];
      }, obj);
    };

    const formatProperty = (info, propNames) => {
      for (const prop of propNames) {
        const value = prop.includes('.')
          ? getNestedProperty(info, prop)
          : info[prop];

        if (value !== undefined && value !== null) {
          return value;
        }
      }
      return '--';
    };

    const fieldMap = {
      'Número de Registro': ['employee.register_number', 'registerNumber'],
      Funcionário: ['employee.name', 'employee'],
      Empresa: ['company.name', 'company'],
      Função: ['role_name', 'role'],
      'Data de Entrada': ['date_time_in'],
      'Data de Saída': ['date_time_out'],
      'Horas Trabalhadas': ['worked_hours'],
    };

    const formatData = (data) => {
      return data.map((info) => {
        const formattedRow = {};

        Object.entries(fieldMap).forEach(([excelHeader, sourceProps]) => {
          if (excelHeader !== 'Horas Trabalhadas') {
            formattedRow[excelHeader] = formatProperty(info, sourceProps);
          }
        });

        if (info.worked_hours !== undefined && info.worked_hours !== null) {
          const hours = Math.floor(info.worked_hours);
          const minutes = Math.round((info.worked_hours % 1) * 60);
          formattedRow['Horas Trabalhadas'] = `${hours}h${minutes}min`;
        } else {
          formattedRow['Horas Trabalhadas'] = '--';
        }

        return formattedRow;
      });
    };

    const exportAllToExcel = async () => {
      isLoading.value = true;

      try {
        const { data } = await clockInOut.get({
          export: true,
        });

        await exportToExcel(data);
      } catch (error) {
        message.error('Erro ao exportar todos: ' + error.message);
      } finally {
        isLoading.value = false;
      }
    };

    return {
      exportToExcel,
      exportAllToExcel,
      isLoading,
    };
  },
};
</script>

<template>
  <a-button type="primary" :loading="isLoading" @click="exportToExcel()">
    <template #icon>
      <download-outlined />
    </template>
    Exportar para Excel
  </a-button>
  <a-button type="primary" :loading="isLoading" @click="exportAllToExcel">
    <template #icon>
      <download-outlined />
    </template>
    Exportar todos os registros
  </a-button>
</template>
