<template>
	<div>
		<div class="board-list">
			<ul>
				<li
					v-for="board in boards"
					:key="board._id"
				>
					<router-link :to="'/board/'+board._id">
					<!-- <img src="~@/assets/img/pinned-note.png"/> -->
						<board-preview
							:board="board"
						/>
					</router-link>
				</li>
				<li
					@click="addBoard"
					class="add-board"
				><i class="el-icon-plus"></i></li>
			</ul>
		</div>
	</div>
</template>

<script>
import boardPreview from "../cmps/board/board-preview.cmp.vue";
import { boardService } from "../services/board.service.js";

export default {
	name: "board-list",
	props: [],
	data() {
		return {
			boards: []
		};
	},
	computed: {},
	methods: {
		async addBoard(boardName) {
			var board = boardService.getStarterBoard();
			try {
				const res = await this.$store.dispatch({ type: "saveBoard", board });
				this.$router.push("/board/" + res._id);
			} catch (err) {
				console.log("ERROR, cannot add a board", err);
			}
		}
	},
	async created() {
		await this.$store.dispatch({ type: "loadBoards" });
		this.boards = this.$store.getters.boards;
	},
	mounted() {},
	watch: {},
	components: {
		boardPreview
	}
};
</script>

<style scoped>
</style>