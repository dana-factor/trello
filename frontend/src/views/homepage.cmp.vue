<template>
	<section class="homepage">
		<h1>homepage</h1>
		<board-list
            @updateBoard="updateBoard"
			@addBoard="addBoard"
			@removeBoard="removeBoard"
			:boards="boards"
		/>
	</section>
</template>

<script>
import boardList from "../cmps/board/board-list.cmp.vue";
import { boardService } from '../services/board.service.js';

export default {
	props: [],
	data() {
		return {
			boards: []
		};
	},
	computed: {},
	methods: {
		removeBoard(boardId) {
			this.$store.dispatch({ type: "removeBoard", id: boardId });
		},
		addBoard() {
			var board = boardService.getStarterBoard();
			this.$store.dispatch({ type: "saveBoard", board })
                .then((res) => {
					this.$router.push('/board/' + res._id)
				})
				.catch(err => {
					console.log("ERROR, cannot add a board", err);
				});
        },
        updateBoard(board) {
            this.$store.commit({type: 'saveBoard', board})
        }
	},
	created() {
        this.$store.dispatch({type: 'loadBoards'})
        .then(() => {
             this.boards = this.$store.getters.boards
             })

    },
	mounted() {},
	watch: {},
	components: {
		boardList
	}
};
</script>

<style>
</style>