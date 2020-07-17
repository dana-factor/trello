<template>
	<section class="card-edit-modal">
		<!-- <div class="header flex"> -->
			
			<slot name="header"><button @click="close">X</button></slot>
		<!-- </div> -->
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

<style lang="scss">
.card-edit-modal {
	position: absolute;
	background-color: lightcoral;
	top: 0;
	text-align: right;
}
</style>