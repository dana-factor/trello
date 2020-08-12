<template>
  <section
    v-if="board"
    class="board-details"
    @click="isFilterModalOpen=false; isFilterInputShown=false; isUserListOpen=false;"
	@touchstart="dndDelay = 100"
	@mousedown="dndDelay = 0"
  >
    <div class="screen" v-if="anyTopicMenuOpen" @click="anyTopicMenuOpen = false"></div>
    <div class="dashboard-modal" v-if="isDashboardOpen">
      <dashboard :board="board" @closeDashboard="isDashboardOpen = false" />
    </div>
    <board-nav
      @filterSet="setFilter"
      :filteredTopics="filteredTopics"
      :isFilterModalOpen="isFilterModalOpen"
      @openFilterModal="isFilterModalOpen=true"
      :isFilterInputShown="isFilterInputShown"
      @showFilterInput="isFilterInputShown=true"
      @toggleUserList="toggleUserList"
      :users="users"
      :members="board.members"
    >
      <h2
        class="board-name"
        slot="board-name"
        contenteditable
        @keypress.enter.prevent="updateBoardName"
        @blur="updateBoardName"
      >{{board.name}}</h2>
      <button class="dashboard-btn" @click="isDashboardOpen = !isDashboardOpen">
        <i class="el-icon-s-data"></i>
      </button>
      <button class="menu-btn" @click="toggleBoardMenu">
        <i class="el-icon-s-operation"></i>
      </button>
    </board-nav>
    <div class="member-modal" v-if="isUserListOpen" @click.stop>
      <h4>Invite to Board</h4>
      <i class="el-icon-close" @click="isUserListOpen = false"></i>
      <app-filter @filterSet="searchMember" />
      <user-list :users="filteredUsers" :memberOf="board" @toggleMember="toggleMember" />
    </div>
    <div v-if="isDeleteModalOpen" class="delete-modal">
      <h5
        v-if="board._id !== '5f1aefd0f30ae5001757bd46'"
      >Are you sure you want to delete this board?</h5>
      <h5 v-else>This is the public board, it cannot be deleted!</h5>
      <div class="btns">
        <button @click="toggleDeleteModal" class="cancel-btn">Cancel</button>
        <button
          :disabled="board._id === '5f1aefd0f30ae5001757bd46'"
          @click="removeBoard(board._id)"
          class="delete-btn"
        >
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
      drag-class="card-ghost"
      drop-class="card-ghost-drop"
      :drop-placeholder="upperDropPlaceholderOptions"
      :drag-begin-delay=dndDelay
    >
      <Draggable v-for="topic in board.topics" :key="topic.id">
        <board-topic
          v-if="isShowTopic(topic)"
          class="topic-wrapper"
          :key="topic.owner"
          :topic="topic"
          :board="board"
          :anyTopicMenuOpen="anyTopicMenuOpen"
          :loggedinUser="loggedinUser"
		  :dndDelay="dndDelay"
		  @toggleTopicMenu="anyTopicMenuOpen = !anyTopicMenuOpen"
          @updateTopicName="updateTopicName"
          @removeTopic="removeTopic"
          @addCard="addCard"
          @removeCard="removeCard"
          @updateDND="saveAfterDnd"
          @setTopicOwner="setTopicOwner"
          @toggleHidden="toggleHidden"
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
    <router-view :board="boardGetter" />
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
import dashboard from '../cmps/board/dashboard.cmp';

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
			anyTopicMenuOpen: false,
			filteredTopics: [],
			isFilterModalOpen: false,
			isFilterInputShown: false,
			isUserListOpen: false,
			filteredUsers: [],
			isDashboardOpen: false,
			topicNameBefore: '',
			topicNameAfter: '',
			dndDelay: 0
		};
	},
	computed: {
		boardGetter() {
			return this.$store.getters.board;
		},
		users() {
			return this.$store.getters.users;
		},
		loggedinUser() {
			return this.$store.getters.loggedinUser;
		},
	},
	methods: {
		toggleHidden(topic) {
			topic.isHidden = !topic.isHidden;
			this.saveBoard();
		},
		isShowTopic(topic) {
			return !topic.owner || (this.loggedinUser && topic.owner === this.loggedinUser._id) ||
				topic.owner === localStorage.getItem('id')
		},
		toggleBoardMenu() {
			this.isBoardMenuOpen = !this.isBoardMenuOpen;
		},
		toggleDeleteModal() {
			this.isDeleteModalOpen = !this.isDeleteModalOpen;
		},
		toggleUserList() {
			this.isUserListOpen = !this.isUserListOpen;
		},
		updateBoardName(ev) {
			if (this.board.name === ev.target.innerText) return;
			if (!ev.target.innerText) {
				ev.target.innerText = this.board.name;
				return;
			}
			this.board.name = ev.target.innerText;
			ev.target.blur();
			this.saveBoard('updated board name to ' + this.board.name)
		},
		async toggleMember(userId) {
			const idx = this.board.members.findIndex(member => member._id === userId);
			if (idx !== -1) {
				const name = this.board.members[idx].fullName; // keep the name for the action-txt before the splice
				this.board.members.splice(idx, 1);
				this.saveBoard('removed ' + name + ' as a member')
			} else {
				// add member
				const user = await userService.getById(userId);
				this.board.members.unshift(user);
				this.saveBoard('added ' + user.fullName + ' as a member');
			}
		},
		searchMember(filterBy) {
			const exp = new RegExp(`.*${filterBy.searchStr}.*`, 'i');
			this.filteredUsers = this.users.filter(user => {
				return user.fullName.match(exp) || user.username.match(exp);
			})
		},
		setFilter(filterBy) {
			if (!filterBy.searchStr) {
				this.filteredUsers = this.users;
				return;
			}
			const exp = new RegExp(`.*${filterBy.searchStr}.*`, 'i');
			this.filteredTopics = this.board.topics.filter((topic) => {
				topic.cards = topic.cards.filter((card) => card.name.match(exp) || card.description.match(exp));
				return topic.cards.length;
			});
		},
		setBgc(color) {
			this.board.style.backgroundColor = color;
			this.board.style.imgUrl = '';
			this.saveBoard('changed the background color');
			this.$emit('setBgc', color);
		},
		setBgImg(imgUrl) {
			this.board.style.imgUrl = imgUrl;
			this.board.style.backgroundColor = '';
			this.saveBoard('changed the background image');
			this.$emit('setBgImg', imgUrl);
		},
		removeBoard(boardId) {
			this.$store.dispatch({ type: 'removeBoard', id: boardId });
			this.isDeleteModalOpen = false;
			this.$router.push('/board')
		},
		updateTopicName(topicName, topicId) {
			const topic = this.board.topics.find(
				topic => topic.id === topicId
			);
			topic.name = topicName;
			this.saveBoard('updated a topic');
		},
		addCard(topicId, cardName) {
			const starterCard = boardService.getStarterCard(cardName);
			let topic = this.board.topics.find(
				topic => topic.id === topicId
			);
			topic.cards.push(starterCard);
			this.saveBoard('added a card');
		},
		removeCard(cardId, topicId) {
			const topic = this.board.topics.find(
				topic => topic.id === topicId
			);
			const cardIdx = topic.cards.findIndex(card => card.id === cardId)
			const activity = 'removed card ' + topic.cards[cardIdx].name + ' from ' + topic.name;
			topic.cards.splice(cardIdx, 1);
			this.saveBoard(activity);
		},
		removeTopic(topicId) {
			const idx = this.board.topics.findIndex(
				topic => topic.id === topicId
			);
			this.board.topics.splice(idx, 1);
			this.saveBoard('removed a topic');
		},
		addTopic() {
			const starterTopic = boardService.getStarterTopic(this.topicName);
			this.topicNameInputOpen = false;
			this.board.topics.push(starterTopic);
			this.saveBoard('added a topic');
		},
		saveBoard(action) {
			if (!this.board) return;
			this.$store.dispatch({ type: 'saveBoard', board: this.board, activity: { text: action } });
		},
		setTopicOwner(topic) {
			if (topic.owner) {
				topic.owner = null;
				topic.isHidden = false;
			}
			else if (this.loggedinUser) topic.owner = this.loggedinUser._id;
			else topic.owner = localStorage.getItem('id');
			this.saveBoard();
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
			if (dropResult.removedIndex !== null) this.topicNameBefore = this.board.topics[columnIndex].name;
			if (dropResult.addedIndex !== null) this.topicNameAfter = this.board.topics[columnIndex].name;
			if (this.topicNameAfter && this.topicNameBefore) var activityTxt = 'moved ' + dropResult.payload.name + ' from ' + this.topicNameBefore + ' to ' + this.topicNameAfter;
			const newColumn = Object.assign({}, column);
			newColumn.cards = dragDropService.applyDrag(
				newColumn.cards,
				dropResult
			);
			this.board.topics.splice(columnIndex, 1, newColumn);
			if (activityTxt) {
				if (this.topicNameBefore === this.topicNameAfter) activityTxt = '';
				this.saveBoard(activityTxt);
				this.topicNameBefore = '';
				this.topicNameAfter = '';
			}
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
		this.filteredUsers = this.users;
	},
	mounted() { },
	destroyed() {
		this.$emit('setBgc', '#fceddd');
		this.$emit('setBgImg', '');
	},
	watch: {
		boardGetter(value) {
			this.board = JSON.parse(JSON.stringify(value));
			this.setScene();
			if (this.board.style.backgroundColor) this.$emit('setBgc', this.board.style.backgroundColor)
			else this.$emit('setBgImg', this.board.style.imgUrl);
		},
		'$route.params.boardId': function () {
			this.loadBoard();
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
		appFilter,
		dashboard
	}
};
</script>