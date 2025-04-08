<script>
import { ref } from 'vue';
import xlsx from 'node-xlsx';

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

  setup(props) {
    const isLoading = ref(false);

    const exportToExcel = async () => {
      isLoading.value = true;

      try {
        const headers = Object.keys(props.data[0]);
        const rows = props.data.map((item) => Object.values(item));

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
        console.error('Erro na exportação:', error);
      } finally {
        isLoading.value = false;
      }
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
    Exportar para Excel
  </a-button>
</template>
