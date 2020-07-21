<template>
	<section class="date-picker">
		<div class="block">
			<span class="demonstration">Due Date</span>
			<el-date-picker
				v-model="value"
				type="datetime"
				placeholder="Select date and time"
			>
			</el-date-picker>
		</div>
	
		<!-- <input type="date"/> -->

	</section>
</template>

<script>
export default {
	props: [],
	data() {
		return {
			value: "",

		};
	},
	computed: {},
	methods: {},
	created() {},
	mounted() {},
	watch: {},
	components: {}
};
</script>

<style>
</style>