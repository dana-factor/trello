<template>
	<section class="activities">
		<h2>Activities</h2>
		<div>
			<div v-for="activity in activitiesToShow" :key="activity.createdAt">
				<span>{{activity.user.fullName}}</span>
				{{activity.text}}
				<div>{{activity.createdAt | timeSince}}</div>
			</div>
		</div>
	</section>
</template>

<script>
import moment from 'moment';
export default {
	props: ['activities'],
	computed: {
		activitiesToShow() {
			return this.activities.slice(0, 20);
		}
	},
	filters: {
		timeSince(timestamp) {
			return moment(timestamp).fromNow()
		}
	}
}
</script>

<style lang="scss">
.activities {
	cursor: auto;
	> div {
		word-wrap: break-word;
		font-size: 1rem;
		max-height: 50vh;
		overflow-y: auto;
		width: 100%;
	}
}
</style>