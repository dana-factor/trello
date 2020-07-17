<template>
	<section class="card-edit-modal">
		<button @click="close">X</button>
		<slot></slot>
	</section>
	<!-- <modal v-if="showModal" @close="showModal = false"> -->
</template>
<script>
export default {
	methods: {
		close() {
			this.$emit('modalClose');
		}
	},
};
</script>

<style lang="scss" scoped>
section {
	position: absolute;
}
</style>