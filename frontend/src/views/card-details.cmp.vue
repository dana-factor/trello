<template>
	<section class="card-details">
		<h1>{{card.name}}</h1>
		<div>
			<h2>Description:</h2>
			<textarea
				v-model="card.Description"
				@focus="isDescInFocus=true"
				@blur="isDescInFocus=false"
				placeholder="Add a description..."
			></textarea>
			<button v-if="isDescInFocus" @click="updateCard">Save</button>
			<button @click="editModal='card-label-edit'">Labels</button>
			<card-edit-modal v-if="editModal" @modalClose="closeModal">
				<component :is="editModal"></component>
			</card-edit-modal>
		</div>
	</section>
</template>

<script>
import { boardService } from '../services/board.service.js';
export default {
	data() {
		return {
			board: null,
			card: null,
			isDescInFocus: false,
			editModal: ''
		};
	},
	computed: {},
	methods: {
		updateCard() {
			this.$store.dispatch({ type: 'saveBoard' }, { board: this.board });
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
		await this.$store.dispatch({ type: 'loadBoard' });
		this.board = this.$store.getters.board;
		if (!this.board) this.$router.push('/');
		this.card = JSON.parse(
			JSON.stringify(boardService.getCardById(this.board, cardId))
		);
		if (!this.card) this.$router.push('/');
	},
	components: {}
};
</script>

<style>
</style>