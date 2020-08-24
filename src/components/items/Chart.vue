<script>
  import { Pie, mixins } from 'vue-chartjs';

  export default {
    name: 'Chart',
    extends: Pie,
    mixins: [mixins.reactiveProp],
    props: ['chartData'],
    mounted () {
      this.renderChart(this.chartData, this.options)
    },
  }
</script>
