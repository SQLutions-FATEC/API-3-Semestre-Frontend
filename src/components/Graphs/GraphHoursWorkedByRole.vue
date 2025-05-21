<script>
import { Bar } from 'vue-chartjs';
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from 'chart.js';
import { ref } from 'vue';
import { generateRandomColors } from '@/utils';

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
);

export default {
  name: 'GraphHoursWorkedByRole',

  components: {
    'bar-chart': Bar,
  },

  props: {
    data: {
      required: true,
      type: Object,
    },
  },

  setup(props) {
    const minValue = Math.min(...props.data.hours);
    const maxValue = Math.max(...props.data.hours);

    const chartOptions = {
      indexAxis: 'y', // <-- Torna as barras horizontais
      responsive: true,
      plugins: {
        legend: { display: false },
        title: { display: false, text: 'Horas Trabalhadas por Cargo' },
      },
      scales: {
        x: {
          title: {
            display: true,
            text: 'Horas',
            color: '#4c4c4c',
            font: { size: 14, weight: 'bold' },
          },
          ticks: { color: '#4c4c4c' },
          min: minValue - 10,
          max: maxValue + 10,
        },
        y: {
          title: {
            display: true,
            text: 'Cargos',
            color: '#4c4c4c',
            font: { size: 14, weight: 'bold' },
          },
          ticks: { color: '#4c4c4c' },
        },
      },
      animation: {
        onComplete: (chart) => {
          const ctx = chart.chart.ctx;
          const datasets = chart.chart.data.datasets;
          const meta = chart.chart.getDatasetMeta(0);
          meta.data.forEach((bar, index) => {
            const value = datasets[0].data[index];
            const x = bar.x + 20;
            const y = bar.y;
            ctx.save();
            ctx.font = 'bold 12px Arial';
            ctx.fillStyle = '#4c4c4c';
            ctx.textAlign = 'left';
            ctx.fillText(value, x, y + 4);
            ctx.restore();
          });
        },
      },
    };

    const chartData = ref({
      labels: props.data.labels,
      datasets: [
        {
          data: props.data.hours,
          backgroundColor: generateRandomColors(props.data.labels.length),
        },
      ],
    });

    return {
      chartData,
      chartOptions,
    };
  },
};
</script>

<template>
  <div class="graph-hours-worked-by-role">
    <h2>Horas Trabalhadas por Cargo (Semanal)</h2>
    <div class="graph-container">
      <bar-chart :data="chartData" :options="chartOptions" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.graph-hours-worked-by-role {
  display: flex;
  flex-direction: column;
  gap: $spacingSm;

  h2 {
    @include paragraph(medium);
    text-align: start;
  }
}

.graph-container {
  max-height: 400px; // ajuste conforme necessário
  overflow-y: auto;
  padding: $spacingMd $spacingXl;
  background-color: $colorBackgroundNeutral;
  border: 1px solid $colorBorder;
  border-radius: $borderRadiusSm;
}
</style>
