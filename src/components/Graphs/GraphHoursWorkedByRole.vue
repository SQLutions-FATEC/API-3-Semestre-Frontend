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
    BarChart: Bar,
  },

  data() {
    return {
      chartData: {
        labels: ['Cargo 1', 'Cargo 2', 'Cargo 3', 'Cargo 4'],
        datasets: [
          {
            label: 'Horas Trabalhadas',
            data: [12, 19, 3, 5],
            backgroundColor: ['#74bfe5', '#ff5f00', '#4d4d4d', '#a6a6a6'],
          },
        ],
      },
      chartOptions: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: false,
            text: 'Horas Trabalhadas por Cargo',
          },
        },
      },
    };
  },
};
</script>

<template>
  <div class="graph-hours-worked-by-role">
    <h2>Horas Trabalhadas por Cargo</h2>
    <BarChart :data="chartData" :options="chartOptions" />
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
</style>
