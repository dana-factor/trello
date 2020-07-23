<template>
	<div class="board-edit">
		<div class="board-menu-header">
			<h3>Menu</h3>
			<button class="close" @click="toggleBoardMenu">
				<i class="el-icon-close"></i>
			</button>
		</div>
		<div class="board-menu-nav">
			<h5 @click="toggleDeleteModal"><i class="el-icon-delete"></i> Delete Board</h5>
			<h5 @click="toggleCmp('board-edit-background')"><i class="el-icon-brush"></i> Change Background</h5>
			<!-- <h5 @click="toggleCmp('date-picker')">Change Due Date</h5> -->
			<component
				v-if="cmpToShow"
				:is="cmpToShow"
				@setBgc="setBgc"
				@setBgImg="setBgImg"
			/>
		</div>
		<div>
			<!-- <board-edit-background v-if="isEditingBg" @toggleColorPicker="toggleColorPicker" @setBgc="setBgc" @setBgImg="setBgImg"/>
			<date-picker v-if="datePickerOpen"/>-->
		</div>
			<div class="board-activities">
				<h5><i class="el-icon-notebook-1"></i>
				 Activity</h5>
				<activites :activities="board.activities" />
			</div>
	</div>
</template>

<script>
import colorPicker from '../color-picker.cmp.vue';
import datePicker from '../date-picker.cmp.vue';
import boardEditBackground from '../board/board-edit-background.cmp.vue';
import activites from '../activities.cmp.vue';

export default {
	props: ['board'],
	data() {
		return {
			// isEditingBg: false,
			// isColorPickerOpen: false,
			// datePickerOpen: false,
			cmpToShow: ''
		}
	},
	computed: {

	},
	methods: {
		toggleBoardMenu() {
			this.$emit('toggleBoardMenu');
		},
		// toggleEditBg() {
		// 	this.isEditingBg = !this.isEditingBg;
		// },
		// toggleColorPicker() {
		// 	this.isColorPickerOpen = !this.isColorPickerOpen;
		// },
		// toggleDatePicker() {
		// 	this.datePickerOpen = !this.datePickerOpen;
		// },
		toggleDeleteModal() {
			this.$emit('toggleDeleteModal');
		},
		setBgc(color) {
			this.$emit('setBgc', color);
		},
		setBgImg(imgUrl) {
			this.$emit('setBgImg', imgUrl);
		},
        toggleCmp(cmpName) {
			if (cmpName === this.cmpToShow) this.cmpToShow = '';
			else this.cmpToShow = cmpName;
		}
	},
	created() {

	},
	mounted() {

	},
	watch: {

	},
	components: {
		colorPicker,
		datePicker,
		boardEditBackground,
		activites
	}

}
</script>

<style>
</style>