<template>
	<section class="activities">
		<div>
			<div class="activity" v-for="activity in activitiesToShow" :key="activity.createdAt">
				<avatar :src="activity.user.imgUrl" :username="activity.user.fullName" :lighten="100" :size="28" />
				<p><span>{{activity.user.fullName}}</span> {{activity.text}}</p>
				<p class="time">{{activity.createdAt | timeSince}}</p>
			</div>
		</div>
	</section>
</template>

<script>
import moment from 'moment';
import Avatar from 'vue-avatar'
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
	},
	components: {
		Avatar
	}
}
</script>

<style lang="scss">
// .activities {
// 	cursor: auto;
// 	i{
// 		font-size: 22px;
// 		font-weight: 500;
// 		display: inline-block;
// 		margin-right: 13px;
// 		&::before{
// 			vertical-align: middle;
// 		}
// 	}
// 	h2 {
// 		line-height: rem(20px);
// 		font-size: rem(16px);
// 		font-weight: 600;
// 		margin-bottom: 7px;
// 	}
// 	> div {
// 		word-wrap: break-word;
// 		font-size: 1rem;
// 		max-height: 50vh;
// 		overflow-y: auto;
// 		width: 100%;
// 		margin-left: 35px;
// 		color: #172b4d;
// 		font-size: rem(14px);
// 		line-height: 20px;
// 		font-weight: 400;
// 		span{
// 			font-weight: 700;
// 		}
// 		p.time{
// 			display: block;
// 			color: #5e6c84;
// 			font-size: rem(12px);
// 		}
// 	}
// }
</style>