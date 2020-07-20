<template>
	<section class="card-label-edit">
		<div v-if="labelToEdit">
			<input v-model="labelToEdit.title" />
			<button @click="updateBoardLabels">Save</button>
		</div>
		<ul>
			<li v-for="label in boardLabels" :key="label.color">
				<button class="label" @click="toggleLabel(label)" :style="{backgroundColor:label.color}">
					{{label.title}}
					<span v-if="hasLabel(label.color)"><i class="el-icon-check"></i></span>
				</button>
				<button @click="editTitle(label)"><i class="el-icon-edit"></i></button>
			</li>
		</ul>
	</section>
</template>

<script>
export default {
	props: ['labels', 'boardLabels'],
	data() {
		return {
			labelToEdit: null,
		}
	},
	computed: {

	},
	methods: {
		hasLabel(label) {
			return this.labels.includes(label);
		},
		updateBoardLabels() {
			this.$emit('boardLabelsUpdate', this.labelToEdit);
			this.labelToEdit = null;
		},
		toggleLabel(label) {
			this.$emit('toggleLabel', label.color);
		},
		editTitle(label) {
			if (this.labelToEdit && this.labelToEdit.color === label.color) this.labelToEdit = null;
			else this.labelToEdit = JSON.parse(JSON.stringify(label))
		}
	},
}
</script>

<style>
</style>