<template>
<div>
	<div class="board-list">
	<ul >
		<li
			v-for="board in boards"
			:key="board._id"
		>
            <router-link :to="'/board/'+board._id">
			<board-preview @updateBoard="updateBoard" :board="board" />
            </router-link>  
		</li>
		<li @click="addBoard" class="add-board"><i class="el-icon-plus"></i></li>
	</ul>
	</div>
</div>
</template>

<script>
import boardPreview from "./board-preview.cmp.vue";


export default {
	name: "board-list",
	props: ["boards"],
	data() {
		return {
		};
	},
	methods: {
		addBoard(ev) {
			this.$emit('addBoard');
		},
       updateBoard(board) {
            this.$emit('updateBoard', board);
        },
	},
	components: {
		boardPreview
	}
};
</script>

<style scoped>
</style>