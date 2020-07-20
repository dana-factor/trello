<template>
	<section onclick class="card-preview">
			<button @click.stop="removeCard"><i class="el-icon-close"></i></button>
			<div class="card-label" v-for="label in card.labels" :key="label" :style="{backgroundColor: label}">
				<span></span>
			</div>
		<router-link :to="'card/'+card.id" append>
			<h2>{{card.name}}</h2>
			<p v-if="card.description"><i class="el-icon-document"></i></p>
			<p v-if="card.checklists.length"><i class="el-icon-finished"></i> {{checklistCount}}</p>
			<p v-if="card.attachments.length"><i class="el-icon-paperclip"></i> </p>
		</router-link>
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
			return this.card.checklists.reduce(
				(doneEnteries, checklist) => doneEnteries + checklist.tasks.reduce(
					(doneEnteriesInTask, task) => task.isDone ? doneEnteriesInTask + 1 : doneEnteriesInTask
					, 0), 0) +
				'/' +
				this.card.checklists.reduce((enteries, checklist) => enteries += checklist.tasks.length, 0)
		}
	},
	methods: {
		removeCard(){
			this.$emit('removeCard', this.card.id)
		}
	},
	created() { },
	components: {}
};
</script>

<style lang="scss" scoped>
</style>