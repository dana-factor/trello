<template>
  <div class="color-picker">
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
	data() {
		return {
			colors: [
				"rgb(170, 209, 245)",
				"rgb(97, 214, 208)",
				"rgb(226, 183, 252)",
				"blue",
				"purple",
				"burlywood",
				"rgb(219, 88, 110)",
				"orange"
			]
		};
	},
	methods: {
		selectColor(color) {
			this.$emit('setBgc', color);
		}
	},
};
</script>