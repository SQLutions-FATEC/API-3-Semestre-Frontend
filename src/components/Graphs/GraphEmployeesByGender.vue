<script>
import { Pie } from 'vue-chartjs';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import { computed } from 'vue';

ChartJS.register(Title, Tooltip, Legend, ArcElement);

export default {
  name: 'GraphEmployeesByGender',

  components: {
    'pie-chart': Pie,
  },

  props: {
    data: {
      required: true,
      type: Object,
    },
  },

  setup(props) {
    const chartData = {
      labels: ['Masculino', 'Feminino'],
      datasets: [
        {
          data: [props.data.male, props.data.female],
          backgroundColor: ['#74bfe5', '#ff5f00'],
        },
      ],
    };

    const chartOptions = {
      responsive: true,
      plugins: {
        legend: {
          position: 'bottom',
        },
        title: {
          display: false,
          text: 'Funcionários por Gênero',
        },
      },
    };

    const totalEmployees = computed(() => props.data.male + props.data.female);

    return {
      chartData,
      chartOptions,
      totalEmployees,
    };
  },
};
</script>

<template>
  <div class="graph-employees-by-gender">
    <h2>Quantidade de funcionários por gênero</h2>
    <div class="graph-container pie-chart">
      <div class="total-employees">Total: {{ totalEmployees }}</div>
      <pie-chart :data="chartData" :options="chartOptions" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.graph-employees-by-gender {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: $spacingSm;

  h2 {
    @include paragraph(medium);
    text-align: start;
  }
  .pie-chart {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: $spacingSm;
    align-items: center;

    .total-employees {
      @include label(medium);
    }
    :deep(canvas) {
      max-height: 220px;
      height: 100%;
    }
  }
}
</style>
