<template>
	<section class="card-details-screen" @click="$router.push('../')">
		<div class="card-details" v-if="card" @click.stop="closeModal">
			<div class="header">
				<h1
					@keypress.enter.prevent="updateCardName; $event.target.blur()"
					@blur="updateCardName"
					contenteditable
				>{{card.name}}</h1>
				<router-link to="../">
					<i class="el-icon-close"></i>
				</router-link>
			</div>
			<div class="body">
				<div class="left-side">
					<div class="members-labels">
						<ul>
							<li
								v-for="label in labels"
								:key="label.color"
								:style="{backgroundColor:label.color}"
							>{{label.title}}</li>
						</ul>
					</div>
					<div class="description">
						<h2>
							<i class="el-icon-document"></i> Description
						</h2>
						<textarea v-model="card.description" placeholder="Add a more detailed description..."></textarea>
						<button @click="dispatchBoardSave">Save</button>
					</div>
					<card-attachments :attachments="card.attachments" @attachmentRemoved="removeAttachment" />
					<card-checklists
						:checklists="card.checklists"
						@dispatchBoardSave="dispatchBoardSave"
						@newChecklistTaskAdded="addNewChecklistTask"
						@checklistRemoved="removeChecklist"
						@checklistTaskRemoved="removeChecklistTask"
						@checklistsUpdated="updateChecklists"
					/>
				</div>
				<div class="right-side">
					<button @click.stop="toggleModal('card-label-edit')">Labels</button>
					<button @click.stop="toggleModal('card-checklist-edit')">Checklists</button>
					<input type="file" @change="onUploadImg" />
				</div>
			</div>
			<card-edit-modal v-if="editModal" @modalClose="closeModal">
				<template v-slot:header>{{modalTitle}}</template>
				<component
					:is="editModal"
					:boardLabels="board.labels"
					:labels="labels"
					@modalClose="closeModal"
					@toggleLabel="toggleLabel"
					@boardLabelsUpdate="updateBoardLabels"
					@newChecklist="addNewChecklist"
				></component>
			</card-edit-modal>
		</div>
	</section>
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
	props: ['board'],
	data() {
		return {
			boardToUpdate: null,
			card: null,
			cardId: 0,
			editModal: '',
		};
	},
	computed: {
		modalTitle() {
			let title = this.editModal.split('-')[1];
			return title.charAt(0).toUpperCase() + title.slice(1) + 's';
		},
		labels() {
			const boardLabels = this.board.labels;
			let labelsToShow = [];
			boardLabels.forEach(label => {
				if (this.card.labels.includes(label.color)) labelsToShow.push(label);
			});
			return labelsToShow;
		}
	},
	methods: {
		// setBoardAndCard(board) {
		// 	let board = null;
		// 	board = boardService.addLabels(JSON.parse(
		// 		JSON.stringify(this.boardToShow)));
		// 	if (!this.board) this.$router.push('/');
		// 	this.card = boardService.getCardById(this.board, this.cardId);
		// 	if (!this.card) this.$router.push('/');
		// },
		updateCardName(ev) {
			this.card.name = ev.target.innerText;
			this.dispatchBoardSave();
		},
		// updateCard(card) {
		// 	boardService.saveCardToBoard(this.board, card);
		// 	this.dispatchBoardSave();
		// },
		updateBoardLabels(labelToUpdate) {
			boardService.updateBoardLabel(this.boardToUpdate, labelToUpdate);
			this.dispatchBoardSave();
		},
		addNewChecklist(name) {
			let checklist = boardService.getStarterChecklist();
			checklist.name = name;
			this.card.checklists.push(checklist);
			this.dispatchBoardSave();
		},
		addNewChecklistTask(checklistId, text) {
			let task = boardService.getStarterChecklistTask();
			let checklist = this.card.checklists.find(checklistToFind => checklistId === checklistToFind.id)
			task.text = text;
			checklist.tasks.push(task);
			this.dispatchBoardSave();
		},
		removeChecklist(checklistId) {
			boardService.removeChecklist(this.card, checklistId);
			this.dispatchBoardSave();
		},
		removeChecklistTask(checklistId, taskId) {
			boardService.removeChecklistTask(this.card, checklistId, taskId);
			this.dispatchBoardSave();
		},
		updateChecklists(checklists) {
			this.card.checklists = checklists;
			this.dispatchBoardSave();
		},
		toggleLabel(label) {
			let currLabels = this.card.labels;
			if (currLabels.includes(label)) currLabels.splice(currLabels.indexOf(label), 1)
			else currLabels.push(label);
			this.dispatchBoardSave();
		},
		removeAttachment(attachment) {
			//kinda temp idk
			this.card.attachments.splice(this.card.attachments.indexOf(attachment), 1);
			this.dispatchBoardSave();
		},
		dispatchBoardSave() {
			this.$store.dispatch({ type: 'saveBoard', board: this.boardToUpdate })
		},
		toggleModal(cmpName) {
			if (this.editModal === cmpName) this.closeModal()
			else this.editModal = cmpName;
		},
		async onUploadImg(ev) {
			const res = await uploadImg(ev);
			this.card.attachments.push({ imgUrl: res.url });
			this.dispatchBoardSave();
		},
		closeModal() {
			this.editModal = '';
		}
	},
	async created() {
		//todo change push to something nicer
		this.cardId = this.$route.params.cardId;
		// let boardId = this.$route.params.boardId;
		if (!this.cardId) this.$router.push('/');
		this.boardToUpdate = JSON.parse(
			JSON.stringify(this.board));
		this.card = boardService.getCardById(this.boardToUpdate, this.cardId);
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