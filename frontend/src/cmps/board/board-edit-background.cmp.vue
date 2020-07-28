<template>
  <section class="board-edit-background">
    <div v-if="!isColorPickerOpen && !isImgPickerOpen" class="bgImages-container">
      <img class="img-collage" src="../../../src/assets/img/collage.jpg" @click="toggleImgPicker" />
      <h4>Photos</h4>
    </div>
    <div v-if="!isColorPickerOpen && !isImgPickerOpen" class="colors-container">
      <img class="img-colors" src="../../../src/assets/img/colors.jpg" @click="toggleColorPicker" />
      <h4>Colors</h4>
    </div>
    <color-picker v-if="isColorPickerOpen" @setBgc="setBgc" />
    <image-picker v-if="isImgPickerOpen" @setBgImg="setBgImg" />
  </section>
</template>

<script>
import colorPicker from '../color-picker.cmp.vue';
import imagePicker from '../image-picker.cmp.vue';

export default {
	name: 'board-edit-background',
	data() {
		return {
			isColorPickerOpen: false,
			isImgPickerOpen: false
		}
	},
	methods: {
		setBgc(color) {
			this.$emit('setBgc', color)
		},
		setBgImg(imgUrl) {
			this.$emit('setBgImg', imgUrl)
		},
		toggleColorPicker() {
			this.isColorPickerOpen = !this.isColorPickerOpen;
		},
		toggleImgPicker() {
			this.isImgPickerOpen = !this.isImgPickerOpen;
		}

	},
	components: {
		colorPicker,
		imagePicker
	}

}
</script>