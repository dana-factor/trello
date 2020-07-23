<template>
	<div class="card-background-edit color-picker">
		<span
			v-for="(color,idx) in colors"
			:style="{backgroundColor: color}"
			@click="selectColor(color)"
			:key="idx"
		></span>
	</div>
</template>

<script>
export default {
	props: [],
	data() {
		return {
			colors: [
				"white",
				"#f5cbf5",
				"#c5ebf9",
				"#FFDAC1",
				"#E2F0CB",
				"#B5EAD7",
				"#C7CEEA",
				"#ffffba"
			]
		};
	},
	computed: {},
	methods: { 
        selectColor(color) {
        this.$emit('setBgc', color);
  }},
	created() {},
	mounted() {},
	watch: {},
	components: {}
};
</script>

<style scoped>
.card-background-edit span {
    width: 50px;
    height: 50px;
    border-radius: 50%;
}


</style>