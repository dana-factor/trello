<template>
	<section class="card-checklist-edit">
		<input v-model="checklistTitle" placeholder="Enter checklist title..." />
		<button @click="addChecklist"></button>
	</section>
</template>

<script>
export default {
	props: ['card'],
	data() {
		return {
			cardToUpdate: JSON.parse(JSON.stringify(this.card)),
			checklistTitle: ''
		}
	},
	computed: {

	},
	methods: {
		// updateCard() {
		// 	this.$emit('cardUpdate', this.cardToUpdate);
		// },
		addChecklist() {
			this.$emit('newChecklist', this.checklistTitle);
		}
	},
	created() {

	},
	mounted() {

	},
	watch: {

	},
	components: {

	}

}
</script>

<style>
</style>