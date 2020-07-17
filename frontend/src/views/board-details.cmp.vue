<template>
	<section v-if="board" class="board-details">
		<h1>board-details</h1>
		<h2>{{board.name}}</h2>
		<button @click="toggleEditMenu">...</button>
		<div v-if="editMenuOpen">
			<p @click="nameInputOpen = true">Change Name</p>
			<input v-if="nameInputOpen" v-model="board.name" @change="saveBoard" />
			<p>Change Background</p>
		</div>
		<ul v-if="board">
			<li v-for="topic in board.topics" :key="topic.id">
				<board-topic
					:topic="topic"
					@updateTopicName="updateTopicName"
					@removeTopic="removeTopic"
					@addCard="addCard"
				/>
			</li>
		</ul>
	</section>
</template>

<script>
import { boardService } from "../services/board.service.js";
import boardTopic from "../cmps/board/board-topic.cmp.vue";

export default {
    props:[],
    data(){
        return{
            board: null,
            editMenuOpen: false,
            nameInputOpen: false
        }
    },
    computed: {

    },
    methods: {
        toggleEditMenu(){
            this.editMenuOpen = !this.editMenuOpen
        },
        updateTopicName(topicName, topicId){
            this.$store.commit({type: 'updateTopicName', topicName: topicName, topicId: topicId})
        },
        removeTopic(topicId){
            this.$store.commit({type: 'removeTopic', topicId: topicId})
        },
        addCard(topicId){
            const starterCard = boardService.getStarterCard()
            let currTopic = this.board.topics.find(topic => topic.id === topicId)
            currTopic.cards.push(starterCard)
            this.$store.dispatch({type: 'saveBoard', board: this.board})
            .then(()=>{
                this.loadBoard()
            })
            
        },
        // 	updateName(ev) {
		// 	console.log(ev.target.value);
		// 	var boardClone = JSON.parse(JSON.stringify(this.board));
		// 	boardClone.name = ev.target.value;
		// 	this.$store.commit({ type: "updateBoardName", boardName });
			
		// },
		saveBoard() {
			if (!this.board.name) return;
			this.$store
				.dispatch({ type: "saveBoard", board: this.board })
				.then(() => {
                    this.loadBoard();
                    this.nameInputOpen = false;
                    this.editMenuOpen = false;
				});
		},
		loadBoard() {
			const boardId = this.$route.params.boardId;
			this.$store
				.dispatch({ type: "getCurrBoard", id: boardId })
				.then(board => {
					this.board = JSON.parse(JSON.stringify(board));
				});
		}
    },
    created(){
         this.loadBoard();
    },
    mounted() {},
	watch: {},
	components: {
		boardTopic
	},
};
</script>

<style>
</style>