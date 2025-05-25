<script>
import { DatePicker } from 'ant-design-vue';
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
import { ref, watch } from 'vue';
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
    'a-range-picker': DatePicker.RangePicker,
    'bar-chart': Bar,
  },

  props: {
    data: {
      required: true,
      type: Object,
    },
    dateRange: {
      default: () => [],
      type: Array,
    },
  },

  setup(props, { emit }) {
    const minValue = Math.min(...props.data.hours);
    const maxValue = Math.max(...props.data.hours);

    const selectedDatetime = ref([...props.dateRange]);

    const chartOptions = {
      indexAxis: 'y',
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
          min: 0,
          max: maxValue + 5,
        },
        y: {
          title: {
            display: true,
            text: 'Cargos',
            color: '#4c4c4c',
            font: { size: 14, weight: 'bold' },
          },
          ticks: {
            color: '#4c4c4c',
            callback: function (value, index, ticks) {
              const label = this.getLabelForValue(value);
              return label.length > 10 ? label.slice(0, 10) + '…' : label;
            },
          },
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

    watch(selectedDatetime, (val) => {
      if (val && val.length === 2 && val[1]) {
        emit('date-range-change', val);
      }
    });

    return {
      chartData,
      chartOptions,
      selectedDatetime,
    };
  },
};
</script>

<template>
  <div class="graph-hours-worked-by-role">
    <div class="header__wrapper">
      <h2>Horas Trabalhadas por Cargo (Semanal)</h2>
      <a-range-picker
        v-model:value="selectedDatetime"
        style="width: 100%"
        format="DD/MM/YYYY"
        :placeholder="['Data início', 'Data fim']"
      />
    </div>
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

  .header__wrapper {
    display: flex;
    gap: $spacingXs;

    h2 {
      @include paragraph(medium);
      text-align: center;
    }
  }
}
.graph-container {
  max-height: 400px;
  overflow-y: auto;
  padding: $spacingMd $spacingXl;
  background-color: $colorBackgroundNeutral;
  border: 1px solid $colorBorder;
  border-radius: $borderRadiusSm;
}
</style>
