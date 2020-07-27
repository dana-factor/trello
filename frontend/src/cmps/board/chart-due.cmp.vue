
<script>
import VueCharts from 'vue-chartjs';
import { Doughnut } from 'vue-chartjs';

export default {
	extends: Doughnut,
	props: ['labels', 'data'],
	data() {
		return {};
	},
	computed: {},
	methods: {},
	created() {},
	mounted() {
		this.renderChart(
			{
				labels: this.labels,
				datasets: [
					{
						label: 'Due/Delay',
						backgroundColor: [
							'#99b898',
							'#ff847c'
						],
						data: this.data,
						// options: {
						// 	layout: {
						// 		width: '100%',
						// 		height: '100%'
						// 	}
						// }
					}
				]
			},
			{
                responsive: true,
			 	maintainAspectRatio: false,
				legend: {
					display: true,
					labels: {
						fontFamily:
							'-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Noto Sans, Ubuntu, Droid Sans, Helvetica Neue, sans-serif'
					}
				}
			}
		);
	}
};
</script>

<style>
</style>