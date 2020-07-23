

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
          backgroundColor: ['#6B4C9A', '#948B3D', '#396AB1', '#DA7C30', '#3E9651', '#CC2529', '#535154', '#922428'],
          data: this.data
        }
      ]
    })

    }

}
</script>

<style>


</style>