<template>
	<div class="color-picker">
		<span
			v-for="(color,idx) in colors"
			:class="{picked: color === selectedColor}"
			:style="{backgroundColor: color}"
			@click="setSelectedColor(color)"
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
        setSelectedColor(color) {
      //   this.favColor = this.$refs.colorSelect.value
            this.selectedColor = color;
        console.log(this.selectedColor);
      //   this.$emit('input', event.target.value)
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

.color-picker {
display: flex;
    flex-wrap: wrap;
    justify-content: center;
}

.color-picker span {
    width: 100px;
    height: 65px;
    display: inline-block;
    margin: 5px;
    border-radius: 3px;
    border: 0.5px solid gray;
}

    
/* 
  .picked::after {
    content: "✔";
  } */
</style>