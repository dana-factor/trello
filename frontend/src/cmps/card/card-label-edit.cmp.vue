<template>
	<section class="card-label-edit">
		<ul>
			<li v-for="label in boardLabels" :key="label.color" :style="{backgroundColor:label.color}">
				<button @click="toggleLabel(label)">
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
		}
	},
	computed: {

	},
	methods: {
		hasLabel(label) {
			return this.card.labels.findIndex((currLabel) => currLabel.color === label.color) !== -1
		},
		updateCard() {
			let cardToUpdate = JSON.parse(JSON.stringify(this.card));
			cardToUpdate.labels = this.labels;
			this.$emit('cardUpdate', cardToUpdate);
		},
		toggleLabel(label) {
			let currLabels = this.card.labels
			if (currLabels.includes(label)) currLabels.splice(currLabels.indexOf(label), 1)
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