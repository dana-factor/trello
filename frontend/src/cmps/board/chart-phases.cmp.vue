

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
          backgroundColor: ['#6B4C9A','#396AB1', '#DA7C30', '#CC2529', '#535154', '#922428', '#948B3D', '#3E9651'],
          data: this.data
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