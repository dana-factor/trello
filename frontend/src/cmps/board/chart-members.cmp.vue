
<script>
import VueCharts from 'vue-chartjs';
import { Bar } from 'vue-chartjs';

Chart.defaults.global.legend.display = false;

export default {
	extends: Bar,
	props: ['labels', 'data'],
	mounted() {
		this.renderChart(
			{
				labels: this.labels,
				datasets: [
					{
						backgroundColor: [
							'#39375b',
							'#745c97',
							'#d597ce',
							'#f5b0cb',
							// '#bbbbbb'
						],
						data: this.data
					}],
			},
			 {		responsive: true,
			 		maintainAspectRatio: false,
					tooltips: {
						enabled: false
						},
					legend: {
						labels: {
							fontFamily:'-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Noto Sans, Ubuntu, Droid Sans, Helvetica Neue, sans-serif'
								}
						},
					scales: {
						yAxes: [
							{
								ticks: {
									min: 0,
									stepSize: 1
								}
							}
								]
							}
					}
		);
	}
};
</script>

<style>
</style>