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
            backgroundColor: '#E55353',
            data: [40, 20, 12, 39, 10, 40, 20, 12, 39, 10,40,20],
          },
          {
            label: 'Medium',
            backgroundColor: '#F9B115',
            data: [15, 25, 18, 30, 15, 15, 25, 18, 30, 15,15,25],
          },
          {
            label: 'Low',
            backgroundColor: '#2EB85C',
            data: [15, 25, 18, 30, 17, 15, 25, 18, 30, 17,15,25],
          },
          // Add more datasets for additional priorities
        ],
      };
    },
    data() {
      return {
        countActive: '0',
        countEmployee: '0',
        countItSup: '0',
        countAdmin: '0',
        countManager: '0',
        countInactive: '0',

      }
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
    methods:{
      
    }
  },
};
</script>
