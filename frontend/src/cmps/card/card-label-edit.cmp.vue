<template>
	<section class="card-label-edit">
		<ul>
			<li v-for="label in boardLabels" :key="label.color" :style="{backgroundColor:label.color}">
				<button @click="toggleLabel">
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
			labels: JSON.parse(JSON.stringify(this.card.labels))
		}
	},
	computed: {

	},
	methods: {
		hasLabel(label) {
			return this.labels.findIndex((currLabel) => currLabel.color === label.color) !== -1
		},
		updateCard() {
			let cardToUpdate = JSON.parse(JSON.stringify(this.card));
			cardToUpdate.labels = this.labels;
			this.$emit('cardUpdate', cardToUpdate);
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