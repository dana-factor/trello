<template>
	<section class="card-label-edit">
		<ul>
			<li v-for="label in boardLabels" :key="label.color">
				<button @click="toggleLabel(label)" :style="{backgroundColor:label.color}">
					<span v-if="hasLabel(label)">V</span>
					{{label.title}}
				</button>
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
			cardToUpdate: JSON.parse(JSON.stringify(this.card))
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
			// let cardToUpdate = JSON.parse(JSON.stringify(this.card));
			this.$emit('cardUpdate', this.cardToUpdate);
		},
		toggleLabel(label) {
			let currLabels = this.cardToUpdate.labels
			if (this.hasLabel(label)) currLabels.splice(this.getLabelIndex(label), 1)
			else currLabels.push(label);
			this.updateCard();
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