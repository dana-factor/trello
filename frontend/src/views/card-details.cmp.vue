<template>
	<section
		class="card-details-screen"
		@mousedown.self="$router.push('../')"
	>
		<div
			class="card-details"
			v-if="card"
			@mousedown="closeModal"
		>
			<div class="title header">
				<i class="el-icon-postcard"></i>
				<h1
					@keypress.enter.prevent="
						updateCardName;
						$event.target.blur();
					"
					@blur="updateCardName"
					contenteditable
				>
					{{ card.name }}
				</h1>
				<router-link to="../">
					<i class="el-icon-close"></i>
				</router-link>
			</div>
			<div class="body">
				<div class="left-side">
					<div class="members-labels-due">
						<div v-if="card.members.length">
							<h3>Members</h3>
							<ul>
								<li
									v-for="member in card.members"
									:key="member._id"
									:title="member.fullName"
									class="card-members"
								>
									<avatar
										:src="member.imgUrl"
										:username="member.fullName"
										:size="25"
										background-color="#dfe1e6"
										color="#172b4d"
									/>
								</li>
							</ul>
						</div>
						<h3 v-if="labels.length">Labels</h3>
						<ul>
							<li
								v-for="label in labels"
								:key="label.color"
								:style="{ backgroundColor: label.color }"
							>
								{{ label.title }}
							</li>
						</ul>
						<div
							v-if="card.dueDate"
							class="due-date-container"
						>
							<h3>Due Date</h3>
							<div class="due-date-info">
								<input
									type="checkbox"
									v-model="card.isCardDone"
									@change="
										dispatchBoardSave('marked as done')
									"
								/>
								<p>{{ dueDateToShow }}</p>
								<span
									class="card-status completed"
									v-if="card.isCardDone"
								>complete</span>
								<span
									class="card-status overdue"
									v-if="isOverdue"
								>overdue</span>
								<i
									class="el-icon-delete"
									@click="removeDueDate"
								></i>
							</div>
						</div>
					</div>
					<div class="description">
						<div class="title">
							<i class="el-icon-document"></i>
							<h2>Description</h2>
						</div>
						<textarea
							v-model="card.description"
							@input="isDescriptionSaveShown = true"
							placeholder="Add a description..."
						></textarea>
						<div v-if="isDescriptionSaveShown" class="description-controls">
							<button
								@mousedown="
									dispatchBoardSave(
										'updated the description to ' +
											card.description
									);
									isDescriptionSaveShown = false;
								"
								class="save"
							>
								Save
							</button>
							<button
								@mousedown="
									card.description = '';
									isDescriptionSaveShown = false;
								"
							>
								<i class="el-icon-close"></i>
							</button>
						</div>
					</div>
					<card-attachments
						:attachments="card.attachments"
						@attachmentRemoved="removeAttachment"
					/>
					<h2 v-if="isAddingImage">Uploading image...</h2>
					<div
						class="checklists"
						v-for="checklist in card.checklists"
						:key="checklist.id"
					>
						<card-checklist
							:checklist="checklist"
							@newChecklistTaskAdded="addNewChecklistTask"
							@checklistRemoved="removeChecklist"
							@checklistTaskRemoved="removeChecklistTask"
							@checklistTitleUpdated="updateChecklistTitle"
							@checklistTaskTextUpdated="updateChecklistTaskText"
							@taskToggled="saveToggledTask"
						/>
					</div>
					<div class="title"><i class="el-icon-notebook-1"></i><h2>Activity</h2></div>
					<div class="comment">
						<avatar
							class="avatar-comment"
							:src="loggedinUser.imgUrl"
							:username="loggedinUser.fullName"
							:lighten="100"
							:size="28"
							background-color="#dfe1e6"
							color="#172b4d"
						/>
						<input
							v-model="comment"
							@keypress.enter="addComment"
							placeholder="Write a comment..."
						/>
					</div>
					<activities
						:activities="activities"
						isShowInCard="false"
					/>
				</div>
				<div class="right-side" @mousedown.stop>
					<h2>
						Add
						<span>To Card</span>
					</h2>
					<button @click="toggleModal('card-label-edit')">
						<i class="el-icon-collection-tag"></i>
						<span>Labels</span>
					</button>
					<button @click="toggleModal('card-checklist-edit')">
						<i class="el-icon-document-checked"></i>
						<span>Checklists</span>
					</button>
					<button @click="toggleModal('card-due-edit')">
						<i class="el-icon-time"></i>
						<span>Due Date</span>
					</button>
					<button @click="toggleModal('card-member-edit')">
						<i class="el-icon-user"></i>
						<span>Members</span>
					</button>
					<button>
						<input
							type="file"
							@change="onUploadImg"
							accept="image/*"
						/>
						<i class="el-icon-picture-outline"></i>
						<span>Add Image</span>
					</button>
					<button @click="toggleModal('card-background-edit')">
						<i class="el-icon-brush"></i>
						<span>Background Color</span>
					</button>
					<button @click="toggleModal('card-share-edit')">
						<i class="el-icon-share"></i>
						<span>Share</span>
					</button>

					<!-- <button @click="toggleModal('card-share-edit')">
            <i class="el-icon-share"></i>
            <span>Delete</span>
          </button> -->
				</div>
			</div>
			<card-edit-modal
				v-if="editModal"
				@modalClose="closeModal"
			>
				<template v-slot:header>{{ modalTitle }}</template>
				<component
					:is="editModal"
					:boardLabels="board.labels"
					:labels="labels"
					:members="board.members"
					:card="card"
					:cardUrl="cardUrl"
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
import cardDueEdit from '../cmps/card/card-due-edit.cmp';
import cardMemberEdit from '../cmps/card/card-member-edit.cmp';
import cardBackgroundEdit from '../cmps/card/card-background-edit.cmp';
import cardShareEdit from '../cmps/card/card-share-edit.cmp';
import activities from '../cmps/activities.cmp';
import Avatar from 'vue-avatar';
import moment from 'moment';
import cardChecklist from '../cmps/card/card-checklist.cmp';
export default {
	props: ['board'],
	data() {
		return {
			boardToUpdate: null,
			card: null,
			cardId: 0,
			editModal: '',
			isDescriptionSaveShown: false,
			comment: '',
			isAddingImage: false
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
				if (this.card.labels.includes(label.color))
					labelsToShow.push(label);
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
		activities() {
			return this.board.activities.filter(
				activity => activity.cardId === this.card.id
			);
		},
		loggedinUser() {
			if (!this.$store.getters.loggedinUser) return { fullName: 'Guest' };
			else return this.$store.getters.loggedinUser;
		},
		cardUrl() {
			return location.href;
		}
	},
	methods: {
		updateCardName(ev) {
			if (this.card.name === ev.target.innerText) return;
			if (!ev.target.innerText) {
				ev.target.innerText = this.card.name;
				return;
			}
			this.card.name = ev.target.innerText;
			ev.target.blur();
			this.dispatchBoardSave('updated the card name to ' + this.card.name);
		},
		updateBoardLabels(labelToUpdate) {
			boardService.updateBoardLabel(this.boardToUpdate, labelToUpdate);
			this.dispatchBoardSave(
				"updated a label's title to " + labelToUpdate.title
			);
		},
		addNewChecklist(name) {
			let checklist = boardService.getStarterChecklist();
			checklist.name = name;
			this.card.checklists.push(checklist);
			this.dispatchBoardSave('added a new checklist');
		},
		addNewChecklistTask(checklist, text) {
			let task = boardService.getStarterChecklistTask();
			task.text = text;
			checklist.tasks.push(task);
			this.dispatchBoardSave(
				'added a new checklist task ' + text + ' to ' + checklist.name
			);
		},
		removeChecklist(checklistId) {
			const idx = boardService.getChecklistIdxById(
				this.card.checklists,
				checklistId
			);
			this.card.checklists.splice(idx, 1);
			this.dispatchBoardSave('removed a checklist');
		},
		removeChecklistTask(checklist, taskId) {
			const idx = checklist.tasks.findIndex(
				findTask => taskId === findTask.id
			);
			checklist.tasks.splice(idx, 1);
			this.dispatchBoardSave('removed a checklist task');
		},
		updateChecklistTitle(checklist) {
			const idx = boardService.getChecklistIdxById(
				this.card.checklists,
				checklist.id
			);
			this.card.checklists.splice(idx, 1, checklist);
			this.dispatchBoardSave(
				'changed a checklist title to ' + checklist.name
			);
		},
		updateChecklistTaskText(checklist, task) {
			const checklistIdx = boardService.getChecklistIdxById(
				this.card.checklists,
				checklist.id
			);
			const taskIdx = checklist.tasks.findIndex(
				taskToFind => taskToFind.id === task.id
			);
			checklist.tasks.splice(taskIdx, 1, task);
			this.dispatchBoardSave('changed a task to ' + task.text);
		},
		saveToggledTask(checklist, task) {
			const taskIdx = checklist.tasks.findIndex(
				taskToFind => taskToFind.id === task.id
			);
			checklist.tasks.splice(taskIdx, 1, task);
			if (task.isDone)
				this.dispatchBoardSave(
					'marked the task ' + task.text + ' as done'
				);
			else
				this.dispatchBoardSave(
					'marked the task ' + task.text + ' as undone'
				);
		},
		toggleLabel(label) {
			let currLabels = this.card.labels;
			if (currLabels.includes(label)) {
				this.dispatchBoardSave('removed a label');
				currLabels.splice(currLabels.indexOf(label), 1);
			} else {
				this.dispatchBoardSave('added a label');
				currLabels.push(label);
			}
		},
		removeAttachment(attachment) {
			this.card.attachments.splice(
				this.card.attachments.indexOf(attachment),
				1
			);
			this.dispatchBoardSave('removed an attachment');
		},
		saveDueDate(date) {
			this.card.dueDate = date;
			this.card.isCardDone = false;
			this.closeModal();
			this.dispatchBoardSave(
				'updated the due date to ' +
				moment(date).format('DD/MM/YY HH:mm')
			);
		},
		removeDueDate() {
			this.card.dueDate = null;
			this.card.isCardDone = false;
			this.dispatchBoardSave('deleted the due date');
		},
		setBgc(color) {
			this.card.backgroundColor = color;
			this.dispatchBoardSave('changed the background color');
		},
		async toggleMember(userId) {
			// remove member
			if (this.card.members.find(member => member._id === userId)) {
				const idx = this.card.members.findIndex(
					member => member._id === userId
				);
				const name = this.card.members[idx].fullName; // keep the name for the action-txt before the splice
				this.card.members.splice(idx, 1);
				this.dispatchBoardSave('removed ' + name + ' as a member');
			} else {
				// add member
				const user = await userService.getById(userId);
				this.card.members.push(user);
				this.dispatchBoardSave(
					'added ' + user.fullName + ' as a member'
				);
			}
		},
		dispatchBoardSave(action, isComment = false) {
			this.$store.dispatch({
				type: 'saveBoard',
				board: this.boardToUpdate,
				activity: {
					text: action + ' in card ' + this.card.name,
					cardId: this.card.id,
					isComment: !!isComment
				}
			});
		},
		toggleModal(cmpName) {
			if (this.editModal === cmpName) this.closeModal();
			else this.editModal = cmpName;
		},
		async onUploadImg(ev) {
			this.isAddingImage = true;
			const res = await uploadImg(ev);
			this.card.attachments.push({ imgUrl: res.secure_url });
			ev.target.value = '';
			this.isAddingImage = false;
			this.dispatchBoardSave('added an image');
		},
		closeModal() {
			this.editModal = '';
		},
		addComment() {
			if (!this.comment) return;
			this.dispatchBoardSave(`${this.comment}`, true);
			this.comment = '';
		}
	},
	async created() {
		this.cardId = this.$route.params.cardId;
		if (!this.cardId) this.$router.push('/404');
		this.boardToUpdate = JSON.parse(JSON.stringify(this.board));
		this.card = boardService.getCardById(this.boardToUpdate, this.cardId);
		if (!this.card) this.$router.push('/404');
	},
	watch: {
		board(value) {
			this.boardToUpdate = JSON.parse(JSON.stringify(value));
			this.card = boardService.getCardById(
				this.boardToUpdate,
				this.cardId
			);
		}
	},
	components: {
		cardEditModal,
		cardLabelEdit,
		cardChecklistEdit,
		cardAttachments,
		cardDueEdit,
		activities,
		cardMemberEdit,
		Avatar,
		cardBackgroundEdit,
		cardChecklist,
		cardShareEdit
	}
};
</script>

<style lang="scss">
</style>