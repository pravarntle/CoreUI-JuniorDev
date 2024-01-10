<template>
  <CChartBar :data="defaultData" :options="chartOptions" />
</template>

<script>
import { CChartBar } from '@coreui/vue-chartjs';

export default {
  name: 'CChartStackedBarExample',
  components: { CChartBar },
  computed: {
    defaultData() {
      return {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [
          {
            label: 'High',
            backgroundColor: '#165BAA',
            data: [40, 20, 12, 39, 10, 40, 20, 12, 39, 10,40,20],
          },
          {
            label: 'Medium',
            backgroundColor: '#A155B9',
            data: [15, 25, 18, 30, 15, 15, 25, 18, 30, 15,15,25],
          },
          {
            label: 'Low',
            backgroundColor: '#F765A3',
            data: [15, 25, 18, 30, 17, 15, 25, 18, 30, 17,15,25],
          },
          // Add more datasets for additional priorities
        ],
      };
    },
    chartOptions() {
      return {
        scales: {
          x: {
            stacked: true,
          },
          y: {
            stacked: true,
          },
        },
      };
    },
  },
};
</script>
