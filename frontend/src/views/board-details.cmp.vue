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
            <li>
                <!-- <h2 @click="addTopic">+Add new list</h2> -->
                <h2 v-if="!topicNameInputOpen" @click="topicNameInputOpen = true">+Add new list</h2>
                <input class="topicName" v-if="topicNameInputOpen" v-model="topicName"/><button @click="addTopic" v-if="topicNameInputOpen">Add List</button>
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
            nameInputOpen: false,
            topicNameInputOpen: false,
            topicName: ''
        }
    },
    computed: {

    },
    methods: {
        toggleEditMenu(){
            this.editMenuOpen = !this.editMenuOpen
        },
        updateTopicName(topicName, topicId){
            let currTopic = this.board.topics.find(topic => topic.id === topicId)
            currTopic.name = topicName
            this.$store.dispatch({type: 'saveBoard', board: this.board})
            .then((savedBoard)=>{
                this.board = JSON.parse(JSON.stringify(savedBoard));
            })
        },
        addCard(topicId){
            const starterCard = boardService.getStarterCard()
            let currTopic = this.board.topics.find(topic => topic.id === topicId)
            currTopic.cards.push(starterCard)
            this.$store.dispatch({type: 'saveBoard', board: this.board})
            .then((savedBoard)=>{
                this.board = JSON.parse(JSON.stringify(savedBoard));
            })
        },
        removeTopic(topicId){
            const idx = this.board.topics.findIndex(topic => topic.id === topicId)
            this.board.topics.splice(idx, 1)
            this.$store.dispatch({type: 'saveBoard', board: this.board})
            .then((savedBoard)=>{
                this.board = JSON.parse(JSON.stringify(savedBoard));
            })
        },
        addTopic(){
            const starterTopic = boardService.getStarterTopic(this.topicName)
            this.topicNameInputOpen = false
            this.board.topics.push(starterTopic)
            this.$store.dispatch({type: 'saveBoard', board: this.board})
            .then((savedBoard)=>{
                this.board = JSON.parse(JSON.stringify(savedBoard));
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
				.then((savedBoard) => {
                    this.board = JSON.parse(JSON.stringify(savedBoard));
                    this.nameInputOpen = false;
                    this.editMenuOpen = false;
				});
		},
		loadBoard() {
			const boardId = this.$route.params.boardId;
			this.$store
				.dispatch({ type: "loadCurrBoard", id: boardId })
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