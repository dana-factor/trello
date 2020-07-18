<template>
	<section class="card-checklist-edit">
		<input v-model="checklistName" @keypress.enter="addChecklist" placeholder="Enter checklist title..." />
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
			if (this.checklistName) {
				this.$emit('newChecklist', this.checklistName);
				this.$emit('modalClose');
			}
		}
	},
}
</script>

<style>
</style>