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
					/>
				</div>
				<div class="right-side">
					<button @click.stop="toggleModal('card-label-edit')">Labels</button>
					<button @click.stop="toggleModal('card-checklist-edit')">Checklists</button>
					<input type="file" @change="onUploadImg" />
				</div>
			</div>
			<card-edit-modal v-if="editModal" :modalLocation="modalLocation" @modalClose="closeModal">
				<template v-slot:header>{{modalTitle}}</template>
				<component
					:is="editModal"
					:boardLabels="board.labels"
					:labels="labels"
					@modalClose="closeModal"
					@toggleLabel="toggleLabel"
					@newChecklist="addNewChecklist"
					@boardLabelsUpdate="updateBoardLabels"
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
			modalLocation: { top: 0, left: 0 }
		};
	},
	computed: {
		modalTitle() {
			let title = this.editModal.split('-')[1];
			return title.charAt(0).toUpperCase() + title.slice(1) + 's';
		},
		labels() {
			// if(!card) return null;
			const boardLabels = this.board.labels;
			let newLabels = [];
			// labels = labels.filter((label) => this.board.labels.findIndex(labelObj => labelObj.color === label));
			boardLabels.forEach(label => {
				if (this.card.labels.includes(label.color)) newLabels.push(label);
			});
			return newLabels;
		}
		// boardToShow() {
		// 	return this.board;
		// }
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
		updateCardName() {
			this.card.name = document.querySelector('#name').innerText;
			this.dispatchBoardSave();
		},
		// updateCard(card) {
		// 	boardService.saveCardToBoard(this.board, card);
		// 	this.dispatchBoardSave();
		// },
		updateBoardLabels(labelToUpdate) {
			boardService.updateBoardLabel(this.board, labelToUpdate);
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
		removeChecklist(checklistId) {
			boardService.removeChecklist(this.card, checklistId);
			this.dispatchBoardSave();
		},
		removeChecklistTask(tasks, taskId) {
			boardService.removeChecklistTask(tasks, taskId);
			this.dispatchBoardSave();
		},
		toggleLabel(label) {
			let currLabels = this.card.labels;
			if (currLabels.includes(label)) currLabels.splice(currLabels.indexOf(label), 1)
			else currLabels.push(label);
						console.log(this.card.labels)
			this.dispatchBoardSave();
		},
		// hasLabel(label) {
		// 	return this.getLabelIndex(label) !== -1;
		// },
		// getLabelIndex(label) {
		// 	return this.card.labels.findIndex((currLabel) => currLabel.color === label.color);
		// },
		removeAttachment(attachment) {
			//kinda temp idk
			this.card.attachments.splice(this.card.attachments.indexOf(attachment), 1);
			this.dispatchBoardSave();
		},
		dispatchBoardSave() {
			// const boardToUpdate = boardService.removeLabels(this.board);
			this.$store.dispatch({ type: 'saveBoard', board: this.boardToUpdate })
			// .then(savedBoard => this.setBoardAndCard(savedBoard))
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
		let boardId = this.$route.params.boardId;
		if (!boardId || !this.cardId) this.$router.push('/');
		this.boardToUpdate = JSON.parse(
			JSON.stringify(this.board));
		this.card = boardService.getCardById(this.boardToUpdate, this.cardId);
		// await this.$store.dispatch({ type: 'loadCurrBoard', id: boardId });
		// this.setBoardAndCard(this.$store.getters.board)
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