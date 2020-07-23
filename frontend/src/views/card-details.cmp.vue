<template>
	<section class="card-details-screen" @mousedown.self="$router.push('../')">
		<div class="card-details" v-if="card" @mousedown="closeModal" :style="{backgroundColor: card.backgroundColor}">
			<div class="header">
				<i class="el-icon-postcard"></i>
				<h1
					@keypress.enter.prevent="updateCardName; $event.target.blur()"
					@blur="updateCardName"
					contenteditable
				> {{card.name}}</h1>
				<router-link to="../">
					<i class="el-icon-close"></i>
				</router-link>
			</div>
			<div class="body">
				<div class="left-side">
					<div class="members-labels-due">
						<div v-if="card.members.length">
						<h3 >Members</h3>
						<ul>
							<li
								v-for="member in card.members"
								:key="member._id"
								:title="member.fullName"
								class="card-members"
							><avatar :src="member.imgUrl" :username="member.fullName" :size="25" /></li>
						</ul>
						</div>
						<h3 v-if="labels.length">Labels</h3>
						<ul>
							<li
								v-for="label in labels"
								:key="label.color"
								:style="{backgroundColor:label.color}"
							>{{label.title}}</li>
						</ul>
						<div v-if="card.dueDate" class="due-date-container">
							<h3>Due Date</h3>
							<div class="due-date-info">
								<input type="checkbox" v-model="card.isCardDone" @change="dispatchBoardSave('has marked as done')"/>
								<p> {{ dueDateToShow}} </p><span class="card-status completed" v-if="card.isCardDone">complete</span><span  class="card-status overdue" v-if="isOverdue">overdue</span>
							<i class="el-icon-delete" @click="removeDueDate"></i>
							</div>
						</div>
					</div>
					<div class="description">
						<i class="el-icon-document"></i>
						<h2>Description</h2>
						<textarea v-model="card.description" @input="isDescriptionSaveShown = true" placeholder="Add a more detailed description..."></textarea>
						<button v-if="isDescriptionSaveShown" @click="dispatchBoardSave('has updated the description'); isDescriptionSaveShown=false" class="save">Save</button>
						<button v-if="isDescriptionSaveShown" @click="card.description = ''; isDescriptionSaveShown=false"><i class="el-icon-close"></i></button>
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
					<div class="activities-container">
						<i class="el-icon-notebook-1"></i>
						<h2>Activities</h2>
						<activities :activities="activities"/>
					</div>
				</div>
				<div class="right-side">
					<h2>Add To Card</h2>
					<button @click="toggleModal('card-label-edit')">
						<i class="el-icon-collection-tag"></i> Labels
					</button>
					<button @click="toggleModal('card-checklist-edit')">
						<i class="el-icon-document-checked"></i> Checklists
					</button>
					<button @click="toggleModal('card-due-edit')">
						<i class="el-icon-time"></i> Due Date
					</button>
					<button @click="toggleModal('card-member-edit')">
						<i class="el-icon-user"></i> Members
					</button>
					<button>
						<input type="file" @change="onUploadImg" />
						<i class="el-icon-user"></i> Add Image
					</button>
					<button @click="toggleModal('card-background-edit')">
						<i class="el-icon-brush"></i> Background Color
					</button>
				</div>
			</div>
			<card-edit-modal v-if="editModal" @modalClose="closeModal">
				<template v-slot:header>{{modalTitle}}</template>
				<component
					:is="editModal"
					:boardLabels="board.labels"
					:labels="labels"
					:members="board.members"
					:card="card"
					@modalClose="closeModal"
					@toggleLabel="toggleLabel"
					@boardLabelsUpdate="updateBoardLabels"
					@newChecklist="addNewChecklist"
					@saveDueDate="saveDueDate"
					@toggleMember="toggleMember"
					@setBgc="setBgc"
				></component>
			</card-edit-modal>
		</div>
	</section>
</template>

<script>
import { boardService } from '../services/board.service.js';
import { userService } from '../services/user.service.js';
import { utilService } from '../services/util.service.js';
import { uploadImg } from '../services/img-upload.service.js';
import cardEditModal from '../cmps/card/card-edit-modal.cmp';
import cardLabelEdit from '../cmps/card/card-label-edit.cmp';
import cardChecklistEdit from '../cmps/card/card-checklist-edit.cmp';
import cardAttachments from '../cmps/card/card-attachments.cmp';
import cardChecklists from '../cmps/card/card-checklists.cmp';
import cardDueEdit from '../cmps/card/card-due-edit.cmp';
import cardMemberEdit from '../cmps/card/card-member-edit.cmp';
import cardBackgroundEdit from '../cmps/card/card-background-edit.cmp';
import activities from '../cmps/activities.cmp';
import Avatar from 'vue-avatar';
import moment from 'moment';

