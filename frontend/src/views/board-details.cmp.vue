<template>
	<section
		v-if="board"
		class="board-details"
	>
		<board-nav>
			<h2 slot="board-name" contenteditable @keypress.enter.prevent="updateBoardName" @blur="updateBoardName">{{board.name}}</h2>
			<button @click="toggleEditMenu">...</button>
			<div v-if="editMenuOpen">
				<p>Change Background</p>
			</div>
		</board-nav>
		<Container
			orientation="horizontal"
			@drop="onColumnDrop($event)"
			drag-handle-selector=".column-drag-handle"
			@drag-start="dragStart"
			:drop-placeholder="upperDropPlaceholderOptions"
		>
			<Draggable
				class="topic-wrapper"
				v-for="topic in board.topics"
				:key="topic.id"
			>
				<board-topic
					:topic="topic"
					:boardy="board"
					@updateTopicName="updateTopicName"
					@removeTopic="removeTopic"
					@addCard="addCard"
					@updateDND="saveAfterDnd"
				/>
			</Draggable>
		</Container>
		<div class="topic-wrapper add-topic">
			<h2
				v-if="!topicNameInputOpen"
				@click="topicNameInputOpen = true"
			>+Add another list</h2>
			<input
				class="topicName"
				v-if="topicNameInputOpen"
				v-model="topicName"
			/>
			<button
				@click="addTopic"
				v-if="topicNameInputOpen"
			>Add List</button>
		</div>
		<router-view />
	</section>
</template>

<script>
import { boardService } from "../services/board.service";
import { dragDropService } from "../services/drag-drop.service.js";
import { Container, Draggable } from "vue-smooth-dnd";
import boardTopic from "../cmps/board/board-topic.cmp.vue";
import boardNav from "../cmps/board/board-nav.cmp.vue";
import cardDetails from "../views/card-details.cmp.vue";

export default {
	props: [],
	data() {
		return {
			board: null,
			boardName: '',
			editMenuOpen: false,
			topicNameInputOpen: false,
			topicName: "",
			minimize: false,
			upperDropPlaceholderOptions: {
				className: "cards-drop-preview",
				animationDuration: "150",
				showOnTop: true
			},
			dropPlaceholderOptions: {
				className: "drop-preview",
				animationDuration: "150",
				showOnTop: true
			}
		};
	},
	computed: {},
	methods: {
		toggleEditMenu() {
			this.editMenuOpen = !this.editMenuOpen;
		},
		updateBoardName(ev){
			if (ev.target.innerText) this.boardName = ev.target.innerText;
			this.board.name = this.boardName;
			this.saveBoard();

		},
		updateTopicName(topicName, topicId) {
			let currTopic = this.board.topics.find(
				topic => topic.id === topicId
			);
			currTopic.name = topicName;
			this.$store
				.dispatch({ type: "saveBoard", board: this.board })
				.then(savedBoard => {
					this.board = JSON.parse(JSON.stringify(savedBoard));
				});
		},
		addCard(topicId) {
			const starterCard = boardService.getStarterCard();
			let currTopic = this.board.topics.find(
				topic => topic.id === topicId
			);
			currTopic.cards.push(starterCard);
			this.$store
				.dispatch({ type: "saveBoard", board: this.board })
				.then(savedBoard => {
					this.board = JSON.parse(JSON.stringify(savedBoard));
				});
		},
		removeTopic(topicId) {
			const idx = this.board.topics.findIndex(
				topic => topic.id === topicId
			);
			this.board.topics.splice(idx, 1);
			this.$store
				.dispatch({ type: "saveBoard", board: this.board })
				.then(savedBoard => {
					this.board = JSON.parse(JSON.stringify(savedBoard));
				});
		},
		addTopic() {
			const starterTopic = boardService.getStarterTopic(this.topicName);
			this.topicNameInputOpen = false;
			this.board.topics.push(starterTopic);
			this.$store
				.dispatch({ type: "saveBoard", board: this.board })
				.then(savedBoard => {
					this.board = JSON.parse(JSON.stringify(savedBoard));
				});
		},
		saveBoard() {
			if (!this.board.name) return;
			this.$store
				.dispatch({ type: "saveBoard", board: this.board })
				.then(savedBoard => {
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
					this.setScene();
				});
		},
		setScene() {
			this.board.type = "container";
			(this.board.props = {
				orientation: "horizontal"
			}),
				this.board.topics.forEach(topic => {
					(topic.type = "container"),
						(topic.props = {
							orientation: "vertical",
							className: "card-container"
						}),
						topic.cards.forEach(card => {
							card.type = "draggable";
							card.data = card.name;
						});
				});
		},
		onColumnDrop(dropResult) {
			const board = Object.assign({}, this.board);
			board.topics = dragDropService.applyDrag(board.topics, dropResult);
			this.board = board;
			this.saveBoard();
		},
		saveAfterDnd(dropResult, columnIndex, column) {
			const newColumn = Object.assign({}, column);
			newColumn.cards = dragDropService.applyDrag(
					newColumn.cards,
					dropResult
                );
				this.board.topics.splice(columnIndex, 1, newColumn);
				this.saveBoard();
		},
		getCardPayload(columnId) {
			return index => {
				return this.board.topics.filter(p => p.id === columnId)[0]
					.cards[index];
			};
		},
		dragStart() {
			console.log("drag started");
		},
		log(...params) {
			console.log(...params);
		}
	},
	created() {
		this.loadBoard()
	},
	mounted() {},
	watch: {
		$route(to) {
			if (!to.params.cardId) this.loadBoard();
		}
	},
	components: {
		boardTopic,
		boardNav,
		cardDetails,
		Draggable,
		Container
	}
};
</script>

<style scoped>

.column-drag-handle {
	cursor: move;
	padding: 5px;
}

.card-ghost {
	transition: transform 0.18s ease;
	transform: rotateZ(5deg);
}

.card-ghost-drop {
	transition: transform 0.18s ease-in-out;
	transform: rotateZ(0deg);
}
.drop-preview {
	background-color: rgba(150, 150, 200, 0.1);
	border: 1px dashed #abc;
	margin: 5px;
}

.cards-drop-preview {
	background-color: rgba(150, 150, 200, 0.1);
	border: 1px dashed #abc;
	margin: 5px 45px 5px 5px;
}
</style>