<template>
	<section class="dashboard">
        <div class="facts">
            <div>
                <i class="el-icon-user"></i>
            </div>
        </div>
        <div class="charts">
		<div>
			<h2>Cards per Phase </h2>
			<chart-phases
				class="chart chart-phases"
				:labels="topicNames"
				:data="numsOfCardsPerTopic"
			/>
		</div>
		<div>
			<h2>Cards per Member </h2>
			<chart-members class="chart chart-members" :labels="members" :data="numsOfCardsPerMember"/>
		</div>
        </div>
	</section>
</template>

<script>
import chartPhases from "../board/chart-phases.cmp";
import chartMembers from '../board/chart-members.cmp';
export default {
	props: ["board"],
	data() {
		return {
		};
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
                var sum = 0;
				this.board.topics.forEach(topic => {
                    topic.cards.forEach(card => {
                        if (card.members.find(cardMember => cardMember._id === member._id)) sum++;
                    })
				});
                 return sum;
			});
		}
	},
	methods: {},
	created() {},
	mounted() {
	},
	watch: {},
	components: {
        chartPhases,
        chartMembers
	}
};
</script>

<style>
.chart {
	width: 400px;
}
</style>