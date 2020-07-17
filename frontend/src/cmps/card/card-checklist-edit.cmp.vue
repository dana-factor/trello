<template>
	<section class="card-checklist-edit">
		<input v-model="checklistName" placeholder="Enter checklist title..." />
		<button @click="addChecklist">Add</button>
	</section>
</template>

<script>
export default {
	// props: ['card'],
	data() {
		return {
			// cardToUpdate: JSON.parse(JSON.stringify(this.card)),
			checklistName: ''
		}
	},
	computed: {

	},
	methods: {
		// updateCard() {
		// 	this.$emit('cardUpdate', this.cardToUpdate);
		// },
		addChecklist() {
			this.$emit('newChecklist', this.checklistName);
		}
	},
}
</script>

<style>
</style>