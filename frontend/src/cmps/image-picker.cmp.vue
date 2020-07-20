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
                "http://res.cloudinary.com/ddh9unyrw/image/upload/v1595247424/mqzclgmqseuvpfyg98j1.jpg",
                'http://res.cloudinary.com/ddh9unyrw/image/upload/v1595257632/jwx3pgn88cupsgb3vm2h.jpg',
                'http://res.cloudinary.com/ddh9unyrw/image/upload/v1595257679/cdvgktjmmsoznwssjzso.jpg',
                'http://res.cloudinary.com/ddh9unyrw/image/upload/v1595257734/bbarpby4naz9ylnffwqn.jpg',
                'http://res.cloudinary.com/ddh9unyrw/image/upload/v1595257759/vexglerwamwj6hmilkjc.jpg',
                'http://res.cloudinary.com/ddh9unyrw/image/upload/v1595257780/qyse9g8vtia73btrliqh.jpg'
			]
		};
	},
	computed: {},
	methods: {
		selectImage(imgUrl) {
            console.log('imgurl', imgUrl)
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