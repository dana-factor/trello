
<script>

import VueCharts from 'vue-chartjs'
import { Bar } from 'vue-chartjs'
Chart.defaults.global.legend.display = false;
export default {
  extends: Bar,
  props: ['labels', 'data'],
  mounted () {
      console.log(this.labels, this.data)
    this.renderChart({
      labels: this.labels,
      datasets: [
        {
          label: function(tooltipItem) {
                  return tooltipItem.yLabel;
           },
          backgroundColor: ['#6B4C9A', '#948B3D', '#396AB1', '#DA7C30', '#3E9651', '#CC2529', '#535154', '#922428'],
          data: this.data
        }
      ]
   
    },
      {
        scales: {
        yAxes: [{ticks: {min: 0}}]
    }
    })
  }
}


</script>

<style>
</style>