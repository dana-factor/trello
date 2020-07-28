<template>
  <section class="board-topic" :class="{private:!!topic.owner}">
    <span class="column-drag-handle">
      <div class="topic-header">
        <h2
          contenteditable
          @keypress.enter.prevent="updateTopicName"
          @blur="updateTopicName"
          @mousemove.stop
          @click="closeTopicMenu"
        >{{topicName}}</h2>
        <!-- <input v-else type="text" v-model="topicName" @keyup.enter="updateTopicName(topic.id)"/> -->
        <button @click="toggleTopicMenu" class="close">
          <i class="el-icon-more"></i>
        </button>
        <div class="topic-menu" v-if="topicMenu">
          <h3>List Actions</h3>
          <button @click.stop="toggleTopicMenu" class="close-menu">
            <i class="el-icon-close"></i>
          </button>
          <button @click="removeTopic(topic.id); toggleTopicMenu();">Delete List</button>
          <button @click="addCard(); toggleTopicMenu();">Add Card</button>
          <button @click="$emit('setTopicOwner',topic); toggleTopicMenu();">
            <span v-if="topic.owner">Set as public</span>
            <span v-else>Set as private</span>
          </button>
          <button @click="toggleEditListNameShown">Edit List Name</button>
          <input
            v-if="editListNameShown"
            v-model="topicName"
            v-focus
            @keypress.enter.prevent="updateTopicName"
            @blur="updateTopicName"
          />
          <button @click="toggleMinimize(); toggleTopicMenu();">
            <span v-if="!minimize">Minimize</span>
            <span v-if="minimize">Maximize</span>
          </button>
        </div>
      </div>
    </span>
    <Container
      :style="{minHeight: 10 + 'px'}"
      class="topic-main"
      v-if="!minimize"
      group-name="col"
      @drop="(e) => onCardDrop(topic.id, e)"
      :get-child-payload="getCardPayload(topic.id)"
      drag-class="card-ghost"
      drop-class="card-ghost-drop"
      :drag-begin-delay="0"
      :drop-placeholder="dropPlaceholderOptions"
    >
      <Draggable v-for="card in topic.cards" :key="card.id">
        <card-preview :card="card" :boardLabels="board.labels" @removeCard="removeCard"></card-preview>
      </Draggable>
    </Container>
    <div class="topic-footer" v-if="!minimize">
      <p v-if="!editCardNameShown" @click="editCardNameShown = true">+ Add another card</p>
      <textarea
        v-if="editCardNameShown"
        v-model="cardName"
        v-focus
        @keypress.enter.prevent="addCard"
        placeholder="Enter a title for this card..."
      ></textarea>
      <div class="btns">
        <button v-if="editCardNameShown" @click="addCard" class="add">Add Card</button>
        <button
          v-if="editCardNameShown"
          @click="editCardNameShown = false; cardName=''"
          class="close"
        >
          <i class="el-icon-close"></i>
        </button>
      </div>
    </div>
  </section>
</template>

<script>
import { utilService } from "../../services/util.service.js";
import { Container, Draggable } from "vue-smooth-dnd";
import cardPreview from "../../cmps/card/card-preview.cmp.vue";
export default {
	props: {
		topic: {
			required: true,
			type: Object
		},
		board: {
			type: Object,
			required: true
		},
		topicsMenuOpen: {
			type: Boolean,
			required: true
		},
		loggedinUser: {
			type: Object,
		}
	},
	data() {
		return {
			topicMenuOpen: false,
			topicName: "",
			cardName: "",
			minimize: false,
			editListNameShown: false,
			editCardNameShown: false,
			dropPlaceholderOptions: {
				className: "drop-preview",
				animationDuration: 150
			}
		};
	},
	computed: {
		topicMenu() {
			if (this.topicsMenuOpen === false) return this.topicMenuOpen = false
			else { return this.topicMenuOpen }
		}
	},
	methods: {
		removeTopic(topicId) {
			this.$emit("removeTopic", topicId);
		},
		toggleTopicMenu() {
			if (!this.topicMenuOpen) this.$emit("topicsMenuOpen");
			else if (this.topicMenuOpen) this.$emit("topicsMenuClose");
			this.topicMenuOpen = !this.topicMenuOpen;
		},
		closeTopicMenu() {
			this.$emit("topicsMenuClose");
			this.topicMenuOpen = false;
		},
		updateTopicName(ev) {
			if (ev.target.innerText) this.topicName = ev.target.innerText;
			this.$emit("updateTopicName", this.topicName, this.topic.id);
			this.editListNameShown = false;
		},
		addCard() {
			let cardName = (this.cardName) ? this.cardName : 'New Card'
			this.$emit("addCard", this.topic.id, cardName);
			this.editCardNameShown = false
			this.cardName = ''
		},
		removeCard(cardId) {
			this.$emit("removeCard", cardId, this.topic.id);
		},
		toggleMinimize() {
			this.minimize = !this.minimize;
			this.$emit('toggleHidden', this.topic);
		},
		toggleEditListNameShown() {
			this.editListNameShown = !this.editListNameShown;
		},
		onCardDrop(columnId, dropResult) {
			if (
				dropResult.removedIndex !== null ||
				dropResult.addedIndex !== null
			) {
				const board = Object.assign({}, this.board);
				const column = board.topics.filter(p => p.id === columnId)[0];
				const columnIndex = board.topics.indexOf(column);
				this.$emit('updateDND', dropResult, columnIndex, column)
			}
		},
		getCardPayload(columnId) {
			return index => {
				return this.board.topics.filter(p => p.id === columnId)[0]
					.cards[index];
			};
		},
	},
	created() {
		this.topicName = this.topic.name;
		this.minimize = this.topic.isHidden;
	},
	mounted() { },
	watch: {},
	components: {
		cardPreview,
		Draggable,
		Container
	}
};
</script>

<style lang="scss" scoped>
</style>