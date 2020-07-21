<template>
<div>
	<div class="board-list">
    <h1>Boards</h1>
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
	<!-- <div :class="{hidden: isNameInputHidden}" class="add-name-modal">
		<button @click="toggleInput">X</button>
		<label>Name of your Board</label>
		<input type="text" autofocus @change="addBoard"/>
	</div> -->
</div>
</template>

<script>
import boardPreview from "../cmps/board/board-preview.cmp.vue";
import { boardService } from '../services/board.service.js';


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
		addBoard(boardName) {
			var board = boardService.getStarterBoard();
			if(boardName) board.name = boardName;
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
		boardPreview
	}
};
</script>

<style scoped>
</style>