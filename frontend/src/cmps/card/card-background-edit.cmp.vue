<template>
	<div class="card-background-edit color-picker">
		<span
			v-for="(color,idx) in colors"
			:style="{backgroundColor: color}"
			@click="selectColor(color)"
			:key="idx"
			:class="{selected: color === selectedColor}"
		></span>
	</div>
</template>

<script>
export default {
	props: ['card'],
	data() {
		return {
			colors: [
				'white',
				'#f5cbf5',
				'#c5ebf9',
				'#FFDAC1',
				'#E2F0CB',
				'#B5EAD7',
				'#C7CEEA',
				'#ffffba'
			]
		};
	},
	computed: {
		selectedColor() {
			return this.card.backgroundColor;
		}
	},
	methods: {
		selectColor(color) {
			this.$emit('setBgc', color);
		}
	},
};
</script>

<style scoped>
.card-background-edit span {
	width: 50px;
	height: 50px;
	border-radius: 50%;
}

.selected::after {
	content: '✔';
	position: relative;
	top: 35%;
	left: 30%;
}
</style>