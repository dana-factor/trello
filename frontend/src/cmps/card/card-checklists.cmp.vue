<template>
	<section class="card-checklists">
		<div class="checklists" v-for="checklist in checklistsToUpdate" :key="checklist.id">
			<i class="el-icon-finished"></i>
			<input
				v-model="checklist.name"
				@blur="updateChecklists"
				@keydown.enter="updateChecklists; $event.target.blur()"
			/>
			<button @click="removeChecklist(checklist)">
				<i class="el-icon-delete"></i>
			</button>
			<ul>
				<li v-for="task in checklist.tasks" :key="task.id">
					<input type="checkbox" v-model="task.isDone" @change="$emit('dispatchBoardSave')" />
					<input
						v-model="task.text"
						@blur="updateChecklists"
						@keydown.enter="updateChecklists; $event.target.blur()"
					/>
					<button @click="removeChecklistTask(checklist,task)">X</button>
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
			checklistsToUpdate: JSON.parse(JSON.stringify(this.checklists)),
		}
	},
	// created() {
	// 	this.checklists.forEach(tasks => {
	// 		this.$set(tasks);
	// 	});
	// },
	methods: {
		addNewChecklistTask(checklist) {
			this.$emit('newChecklistTaskAdded', checklist.id, this.newTaskTexts[checklist.id]);
			this.newTaskTexts[checklist.id] = '';
			this.updateCopy();
		},
		removeChecklist(checklist) {
			this.$emit('checklistRemoved', checklist.id);
		},
		removeChecklistTask(checklist, task) {
			this.$emit('checklistTaskRemoved', checklist.id, task.id);
			this.updateCopy();
		},
		updateChecklists() {
			this.$emit('checklistsUpdated', this.checklistsToUpdate);
		},
		updateCopy() {//idk it doesnt watch tasks
			this.checklistsToUpdate = JSON.parse(JSON.stringify(this.checklists));
		}
	},
	watch: {
		checklists(value) {
			this.checklistsToUpdate = JSON.parse(JSON.stringify(this.checklists));
		},
		deep: true
	}
}
</script>

<style>
</style>