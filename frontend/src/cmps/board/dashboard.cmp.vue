<template>
	<section class="dashboard-screen">
		<section class="dashboard">
			<i
				class="el-icon-close"
				@click="closeDashboard"
			></i>
			<div class="facts">
				<div class="fact-half">
					<div class="info-box">
						<i class="el-icon-user"></i>
						<div class="info">
							<h4> {{members.length}} </h4>
							<p> members </p>
						</div>
					</div>
					<div class="info-box">
						<i class="el-icon-postcard"></i>
						<div class="info">
							<h4> {{numOfCardsTotal}} </h4>
							<p> total cards </p>
						</div>
					</div>
				</div>
				<div class="fact-half">
					<div class="info-box">
						<i class="el-icon-question"></i>
						<div class="info">
							<h4> {{numOfUnassignedCards}} </h4>
							<p> unassigned cards </p>
						</div>
					</div>
					<div class="info-box">
						<i class="el-icon-thumb"></i>
						<div class="info">
							<h4> {{numOfActivities}} </h4>
							<p> activities </p>
						</div>
					</div>
				</div>
			</div>
			<div class="charts">
				<div>
					<h2>Cards per Phase </h2>
					<!-- <div width=400px> -->
					<chart-phases
						class="chart chart-phases"
						:labels="topicNames"
						:data="numsOfCardsPerTopic"
                       
					/>
					<!-- width=100% 
                height =100% -->
					<!-- </div> -->
                     <!-- :style="{width: '350px', height: '100%'}" -->
				</div>
				<div>
					<h2>Cards per Member </h2>
					<chart-members
						class="chart chart-members"
						:labels="members"
						:data="numsOfCardsPerMember"
                       
					/>
				</div>
			</div>
		</section>
	</section>
</template>

<script>
import chartPhases from '../board/chart-phases.cmp';
import chartMembers from '../board/chart-members.cmp';
export default {
	props: ['board'],
	data() {
		return {};
	},
	computed: {
		topicNames() {
			return this.board.topics.map(topic => topic.name);
		},
		numsOfCardsPerTopic() {
			return this.board.topics.map(topic => topic.cards.length);
		},
		members() {
			return this.board.members.map(member => member.fullName);
		},
		numsOfCardsPerMember() {
			return this.board.members.map(member => {
				var total = this.board.topics.reduce((acc, topic) => {
					var sum = topic.cards.reduce((acc, card) => {
						if (
							card.members.find(
								cardMember => cardMember._id === member._id
							)
						)
							return acc + 1;
						else return acc;
					}, 0);
					return sum + acc;
				}, 0);
				return total;
			});
		},
		numOfCardsTotal() {
			var sum = this.board.topics.reduce((acc, topic) => {
				return topic.cards.length + acc;
			}, 0);
			return sum;
		},
		numOfUnassignedCards() {
			return this.board.topics.reduce((acc, topic) => {
				var sum = topic.cards.reduce((acc, card) => {
					if (!card.members.length) return acc + 1;
					else return acc;
				}, 0);
				return sum + acc;
			}, 0);
		},
		numOfActivities() {
			return this.board.activities.length;
		}
	},
	methods: {
		closeDashboard() {
			this.$emit('closeDashboard');
		}
	},
	created() {},
	mounted() {},
	watch: {},
	components: {
		chartPhases,
		chartMembers
	}
};
</script>

<style>
</style>