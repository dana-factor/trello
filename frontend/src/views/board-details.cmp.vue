<template>
	<section
		v-if="board"
		class="board-details"
		@click="isFilterModalOpen=false; isFilterInputShown=false;"
	>
	<div class="screen" v-if="topicsMenuOpen" @click="topicsMenuOpen = false"></div>
		<board-nav @filterSet="setFilter" :filteredTopics="filteredTopics" :isFilterModalOpen="isFilterModalOpen" @openFilterModal="isFilterModalOpen=true" :isFilterInputShown="isFilterInputShown" @showFilterInput="isFilterInputShown=true" @toggleUserList="toggleUserList" :users="users" :members="board.members">
			<h2
				class="board-name"
				slot="board-name"
				contenteditable
				@keypress.enter.prevent="updateBoardName"
				@blur="updateBoardName"
			>{{board.name}}</h2>
			<button class="menu-btn" @click="toggleBoardMenu">
				<i class="el-icon-s-operation"></i>
			</button>
		</board-nav>
		  <div class="member-modal" v-if="isUserListOpen">
			<h4>Invite to Board </h4>
			<i class="el-icon-close" @click="isUserListOpen = false"></i>
			<app-filter @filterSet="searchMember"/>
            <user-list :users="filteredUsers" @addMember="addMember"/>
        </div>
		<div v-if="isDeleteModalOpen" class="delete-modal">
			<h5>Are you sure you want to delete this board?</h5>
			<div class="btns">
				<button @click="toggleDeleteModal" class="cancel-btn">
					<i class="el-icon-close"></i> Cancel
				</button>
				<button @click="removeBoard(board._id)" class="delete-btn">
					<i class="el-icon-delete"></i> Delete
				</button>
			</div>
		</div>
		<board-edit
			:class="{'board-menu-open':isBoardMenuOpen}"
			@toggleBoardMenu="toggleBoardMenu"
			@removeBoard="removeBoard"
			@toggleDeleteModal="toggleDeleteModal"
			@setBgc="setBgc"
			@setBgImg="setBgImg"
			:board="board"
		/>
		<Container
			orientation="horizontal"
			@drop="onColumnDrop($event)"
			drag-class="grab"
			:drop-placeholder="upperDropPlaceholderOptions"
		>
			<Draggable v-for="topic in board.topics" :key="topic.id">
				<board-topic
					class="topic-wrapper"
					:topic="topic"
					:board="board"
					:topicsMenuOpen="topicsMenuOpen"
					@topicsMenuClose="topicsMenuOpen = false"
					@topicsMenuOpen="topicsMenuOpen = true"
					@updateTopicName="updateTopicName"
					@removeTopic="removeTopic"
					@addCard="addCard"
					@removeCard="removeCard"
					@updateDND="saveAfterDnd"
				/>
			</Draggable>
			<div class="topic-wrapper add-topic">
				<h2 v-if="!topicNameInputOpen" @click="topicNameInputOpen = true">+Add another list</h2>
				<input
					placeholder="Enter list title..."
					class="topicName"
					v-if="topicNameInputOpen"
					v-model="topicName"
					v-focus
				/>
				<div class="btns-container">
					<button class="add" @click="addTopic" v-if="topicNameInputOpen">Add List</button>
					<button
						class="close"
						@click="topicNameInputOpen = false; topicName='';"
						v-if="topicNameInputOpen"
					>
						<i class="el-icon-close"></i>
					</button>
				</div>
			</div>
		</Container>
		<router-view :board="board" />
	</section>
</template>

<script>
import { boardService } from "../services/board.service";
import { userService } from '../services/user.service.js';
import { dragDropService } from "../services/drag-drop.service.js";
import { Container, Draggable } from "vue-smooth-dnd";
import boardTopic from "../cmps/board/board-topic.cmp.vue";
import boardNav from "../cmps/board/board-nav.cmp.vue";
import cardDetails from "../views/card-details.cmp.vue";
import boardEdit from "../cmps/board/board-edit.cmp.vue";
import userList from '../cmps/user-list.cmp';
import appFilter from '../cmps/app-filter.cmp';

