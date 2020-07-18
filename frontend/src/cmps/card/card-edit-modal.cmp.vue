<template>
	<section class="card-edit-modal" @click.stop>
		<!-- <div class="header flex"> -->
		<header>
			<slot name="header"></slot>
			<button @click="close">X</button>
		</header>
		<!-- </div> -->
		<slot></slot>
	</section>
	<!-- <modal v-if="showModal" @close="showModal = false"> -->
</template>
<script>
export default {
	// props:['modalLocation'],
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
	top: 70px;
	right: 40px;
	width: 300px;
	min-height: 100px;
	text-align: right;
}
</style>