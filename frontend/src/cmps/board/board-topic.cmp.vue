<template>
  <section class="board-topic" :class="{private:!!topic.owner}">
    <span class="column-drag-handle">
      <div class="topic-header">
        <h2
          contenteditable
          @keypress.enter.prevent="updateTopicName"
          @blur="updateTopicName"
          @mousemove.stop
        >{{topicName}}</h2>
        <button @click="toggleTopicMenu" class="close">
          <i class="el-icon-more"></i>
        </button>
        <div class="topic-menu" v-if="topicMenuOpen">
          <h3>List Actions</h3>
          <button @click.stop="toggleTopicMenu" class="close-menu">
            <i class="el-icon-close"></i>
          </button>
          <button @click="removeTopic(topic.id); toggleTopicMenu();">Delete List</button>
          <button @click="addCard(); toggleTopicMenu();">Add Card</button>
          <button @click="$emit('setTopicOwner', topic); toggleTopicMenu();">
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
          <button v-if="topic.owner" @click="toggleMinimize(); toggleTopicMenu();">
            <span v-if="!minimize">Minimize</span>
            <span v-else>Maximize</span>
          </button>
        </div>
      </div>
    </span>
    <Container
      class="topic-main"
      v-if="!minimize"
      group-name="col"
      @drop="(e) => onCardDrop(topic.id, e)"
      :get-child-payload="getCardPayload(topic.id)"
      drag-class="card-ghost"
      drop-class="card-ghost-drop"
      :drop-placeholder="dropPlaceholderOptions"
      @contextmenu.prevent
	  :drag-begin-delay=dndDelay
    >
      <Draggable v-for="card in topic.cards" :key="card.id">
        <card-preview :card="card" :boardLabels="board.labels" @removeCard="removeCard"></card-preview>
      </Draggable>
    </Container>
    <div class="topic-footer" v-if="!minimize">
      <p v-if="!editCardNameShown" @click="editCardNameShown = true">+ Add another card</p>
      <textarea
        v-else
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
			type: Object,
			required: true
		},
		board: {
			type: Object,
			required: true
		},
		anyTopicMenuOpen: {
			type: Boolean,
			required: true
		},
		loggedinUser: {
			type: Object
		},
		dndDelay: {
			type: Number,
			required: true
		}
	},
	data() {
		return {
			topicName: '',
			cardName: '',
			minimize: false,
			editListNameShown: false,
			editCardNameShown: false,
			topicMenuOpen: false,
			dropPlaceholderOptions: {
				className: 'drop-preview',
				animationDuration: 150
			}
		};
	},
	methods: {
		removeTopic(topicId) {
			this.$emit("removeTopic", topicId);
		},
		toggleTopicMenu() {
			this.topicMenuOpen = !this.topicMenuOpen;
			this.$emit('toggleTopicMenu');
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
	watch: {
		'anyTopicMenuOpen': function(value) {
			if (!value) this.topicMenuOpen = false;
		}
	},
	components: {
		cardPreview,
		Draggable,
		Container
	}
};
</script>