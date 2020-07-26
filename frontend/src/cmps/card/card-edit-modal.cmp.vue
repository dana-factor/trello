<template>
	<section class="card-edit-modal" @click.stop @mousedown.stop>
		<header>
			<slot name="header"></slot>
			<button @click="close"><i class="el-icon-close"></i></button>
		</header>
		<slot></slot>
	</section>
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
<style>
</style>