export default {
	props: ['board'],
	data() {
		return {
			boardToUpdate: null,
			card: null,
			cardId: 0,
			editModal: '',
			isDescriptionSaveShown: false		
		};
	},
	computed: {
		modalTitle() {
			if (this.editModal === 'card-due-edit') return 'Due Date';
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
		},
		dueDateToShow() {
			return utilService.formatTime(this.card.dueDate);
		},
		isOverdue() {
			if (this.card.isCardDone) return;
			return this.card.dueDate < Date.now();
		},
		activities(){
			return this.board.activities.filter(activity => activity.cardId === this.card.id)
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
			this.dispatchBoardSave('has updated a card name');
		},
		// updateCard(card) {
		// 	boardService.saveCardToBoard(this.board, card);
		// 	this.dispatchBoardSave();
		// },
		updateBoardLabels(labelToUpdate) {
			boardService.updateBoardLabel(this.boardToUpdate, labelToUpdate);
			this.dispatchBoardSave('has updated a label\'s color');
		},
		addNewChecklist(name) {
			let checklist = boardService.getStarterChecklist();
			checklist.name = name;
			this.card.checklists.push(checklist);
			this.dispatchBoardSave('has added a new checklist');
		},
		addNewChecklistTask(checklistId, text) {
			let task = boardService.getStarterChecklistTask();
			let checklist = this.card.checklists.find(checklistToFind => checklistId === checklistToFind.id)
			task.text = text;
			checklist.tasks.push(task);
			this.dispatchBoardSave('has added a new checklist task');
		},
		removeChecklist(checklistId) {
			boardService.removeChecklist(this.card, checklistId);
			this.dispatchBoardSave('has removed a checklist');
		},
		removeChecklistTask(checklistId, taskId) {
			boardService.removeChecklistTask(this.card, checklistId, taskId);
			this.dispatchBoardSave('has removed a checklist task');
		},
		updateChecklists(checklists) {
			this.card.checklists = checklists;
			this.dispatchBoardSave('has updated a checklist');
		},
		toggleLabel(label) {
			let currLabels = this.card.labels;
			if (currLabels.includes(label)) currLabels.splice(currLabels.indexOf(label), 1)
			else currLabels.push(label);
			this.dispatchBoardSave('has toggled a label');
		},
		removeAttachment(attachment) {
			//kinda temp idk
			this.card.attachments.splice(this.card.attachments.indexOf(attachment), 1);
			this.dispatchBoardSave('has removed an attachment');
		},
		saveDueDate(date) {
			this.card.dueDate = date;
			this.card.isCardDone = false;
			this.closeModal();
			this.dispatchBoardSave('has updated the due date to ' + moment(date).format('DD.MM.YY h:mm'));
		},
		removeDueDate() {
			this.card.dueDate = null;
			this.card.isCardDone = false;
			this.dispatchBoardSave('has deleted the due date');
		},
		setBgc(color) {
			this.card.backgroundColor = color;
			this.closeModal();
			this.dispatchBoardSave('has changed the background color');
		},
		async toggleMember(userId) {
			// remove member
			if (this.card.members.find(member => member._id === userId)) {
				const idx = this.card.members.findIndex(member => member._id === userId);
				const name = this.card.members[idx].fullName; // keep the name for the action-txt before the splice
				this.card.members.splice(idx, 1);
				this.dispatchBoardSave('has removed ' + name + ' as a member');
			} else {
			// add member
			const user = await userService.getById(userId);
			this.card.members.push(user);
			this.dispatchBoardSave('has added ' + user.fullName + ' as a member');
			}
		},
		dispatchBoardSave(action) {
			this.$store.dispatch({ type: 'saveBoard', board: this.boardToUpdate, activity: { text: action + ' in card ' + this.card.name, cardId: this.card.id } });
		},
		toggleModal(cmpName) {
			if (this.editModal === cmpName) this.closeModal()
			else this.editModal = cmpName;
		},
		async onUploadImg(ev) {
			const res = await uploadImg(ev);
			this.card.attachments.push({ imgUrl: res.url });
			this.dispatchBoardSave('has added an image');
		},
		closeModal() {
			this.editModal = '';
		}
	},
	async created() {
		this.cardId = this.$route.params.cardId;
		if (!this.cardId) this.$router.push('/404');
		this.boardToUpdate = JSON.parse(
			JSON.stringify(this.board));
		this.card = boardService.getCardById(this.boardToUpdate, this.cardId);
		if (!this.card) this.$router.push('/404');
	},
	components: {
		cardEditModal,
		cardLabelEdit,
		cardChecklistEdit,
		cardAttachments,
		cardChecklists,
		cardDueEdit,
		activities,
		cardMemberEdit,
		Avatar,
		cardBackgroundEdit
	}
};
</script>

<style lang="scss">
</style>