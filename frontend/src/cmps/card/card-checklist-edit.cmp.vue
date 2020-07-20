<template>
	<section class="card-checklist-edit">
		<input
			v-model="checklistName"
			@keypress.enter="addChecklist"
			placeholder="Enter checklist title..."
			v-focus
		/>
		<button @click="addChecklist">Add</button>
	</section>
</template>

<script>
export default {
	data() {
		return {
			checklistName: ''
		}
	},
	methods: {
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