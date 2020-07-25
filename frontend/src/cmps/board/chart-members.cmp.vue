
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
						label: function(tooltipItem) {
							return tooltipItem.yLabel;
						},
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
				scales: {
					yAxes: [
						{
							ticks: {
								min: 0,
								stepSize: 1
							}
						}
					]
				},
				tooltips: {
					enabled: false
				}
			}
		);
	}
};
</script>

<style>
</style>