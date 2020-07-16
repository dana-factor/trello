<template>
	<section class="card-edit-modal">
		<button onclick="close">X</button>
		<slot></slot>
	</section>
	<!-- <modal v-if="showModal" @close="showModal = false"> -->
</template>
<script>
export default {
	props: [],
	data() {
		return {};
	},
	computed: {},
	methods: {
		close() {
			this.$emit("closeModal");
		}
	},
	created() {},
	components: {}
};
</script>

<style>
</style>