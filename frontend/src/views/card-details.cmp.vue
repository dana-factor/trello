<template>
	<section class="card-details-screen" @click="$router.push('../')">
		<div class="card-details" v-if="card" @click.stop="closeModal">
			<div class="header">
				<h1
					@keypress.enter.prevent="updateCardName"
					@blur="updateCardName"
					id="name"
					contenteditable
				>{{card.name}}</h1>
				<router-link to="../">X</router-link>
			</div>
			<div class="body">
				<div class="left-side">
					<div class="members-labels">
						<!-- members -->
						<ul>
							<li
								v-for="label in card.labels"
								:key="label.color"
								:style="{backgroundColor:label.color}"
							>{{label.title}}</li>
						</ul>
					</div>
					<div class="description">
						<h2>📄 Description</h2>
						<textarea v-model="card.description" placeholder="Add a description..."></textarea>
						<button @click="updateCard(card)">Save</button>
					</div>
					<card-attachments :attachments="card.attachments" @attachmentRemoved="removeAttachment" />
					<card-checklists :checklists="card.checklists" @dispatchBoardSave="dispatchBoardSave" @newChecklistTaskAdded="addNewChecklistTask"/>
				</div>
				<div class="edit-btns">
					<button @click.stop="toggleModal('card-label-edit')">Labels</button>
					<button @click.stop="toggleModal('card-checklist-edit')">Checklists</button>
					<input type="file" @change="onUploadImg" />
				</div>
			</div>
			<card-edit-modal v-if="editModal" :modalLocation="modalLocation" @modalClose="closeModal">
				<template v-slot:header>{{modalTitle}}</template>
				<component
					:is="editModal"
					:card="card"
					:boardLabels="board.labels"
					@modalClose="closeModal"
					@cardUpdate="updateCard"
					@newChecklist="addNewChecklist"
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
import { uploadImg } from '../services/img-upload.service.js';
import cardEditModal from '../cmps/card/card-edit-modal.cmp';
import cardLabelEdit from '../cmps/card/card-label-edit.cmp';
import cardChecklistEdit from '../cmps/card/card-checklist-edit.cmp';
import cardAttachments from '../cmps/card/card-attachments.cmp';
import cardChecklists from '../cmps/card/card-checklists.cmp';
export default {
	data() {
		return {
			board: null,
			card: null,
			cardId: 0,
			// isDescInFocus: false,
			// isNameInFocus: false,
			editModal: '',
			modalLocation: { top: 0, left: 0 }
		};
	},
	computed: {
		modalTitle() {
			let title = this.editModal.split('-')[1];
			return title.charAt(0).toUpperCase() + title.slice(1) + 's';
		}
	},
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
		addNewChecklist(name) {
			let checklist = boardService.getStarterChecklist();
			checklist.name = name;
			this.card.checklists.push(checklist);
			this.dispatchBoardSave();
		},
		addNewChecklistTask(checklist, text) {
			let task = boardService.getStarterChecklistTask();
			task.text = text;
			checklist.tasks.push(task);
			this.dispatchBoardSave();
		},
		removeAttachment(attachment) {
			//kinda temp idk
			this.card.attachments.splice(this.card.attachments.indexOf(attachment), 1);
			this.dispatchBoardSave();
		},
		dispatchBoardSave() {
			const boardToUpdate = boardService.removeLabels(this.board);
			this.$store.dispatch({ type: 'saveBoard', board: boardToUpdate })
				.then(savedBoard => this.setBoardAndCard(savedBoard))
		},
		toggleModal(cmpName) {
			if (this.editModal === cmpName) this.closeModal()
			else this.editModal = cmpName;
		},
		async onUploadImg(ev) {
			const res = await uploadImg(ev);
			this.card.attachments.push({ imgUrl: res.url });
			this.updateCard(this.card);
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
	components: {
		cardEditModal,
		cardLabelEdit,
		cardChecklistEdit,
		cardAttachments,
		cardChecklists
	}
};
</script>

<style lang="scss">
</style>