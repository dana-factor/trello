<template>
	<section class="board-topic">
		<div class="topic-header">
			<span class="column-drag-handle">✥</span>
			<h2 contenteditable @keypress.enter.prevent="updateTopicName" @blur="updateTopicName">
				{{topicName}}
			</h2>
			<!-- <input v-else type="text" v-model="topicName" @keyup.enter="updateTopicName(topic.id)"/> -->
			<button @click="toggleEditMenu"><i class="el-icon-more"></i></button>
			<div class="topic-menu" v-if="editMenuOpen">
				<h3>List Actions</h3>
				<button @click="toggleEditMenu" class="close-menu" ><i class="el-icon-close"></i></button>
				<button @click="removeTopic(topic.id); toggleEditMenu();">Delete list</button>
				<button @click="addCard(); toggleEditMenu();">Add new card</button>
				<button @click="toggleEditListNameShown">Change list name</button>
				<input v-if="editListNameShown" v-model="topicName" @keypress.enter.prevent="updateTopicName" @blur="updateTopicName"/>
				<button @click="toggleMinimize(); toggleEditMenu();"><span v-if="!minimize">Minimize</span><span v-if="minimize">Maximize</span></button>
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
			<Draggable
				v-for="card in topic.cards"
				:key="card.id"
			>
				<card-preview :card="card"></card-preview>
			</Draggable>
		</Container>
		<div
			class="topic-footer"
			v-if="!minimize"
		>
			<p @click="addCard">+ Add another card</p>
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
		boardy: {
			type: Object,
			required: true
		}
	},
	data() {
		return {
			editMenuOpen: false,
			topicName: "",
			minimize: false,
			editListNameShown: false,
			// board: null,
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
		removeTopic(topicId) {
			this.$emit("removeTopic", topicId);
		},
		toggleEditMenu() {
			this.editMenuOpen = !this.editMenuOpen;
		},
		updateTopicName(ev) {
			if (ev.target.innerText) this.topicName = ev.target.innerText;
			this.$emit("updateTopicName", this.topicName, this.topic.id);
			this.editListNameShown = false;
			this.editMenuOpen = false;
		},
		addCard() {
			this.$emit("addCard", this.topic.id);
		},
		toggleMinimize() {
			this.minimize = !this.minimize;
		},
		toggleEditListNameShown() {
			this.editListNameShown = !this.editListNameShown;
        },
        onCardDrop(columnId, dropResult) {
			if (
				dropResult.removedIndex !== null ||
				dropResult.addedIndex !== null
			) {
				const boardy = Object.assign({}, this.boardy);
                const column = boardy.topics.filter(p => p.id === columnId)[0];
                console.log('columnId', columnId)
                const columnIndex = boardy.topics.indexOf(column);
                console.log('column idx', columnIndex)

				// const newColumn = Object.assign({}, column);
				// newColumn.cards = utilService.applyDrag(
				// 	newColumn.cards,
				// 	dropResult
                // );
                
				// boardy.topics.splice(columnIndex, 1, newColumn);
				console.log("scene", boardy);
				// this.boardy = boardy;
                // this.$emit('saveBoardAfterDnd', boardy)
                this.$emit('updateDND', dropResult, columnIndex, column)
			}
		},
		getCardPayload(columnId) {
			return index => {
				return this.boardy.topics.filter(p => p.id === columnId)[0]
					.cards[index];
			};
		},
		dragStart() {
			console.log("drag started");
		},
		log(...params) {
			console.log(...params);
        },
	},
	created() {
		this.topicName = this.topic.name;
        console.log(this.topicName);
        // this.board = JSON.parse(JSON.stringify(this.boardy));
	},
	mounted() {},
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