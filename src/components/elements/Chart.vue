<script>
  import { Pie } from 'vue-chartjs';

  export default {
    name: 'Chart',
    extends: Pie,
    props: ['values', 'labels', 'colors'],
    data () {
      return {
        chartData: {
          labels: this.labels,
          datasets: [{
            data: this.values,
            borderWidth: 1,
            backgroundColor: this.colors
          }]
        },
        options: {
          legend: { display: true },
          responsive: true,
          maintainAspectRatio: false
        }
      }
    },
    mounted () {
      this.renderChart(this.chartData, this.options)
    },
  }
</script>
