

<script>
import VueCharts from 'vue-chartjs';
import { Pie } from 'vue-chartjs';

export default {
	extends: Pie,
	props: ['labels', 'data'],
	mounted() {
		this.renderChart(
			{
				labels: this.labels,
				datasets: [
					{
						label: 'Cards per Phase',
						backgroundColor: [
							'#fee2b3',
							'#ffa299',
							'#ad6989',
							'#562349',
							'#bbbbbb'
						],
						data: this.data,
					}
				]
			},
			{
				layout: {
					width: '100%',
					height: '100%'
				},
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