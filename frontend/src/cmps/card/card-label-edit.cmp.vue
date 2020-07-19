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
					<span v-if="hasLabel(label)"><i class="el-icon-check"></i></span>
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
			return this.getLabelIndex(label) !== -1;
		},
		getLabelIndex(label) {
			return this.labels.findIndex((currLabel) => currLabel.color === label.color);
		},
		updateBoardLabels() {
			this.$emit('boardLabelsUpdate', this.labelToEdit);
			this.labelToEdit = null;
		},
		toggleLabel(label) {
			this.$emit('toggleLabel', label);
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