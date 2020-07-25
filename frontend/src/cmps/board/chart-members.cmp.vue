
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
						backgroundColor: [
							'#6B4C9A',
							'#396AB1',
							'#DA7C30',
							'#CC2529',
							'#535154',
							'#922428',
							'#948B3D',
							'#3E9651'
						],
						data: this.data
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