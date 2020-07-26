<template>
	<div class="image-picker">
		<img
			v-for="(imgUrl,idx) in imgUrls"
			:src="imgUrl"
			:key="idx"
			@click="selectImage"
		/>
	</div>
</template>

<script>
export default {
	props: [],
	data() {
		return {
			selectedImgUrl: "",
			imgUrls: [
				'http://res.cloudinary.com/ddh9unyrw/image/upload/v1595699314/xpxjihvdbqboowhzqwer.jpg',
                'http://res.cloudinary.com/ddh9unyrw/image/upload/v1595247424/mqzclgmqseuvpfyg98j1.jpg',
                'http://res.cloudinary.com/ddh9unyrw/image/upload/v1595257632/jwx3pgn88cupsgb3vm2h.jpg',
                'http://res.cloudinary.com/ddh9unyrw/image/upload/v1595692812/c2nvonx0vniezgg7sv0s.jpg',
                'http://res.cloudinary.com/ddh9unyrw/image/upload/v1595692877/ankqowegp6237hijoiey.jpg',
                'http://res.cloudinary.com/ddh9unyrw/image/upload/v1595257759/vexglerwamwj6hmilkjc.jpg',
				'http://res.cloudinary.com/ddh9unyrw/image/upload/v1595257780/qyse9g8vtia73btrliqh.jpg',
				'http://res.cloudinary.com/ddh9unyrw/image/upload/v1595317869/in3rirgiuy9056gxunam.jpg',
				'http://res.cloudinary.com/ddh9unyrw/image/upload/v1595692898/xk0u73cqvsaiehceablw.jpg',
				'http://res.cloudinary.com/ddh9unyrw/image/upload/v1595755893/a7ercyro550r3jz5c7ir.jpg',
				'http://res.cloudinary.com/ddh9unyrw/image/upload/v1595693125/q1ipc1rmoytpg8x8pgvo.jpg',
				'http://res.cloudinary.com/ddh9unyrw/image/upload/v1595317933/akw7galczskf0pt1ya1p.jpg',
				'http://res.cloudinary.com/ddh9unyrw/image/upload/v1595692927/reagthnikpshsdcrtcfw.jpg',
				'http://res.cloudinary.com/ddh9unyrw/image/upload/v1595692960/rrhvawsjtr9x8ccbse2m.jpg',
				'http://res.cloudinary.com/ddh9unyrw/image/upload/v1595692983/aty5zrzh3oihgfasdjxj.jpg',
				'http://res.cloudinary.com/ddh9unyrw/image/upload/v1595693031/zjtea7n1iky4wjtcovzf.jpg'
			]
		};
	},
	computed: {},
	methods: {
		selectImage(imgUrl) {
			this.selectedImgUrl = imgUrl.target.src;
			this.$emit("setBgImg", this.selectedImgUrl);
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