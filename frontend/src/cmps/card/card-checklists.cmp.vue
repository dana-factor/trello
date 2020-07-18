<template>
	<section class="card-checklists">
		<div class="checklists" v-for="checklist in checklists" :key="checklist.id">
			<i class="el-icon-finished"></i>{{checklist.name}}
			<button @click="removeChecklist(checklist)"><i class="el-icon-delete"></i></button>
			<ul>
				<li v-for="task in checklist.tasks" :key="task.id">
					<input type="checkbox" v-model="task.isDone" @change="$emit('dispatchBoardSave')" />
					{{task.text}}
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
		}
	},
}
</script>

<style>
</style>