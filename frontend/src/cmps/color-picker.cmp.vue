<template>
	<div class="color-picker">
		<span
			v-for="(color,idx) in colors"
			:class="{picked: color === selectedColor}"
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
            selectedColor: '',
			colors: [
				"white",
				"rgb(250, 252, 167)",
				"rgb(170, 209, 245)",
				"rgb(97, 214, 208)",
				"rgb(226, 183, 252)",
				"red",
				"blue",
				"purple",
				"burlywood",
				"rgb(219, 88, 110)",
				"gray",
				"orange"
			]
		};
	},
	computed: {},
	methods: {
        selectColor(color) {
            this.selectedColor = color;
        this.$emit('changeBgc', color);
  }
    },
	created() {},
	mounted() {},
	watch: {},
	components: {}
};
</script>



<style scoped>

</style>