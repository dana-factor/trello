<template>
	<section class="card-checklists">
		<div class="checklists" v-for="checklist in checklistsToUpdate" :key="checklist.id">
			<i class="el-icon-finished"></i>
			<input v-model="checklist.name" @blur="updateChecklists" @keydown.enter="updateChecklists; $event.target.blur()" />
			<button @click="removeChecklist(checklist)">
				<i class="el-icon-delete"></i>
			</button>
			<ul>
				<li v-for="task in checklist.tasks" :key="task.id">
					<input type="checkbox" v-model="task.isDone" @change="$emit('dispatchBoardSave')" />
					<input v-model="task.text" @blur="updateChecklists" @keydown.enter="updateChecklists; $event.target.blur()" />
					<button @click="removeChecklistTask(checklist.tasks,task)">X</button>
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
			checklistsToUpdate: JSON.parse(JSON.stringify(this.checklists))
		}
	},
	methods: {
		addNewChecklistTask(checklist) {
			this.$emit('newChecklistTaskAdded', checklist, this.newTaskTexts[checklist.id]);
			this.newTaskTexts[checklist.id] = '';
		},
		removeChecklist(checklist) {
			this.$emit('checklistRemoved', checklist.id);
		},
		removeChecklistTask(tasks, task) {
			this.$emit('checklistTaskRemoved', tasks, task.id);
		},
		updateChecklists() {
			this.$emit('checklistsUpdated', this.checklistsToUpdate);
		}
	},
	watch: {
		checklist(value) {
			this.checklistsToUpdate = JSON.parse(JSON.stringify(this.checklists));
		}
	}
}
</script>

<style>
</style>