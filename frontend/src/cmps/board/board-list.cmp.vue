<template>
	<ul class="board-list">
		<li
			v-for="board in boards"
			:key="board._id"
		>
			<button @click="removeBoard(board._id)">X</button>
            <router-link :to="'/board/'+board._id">
			<board-preview @updateBoard="updateBoard" :board="board" />
            </router-link>  
		</li>
		<li @click="addBoard"> Add Board </li>
	</ul>
</template>

<script>
import boardPreview from "./board-preview.cmp.vue";


export default {
	name: "board-list",
	props: ["boards"],
	data() {
		return {};
	},
	computed: {},
	methods: {
		addBoard() {
            this.$emit('addBoard')
		},
		removeBoard(boardId) {
			this.$emit("removeBoard", boardId);
        },
       updateBoard(board) {
            this.$emit('updateBoard', board);
        },
	},
	created() {},
	mounted() {},
	watch: {},
	components: {
		boardPreview
	}
};
</script>

<style scoped>

</style>