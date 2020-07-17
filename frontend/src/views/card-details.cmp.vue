<template>
	<section class="card-details">
		<div v-if="card">
			<div>
				<h1 id="name" contenteditable>{{card.name}}</h1>
				<button @click="updateCardName">Save</button>
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
				<h2>Description</h2>
				<textarea v-model="card.Description" placeholder="Add a description..."></textarea>
				<button @click="updateCard(card)">Save</button>
			</div>
			<div>
				<h2>Checklist</h2>
				<ul>
					<li v-for="task in card.checklists[0].tasks" :key="task.id">
						<input type="checkbox" v-model="task.isDone" @input="updateCard(card)" />
						{{task.text}}
					</li>
				</ul>
			</div>
			<div>
				<button @click="editModal='card-label-edit'">Labels</button>
			</div>
			<card-edit-modal v-if="editModal" @modalClose="closeModal">
				<component
					:is="editModal"
					:card="card"
					:boardLabels="board.labels"
					@cardUpdate="updateCard"
					@boardLabelsUpdate="updateBoardLabels"
				></component>
			</card-edit-modal>
		</div>
	</section>
	<!-- @focus="isDescInFocus=true"
	@blur="isDescInFocus=false"-->
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
			cardId: 0,
			isDescInFocus: false,
			isNameInFocus: false,
			editModal: ''
		};
	},
	computed: {},
	methods: {
		setBoardAndCard(board) {
			this.board = boardService.addLabels(JSON.parse(
				JSON.stringify(board)));
			if (!this.board) this.$router.push('/');
			this.card = boardService.getCardById(this.board, this.cardId);
			if (!this.card) this.$router.push('/');
		},
		updateCardName() {
			this.card.name = document.querySelector('#name').innerText;
			this.updateCard(this.card);
		},
		updateCard(card) {
			boardService.saveCardToBoard(this.board, card);
			this.dispatchBoardSave();
		},
		updateBoardLabels(boardLabels) {
			this.board.labels = boardLabels;
			this.dispatchBoardSave();
		},
		dispatchBoardSave() {
			this.$store.dispatch({ type: 'saveBoard', board: boardService.removeLabels(this.board) })
				.then(savedBoard => this.setBoardAndCard(savedBoard))
		},
		closeModal() {
			this.editModal = '';
		}
	},
	async created() {
		//todo change push to something nicer
		this.cardId = this.$route.params.cardId;
		let boardId = this.$route.params.boardId;
		if (!boardId || !this.cardId) this.$router.push('/');
		await this.$store.dispatch({ type: 'loadCurrBoard', id: boardId });
		this.setBoardAndCard(this.$store.getters.board)
	},
	components: { cardEditModal, cardLabelEdit }
};
</script>

<style>
</style>