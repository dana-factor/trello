<template>
	<section class="card-details">
		<div v-if="card">
			<div>
				<h1 @focus="isNameInFocus=true" @blur="isNameInFocus=false" contenteditable>{{card.name}}</h1>
				<button v-if="isNameInFocus" @click="updateCard(card)">Save</button>
			</div>
			<div>
				<!-- members -->
				<ul>
					<li
						v-for="label in card.labels"
						:key="label.color"
						:style="{backgroundColor:label.color}"
					>{{label.title}}</li>
				</ul>
			</div>
			<div>
				<h2>Description:</h2>
				<textarea
					v-model="card.Description"
					@focus="isDescInFocus=true"
					@blur="isDescInFocus=false"
					placeholder="Add a description..."
				></textarea>
				<button v-if="isDescInFocus" @click="updateCard(card)">Save</button>
			</div>
			<div>
				<button @click="editModal='card-label-edit'">Labels</button>
			</div>
			<card-edit-modal v-if="editModal" @modalClose="closeModal">
				<component :is="editModal" :card="card" :boardLabels="board.labels" @cardUpdate="updateCard"></component>
			</card-edit-modal>
		</div>
	</section>
</template>

<script>
import { boardService } from '../services/board.service.js';
import cardEditModal from '../cmps/card/card-edit-modal.cmp';
import cardLabelEdit from '../cmps/card/card-label-edit.cmp';
export default {
	data() {
		return {
			board: null,
			card: null,
			isDescInFocus: false,
			isNameInFocus: false,
			editModal: ''
		};
	},
	computed: {},
	methods: {
		updateCard(card) {
			this.$store.dispatch({ type: 'saveBoard' }, { board: boardService.removeLabels(this.board) });
		},
		closeModal() {
			this.editModal = '';
		}
	},
	async created() {
		//todo change push to something nicer
		let cardId = this.$route.params.cardId;
		let boardId = this.$route.params.boardId;
		if (!boardId || !cardId) this.$router.push('/');
		await this.$store.dispatch({ type: 'loadBoards' }, { id: boardId });
		// await this.$store.dispatch({ type: 'loadBoard' }, { id: boardId });
		// this.board = this.$store.getters.board;
		this.board = boardService.addLabels(JSON.parse(
			JSON.stringify(this.$store.getters.boards[0])));
		if (!this.board) this.$router.push('/');
		this.card = boardService.getCardById(this.board, cardId);
		if (!this.card) this.$router.push('/');
	},
	components: { cardEditModal, cardLabelEdit }
};
</script>

<style>
</style>