export default {
	props: [],
	data() {
		return {
			board: null,
			isBoardMenuOpen: false,
			isDeleteModalOpen: false,
			topicNameInputOpen: false,
			topicName: "",
			minimize: false,
			upperDropPlaceholderOptions: {
				className: "drop-preview",
				animationDuration: 150
			},
			topicsMenuOpen: false,
			filteredTopics: [],
			isFilterModalOpen: false,
			isFilterInputShown: false,
			isUserListOpen: false,
			filteredUsers: []
		};
	},
	computed: {
		boardGetter() {
			return this.$store.getters.board;
		},
		users() {
			return this.$store.getters.users;
		}
	},
	methods: {
		toggleBoardMenu() {
			this.isBoardMenuOpen = !this.isBoardMenuOpen;
		},
		toggleDeleteModal() {
			this.isDeleteModalOpen = !this.isDeleteModalOpen;
		},
		toggleUserList() {
			this.isUserListOpen = !this.isUserListOpen;
			console.log(this.isUserListOpen)
        },
		updateBoardName(ev) {
			if (ev.target.innerText) this.board.name = ev.target.innerText;
			this.saveBoard('has updated board name')
		},
		async addMember(userId) {
			if (this.board.members.find(member => member._id === userId)) return;
			const user = await userService.getById(userId);
			this.board.members.push(user);
			this.saveBoard('has added a member');
		},
		searchMember(filterBy) {
			const exp = new RegExp(`.*${filterBy.searchStr}.*`, 'i');
			const filteredUsers = this.users.filter(user => {
				return user.fullName.match(exp) || user.username.match(exp);
				
			})
			this.filteredUsers = filteredUsers;
		},
		setFilter(filterBy){
			if (!filterBy.searchStr) {
				this.filteredUsers = this.users;
				return;
			}
			const exp = new RegExp(`.*${filterBy.searchStr}.*`, 'i');
			const topicsToFilter = JSON.parse(JSON.stringify(this.board.topics))
			const filteredTopics = topicsToFilter.filter((topic) => {
				topic.cards = topic.cards.filter((card) => card.name.match(exp) || card.description.match(exp));
				return topic.cards.length;
			});
			this.filteredTopics = filteredTopics
			// const filteredcards = filteredTopics.forEach(topic =>topic.cards)
			// const filteredcards = filteredTopics.forEach(topic =>{
			// 	return {
			// 		topicName: topic.name,
			// 		cards: topic.cards
			// 	}
			// })
			// filteredcards.forEach(card=>{
			// 	card.topicName = filteredTopics.find((topic)=>{topic.cards})
			// })
		},
		setFilter1(filterBy){
			const exp = new RegExp(filterBy.searchStr, 'i');
			console.log(filterBy.searchStr);
			
			const filteredTopics = this.board.topics.filter((topic) => {
				return topic.cards.filter((card) => {
					console.log('222', card.name.match(exp));
					return
					card.name.toLowerCase().includes(filterBy.searchStr.toLowerCase())
					})
			});
			console.log('filteredTopics:', filteredTopics);
			// const filteredCards = filteredTopics.map(topic=>{
			// 	return {
			// 		topicName: topic.name,
			// 		cardDetails: topic.cards.map((card)=>{

			// 		})
			// 		cardId: card.id,
			// 		cardName: card.name,
			// 		cardDescription: card.description,
			// 	}
			// })
			// console.log('filteredCards2:', filteredCards);
			
			// this.$store.commit({type: "setFilter", filterBy});
      		// this.$store.dispatch({type: "loadToys"})
		},
		setBgc(color) {
			this.board.style.backgroundColor = color;
			this.board.style.imgUrl = '';
			this.saveBoard('has changed the background color');
			this.$emit('setBgc', color);
		},
		setBgImg(imgUrl) {
			this.board.style.imgUrl = imgUrl;
			this.board.style.backgroundColor = '';
			this.saveBoard('has changed the background image');
			this.$emit('setBgImg', imgUrl);
		},
		removeBoard(boardId) {
			this.$store.dispatch({ type: 'removeBoard', id: boardId });
			this.isDeleteModalOpen = false;
			this.$router.push('/board')
		},
		updateTopicName(topicName, topicId) {
			const currTopic = this.board.topics.find(
				topic => topic.id === topicId
			);
			currTopic.name = topicName;
			this.saveBoard('has updated a topic');
		},
		addCard(topicId, cardName) {
			const starterCard = boardService.getStarterCard(cardName);
			let currTopic = this.board.topics.find(
				topic => topic.id === topicId
			);
			currTopic.cards.push(starterCard);
			this.saveBoard('has added a card');
		},
		async removeCard(cardId, topicId) {
			const topicIdx = this.board.topics.findIndex(
				topic => topic.id === topicId
			);
			const cardIdx = this.board.topics[topicIdx].cards.findIndex(card => card.id === cardId)
			this.board.topics[topicIdx].cards.splice(cardIdx, 1)
			const savedBoard = await this.$store.dispatch({ type: "saveBoard", board: this.board })
					this.board = JSON.parse(JSON.stringify(savedBoard));
		},
		removeTopic(topicId) {
			const idx = this.board.topics.findIndex(
				topic => topic.id === topicId
			);
			this.board.topics.splice(idx, 1);
			this.saveBoard('has removed a topic');
		},
		addTopic() {
			const starterTopic = boardService.getStarterTopic(this.topicName);
			this.topicNameInputOpen = false;
			this.board.topics.push(starterTopic);
			this.saveBoard('has added a topic');
		},
		saveBoard(action) {
			if (!this.board) return;
			this.$store.dispatch({ type: 'saveBoard', board: this.board, activity: { text: action } });
		},
		loadBoard() {
			const boardId = this.$route.params.boardId;
			return this.$store.dispatch({ type: "loadCurrBoard", id: boardId })
		},
		setScene() {
			const boardCopy = JSON.parse(JSON.stringify(this.board));
			boardCopy.type = "container";
			(boardCopy.props = {
				orientation: "horizontal"
			}),
				boardCopy.topics.forEach(topic => {
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
			var lengthBefore = this.board.topics[columnIndex].cards.length;
			this.board.topics.splice(columnIndex, 1, newColumn);
			var lengthAfter = this.board.topics[columnIndex].cards.length;
			// console.log('be4', lengthBefore, 'aft', lengthAfter)
			if (lengthBefore > lengthAfter) return;
			// console.log('go save')
			this.saveBoard();
		},
		getCardPayload(columnId) {
			return index => {
				return this.board.topics.find(p => p.id === columnId).cards[index];
			};
		},
	},
	async created() {
		await this.loadBoard();
		await this.$store.dispatch({ type: "loadUsers" })
		console.log(this.board)
		this.filteredUsers = this.users;
		console.log(this.filteredUsers)
	},
	mounted() { },
	destroyed() {
		this.$emit('setBgc', '');
		this.$emit('setBgImg', '');
	},
	watch: {
		boardGetter(value) {
			// console.log('activity:', value.activities[0]);
			this.board = JSON.parse(JSON.stringify(value));
			this.setScene();
			if (this.board.style.backgroundColor) this.$emit('setBgc', this.board.style.backgroundColor)
			else this.$emit('setBgImg', this.board.style.imgUrl);
		}
	},
	components: {
		boardTopic,
		boardNav,
		cardDetails,
		Draggable,
		Container,
		boardEdit,
		userList,
		appFilter
	}
};
</script>

<style scoped>
</style>
