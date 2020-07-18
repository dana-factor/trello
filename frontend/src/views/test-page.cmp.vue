<template>
	<div
		v-if="board"
		class="board-details"
	>
		<h1>board-details</h1>
		<h2>{{board.name}}</h2>
		<button @click="toggleEditMenu">...</button>
		<div v-if="editMenuOpen">
			<p @click="nameInputOpen = true">Change Name</p>
			<input
				v-if="nameInputOpen"
				v-model="board.name"
				@change="saveBoard"
			/>
			<p>Change Background</p>
		</div>
		<Container
			orientation="horizontal"
			@drop="onColumnDrop($event)"
			drag-handle-selector=".column-drag-handle"
			@drag-start="dragStart"
			:drop-placeholder="upperDropPlaceholderOptions"
			class="board-container"
		>
			<Draggable
				class="topic-wrapper"
				v-for="topic in board.topics"
				:key="topic.id"
			>
            <board-topic :topic="topic" :boardy="board"
					@updateTopicName="updateTopicName"
					@removeTopic="removeTopic"
					@addCard="addCard"
                    @saveBoardd="saveBoardd"/>
				<!-- <div class="board-topic card-container">
					<div class="topic-header">
						<span class="column-drag-handle">✥</span>
						<h2
							contenteditable="true"
							@input="updateTopicName"
						>{{topicName}}</h2>
						<button @click="toggleEditMenu">...</button>
						<div
							class="topic-menu"
							v-if="editMenuOpen"
						>
							<h3>List Actions</h3>
							<span
								@click="toggleEditMenu"
								class="closeMenu"
							>X</span>
							<p @click="removeTopic(topic.id); toggleEditMenu();">Delete list</p>
							<p @click="addCard(); toggleEditMenu();">Add new card</p>
							<p @click="toggleMinimize(); toggleEditMenu();"><span v-if="!minimize">Minimize</span><span v-if="minimize">Maximize</span></p>
						</div>
					</div>
					<Container
						class="topic-main"
						v-if="!minimize"
						group-name="col"
						@drop="(e) => onCardDrop(topic.id, e)"
						@drag-start="(e) => log('drag start', e)"
						@drag-end="(e) => log('drag end', e)"
						:get-child-payload="getCardPayload(topic.id)"
						drag-class="card-ghost"
						drop-class="card-ghost-drop"
						:drop-placeholder="dropPlaceholderOptions"
					>
						<Draggable v-for="card in topic.cards"
							:key="card.id"
							:card="card"
						>
							<div
								onclick
								class="card-preview card"
							>
								<p :to="'card/'+card.id" append>{{card.data}}</p>
							</div>
						</Draggable>
					</Container>
					<div
						class="topic-footer"
						v-if="!minimize"
					>
						<p @click="addCard">+ Add another card</p>
					</div>
				</div> -->
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
			/><button
				@click="addTopic"
				v-if="topicNameInputOpen"
			>Add List</button>
		</div>
		<router-view />
	</div>
	<!-- </div>
    </div> -->
</template>

<script>
import { boardService } from "../services/board.service.js";
import { utilService } from "../services/util.service.js";
import boardTopic from "../cmps/board/board-topic.cmp.vue";
import cardDetails from "../views/card-details.cmp.vue";
import cardPreview from "../cmps/card/card-preview.cmp.vue";
import { Container, Draggable } from "vue-smooth-dnd";

export default {
	props: [],
	data() {
		return {
			board: null,
			editMenuOpen: false,
			nameInputOpen: false,
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
        saveBoardd(board) {
            this.board = board;
            this.saveBoard();
        },
		loadBoard() {
			const boardId = "1JK5GVm";
			console.log(boardId);
			this.$store
				.dispatch({ type: "loadCurrBoard", id: boardId })
				.then(board => {
					this.board = JSON.parse(JSON.stringify(board));
					this.setScene();
					console.log(this.board);
				});
		},
		setScene() {
            this.board.type = 'container'
            this.board.props = {
					orientation: "horizontal"
                },
            this.board.topics.forEach(topic => {
                topic.type = "container",
						topic.props = {
							orientation: "vertical",
							className: "card-container"
                        },
                         topic.cards.forEach(card => {
                              card.type = "draggable";
                    card.data = card.name
                        })
            })
		},
		onColumnDrop(dropResult) {
			const board = Object.assign({}, this.board);
			board.topics = utilService.applyDrag(board.topics, dropResult);
            this.board = board;
            this.saveBoard();
		},
		onCardDrop(columnId, dropResult) {
			if (
				dropResult.removedIndex !== null ||
				dropResult.addedIndex !== null
			) {
				const board = Object.assign({}, this.board);
				const column = board.topics.filter(p => p.id === columnId)[0];
				const columnIndex = board.topics.indexOf(column);

				const newColumn = Object.assign({}, column);
				newColumn.cards = utilService.applyDrag(
					newColumn.cards,
					dropResult
				);
				board.topics.splice(columnIndex, 1, newColumn);
                console.log('scene', board)
                this.board = board;
                this.saveBoard();
            }
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
		this.loadBoard();
	},
	mounted() {},
	watch: {},
	components: {
		boardTopic,
		cardDetails,
		cardPreview,
		Draggable,
		Container
	}
};
</script>

<style scoped>
.card {
	height: 100px;
	width: 200px;
	border: 1px solid black;
	margin: 5px;
}

/* .card-container {
	background-color: beige;
	border: 1px solid black;
	margin: 10px;
} */

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