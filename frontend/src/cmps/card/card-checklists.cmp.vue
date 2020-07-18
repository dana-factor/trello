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
				@keypress.enter="$emit('newChecklistTaskAdded',checklist,newTaskTexts[checklist.id])"
				v-model="newTaskTexts[checklist.id]"
				placeholder="Enter new task..."
			/>
			<button @click="$emit('newChecklistTaskAdded',checklist,newTaskTexts[checklist.id])">Add</button>
		</div>
	</section>
</template>

<script>
export default {
    props:['checklists'],
	data() {
		return {
			newTaskTexts: {},
		}
	},
	computed: {

	},
	methods: {

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