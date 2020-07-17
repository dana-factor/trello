<template>
	<section class="card-label-edit">
		<div v-if="labelToEdit">
			<input v-model="labelToEdit.title" />
			<button @click="updateBoardLabels">Save</button>
		</div>
		<ul>
			<li v-for="label in boardLabelsToUpdate" :key="label.color">
				<button @click="toggleLabel(label)" :style="{backgroundColor:label.color}">
					<span v-if="hasLabel(label)">V</span>
					{{label.title}}
				</button>
				<button @click="editTitle(label)">Edit</button>
			</li>
		</ul>
	</section>
</template>

<script>
export default {
	props: ['card', 'boardLabels'],
	data() {
		return {
			// labels: JSON.parse(JSON.stringify(this.card.labels))
			cardToUpdate: JSON.parse(JSON.stringify(this.card)),
			boardLabelsToUpdate: JSON.parse(JSON.stringify(this.boardLabels)),
			labelToEdit: null,
			labelToEditOG: null
		}
	},
	computed: {

	},
	methods: {
		hasLabel(label) {
			return this.getLabelIndex(label) !== -1;
		},
		getLabelIndex(label) {
			return this.cardToUpdate.labels.findIndex((currLabel) => currLabel.color === label.color);
		},
		updateCard() {
			this.$emit('cardUpdate', this.cardToUpdate);
		},
		updateBoardLabels() {
			this.labelToEditOG.title = this.labelToEdit.title;
			this.labelToEdit = null;
			this.$emit('boardLabelsUpdate', this.boardLabelsToUpdate);
		},
		toggleLabel(label) {
			let currLabels = this.cardToUpdate.labels
			if (this.hasLabel(label)) currLabels.splice(this.getLabelIndex(label), 1)
			else currLabels.push(label);
			this.updateCard();
		},
		editTitle(label) {
			if (this.labelToEditOG === label) {
				this.labelToEdit = null;
				this.labelToEditOG = null;
			}
			else {
				this.labelToEditOG = label;
				this.labelToEdit = JSON.parse(JSON.stringify(label))
			};
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