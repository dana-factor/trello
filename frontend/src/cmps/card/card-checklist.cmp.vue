<template>
  <section class="card-checklist">
	<div class="title">
		<i class="el-icon-finished"></i>
		<input
		type="text"
		class="checklist-name"
		v-model="checklistToUpdate.name"
		@blur="updateChecklistTitle"
		@keydown.enter="updateChecklistTitle; $event.target.blur()"
		/>
		<button class="remove-checklist" @click="removeChecklist(checklist)">
		<i class="el-icon-delete"></i>
		</button>
	</div>
    <div v-if="checklist.tasks.length" class="progress">
      <span>{{checklistProgress}}</span>
      <div>
        <div :class="{completed: checklistCompleted}" :style="{width:checklistProgress}"></div>
      </div>
    </div>
    <ul>
      <li v-for="(task,index) in checklistToUpdate.tasks" :key="task.id">
        <input type="checkbox" v-model="task.isDone" @change="saveToggledTask(task); $event.target.blur()" />
        <input
		  type="text"
          v-model="task.text"
          @blur="updateChecklistTaskText(task,index)"
          @keydown.enter="updateChecklistTaskText(task,index); $event.target.blur()"
        />
        <button @click="removeChecklistTask(task)">
          <i class="el-icon-delete"></i>
        </button>
      </li>
    </ul>
    <input
	  type="text"
      class="add-task"
      @keypress.enter="addNewChecklistTask"
	  @blur="newTaskText = ''"
      v-model="newTaskText"
      placeholder="Add an item"
    />
  </section>
</template>

<script>
export default {
	props: ['checklist'],
	data() {
		return {
			newTaskText: '',
			checklistToUpdate: JSON.parse(JSON.stringify(this.checklist)),
		}
	},
	computed: {
		checklistProgress() {
			const tasksCount = this.checklist.tasks.length;
			const doneTaskCount = this.checklist.tasks.reduce(
				(doneEnteriesInTask, task) =>
					task.isDone ? doneEnteriesInTask + 1 : doneEnteriesInTask, 0);
			return Math.round(((doneTaskCount / tasksCount) * 100)) + '%';
		},
		checklistCompleted() {
			return this.checklistProgress === '100%';
		}
	},
	methods: {
		addNewChecklistTask() {
			this.$emit('newChecklistTaskAdded', this.checklist, this.newTaskText);
			this.newTaskText = '';
		},
		removeChecklistTask(task) {
			this.$emit('checklistTaskRemoved', this.checklist, task.id);
		},
		updateChecklistTitle() {
			if (this.checklistToUpdate.name === this.checklist.name) return;
			if (!this.checklistToUpdate.name) {
				this.checklistToUpdate.name = this.checklist.name;
				return;
			} 
			this.$emit('checklistTitleUpdated', this.checklistToUpdate)
		},
		updateChecklistTaskText(task, index) {
			if (this.checklist.tasks[index].text === task.text) return;
			if (!task.text) return this.removeChecklistTask(task);
			this.$emit('checklistTaskTextUpdated', this.checklist, task);
		},
		removeChecklist() {
			this.$emit('checklistRemoved', this.checklist.id);
		},
		saveToggledTask(task) {
			this.$emit('taskToggled', this.checklist, task)
		}
	},
	watch: {
		checklist(value) {
			this.checklistToUpdate = JSON.parse(JSON.stringify(value));
		},
	}
}
</script>