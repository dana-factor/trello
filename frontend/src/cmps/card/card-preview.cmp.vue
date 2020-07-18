<template>
	<section onclick class="card-preview">
		<router-link :to="'card/'+card.id" append>{{card.name}}</router-link>
		<p v-if="card.description">📄</p>
		<p v-if="card.checklists.length">{{checklistCount}}</p>
		<p v-if="card.attachments.length">🖼</p>
		<!-- <button>✏</button> -->
	</section>
</template>

<script>
export default {
	props: ['card'],
	data() {
		return {};
	},
	computed: {
		checklistCount() {
			return '✅' + this.card.checklists.reduce(
				(doneEnteries, checklist) => doneEnteries + checklist.tasks.reduce(
					(doneEnteriesInTask, task) => task.isDone ? doneEnteriesInTask + 1 : doneEnteriesInTask
					, 0), 0) +
				'/' +
				this.card.checklists.reduce((enteries, checklist) => enteries += checklist.tasks.length, 0)
		}
	},
	methods: {},
	created() { },
	components: {}
};
</script>

<style scoped>
a {
	display: block;
}
</style>