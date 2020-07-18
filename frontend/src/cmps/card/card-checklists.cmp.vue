<template>
	<section class="card-checklists">
		<div class="checklists" v-for="checklist in checklists" :key="checklist.id">
			{{'✅' + checklist.name}}
			<ul>
				<li v-for="task in checklist.tasks" :key="task.id">
					<input type="checkbox" v-model="task.isDone" @change="$emit('dispatchBoardSave')" />
					{{task.text}}
				</li>
			</ul>
			<input
				@keypress.enter="addNewChecklistTask(checklist)"
				v-model="newTaskTexts[checklist.id]"
				placeholder="Enter new task..."
			/>
			<button @click="addNewChecklistTask(checklist)">Add</button>
		</div>
	</section>
</template>

<script>
export default {
	props: ['checklists'],
	data() {
		return {
			newTaskTexts: {},
		}
	},
	methods: {
		addNewChecklistTask(checklist) {
			this.$emit('newChecklistTaskAdded', checklist, this.newTaskTexts[checklist.id]);
			this.newTaskTexts[checklist.id] = '';
		}
	},
}
</script>

<style>
</style>