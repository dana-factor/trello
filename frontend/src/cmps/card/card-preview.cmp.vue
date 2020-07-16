<template>
	<section onclick class="card-preview">
		<router-link :to="'card/'+card.id">{{card.name}}</router-link>
		<!-- <button>✏</button> -->
	</section>
</template>

<script>
export default {
	props: [card],
	data() {
		return {};
	},
	computed: {},
	methods: {},
	created() {},
	components: {}
};
</script>

<style>
</style>