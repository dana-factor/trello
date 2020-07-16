<template>
	<section class="card-label-edit">
		<ul>
			<li v-for="label in labels" :key="label.color" :style="{color:label.color}">{{label.title}}</li>
		</ul>
	</section>
</template>

<script>
export default {
	props: [card],
	data() {
		return {
            labels: [...card.labels]
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