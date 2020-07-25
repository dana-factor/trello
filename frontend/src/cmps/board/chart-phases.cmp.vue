

<script>
import VueCharts from 'vue-chartjs'
import { Pie } from 'vue-chartjs'

export default {
    extends: Pie,
    props:['labels', 'data'],
    data(){
        return{

        }
    },
    computed: {

    },
    methods: {

    },
    created(){
    },
    mounted(){
    this.renderChart({
      labels: this.labels,
      datasets: [
        {
          label: 'Cards per Phase',
          backgroundColor: ['#fee2b3','#ffa299', '#ad6989', '#562349', '#bbbbbb'],
          data: this.data,
          options: {
							legend: {
								labels: {
									fontFamily: '-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Noto Sans, Ubuntu, Droid Sans, Helvetica Neue, sans-serif'
								}
							}
						}
        }
      ]
    },
    {
      legend: {
        display: true
      }
    }
    )

    }

}
</script>

<style>


</style>