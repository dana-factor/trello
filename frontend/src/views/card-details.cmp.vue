<template>
	<section class="card-details-container" @click="$router.push('../')">
		<div class="card-details" v-if="card" @click.stop="closeModal">
			<div class="header">
				<p>Edit Card</p>
				<router-link to="../">X</router-link>
			</div>
			<div class="body">
				<div class="left-side">
					<div>
						<h1
							@keypress.enter.prevent="updateCardName"
							@blur="updateCardName"
							id="name"
							contenteditable
						>{{card.name}}</h1>
						<!-- <button @click="updateCardName">Save</button> -->
					</div>
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
					<card-attachments :attachments="card.attachments" />
					<div class="checklists" v-for="checklist in card.checklists" :key="checklist.id">
						{{'✅' + checklist.name}}
						<ul>
							<li v-for="task in checklist.tasks" :key="task.id">
								<input type="checkbox" v-model="task.isDone" @input="updateCard(card)" />
								{{task.text}}
							</li>
						</ul>
						<input
							@keypress.enter="addNewChecklistTask(checklist)"
							v-model="newTaskTexts[checklist.id]"
							placeholder="Enter new task..."
						/>
						<button @click="addNewChecklistTask(checklist)">Add</button>
					</div>
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
export default {
	data() {
		return {
			board: null,
			card: null,
			cardId: 0,
			newTaskTexts: {},
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
		addNewChecklistTask(checklist) {
			let task = boardService.getStarterChecklistTask();
			task.text = this.newTaskTexts[checklist.id];
			checklist.tasks.push(task);
			this.dispatchBoardSave();
		},
		dispatchBoardSave() {
			this.$store.dispatch({ type: 'saveBoard', board: boardService.removeLabels(this.board) })
				.then(savedBoard => this.setBoardAndCard(savedBoard))
		},
		// openModal(ev, cmpName) {
		// 	console.dir(ev.target)
		// 	this.modalLocation = { top: ev.target.offsetTop + 'px', left: ev.target.offsetLeft + ev.target.offsetWidth + 'px' }
		// 	this.editModal = cmpName;
		// },
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
		cardAttachments
	}
};
</script>

<style lang="scss">
.card-details-container {
	background-color: rgba(0, 0, 0, 0.61);
	width: 100vw;
	height: 100%;
	position: fixed;
	top: 0;
	left: 0;
	overflow-y: auto;
	padding: 61px 0;
	.card-details {
		min-height: 80vh;
		position: relative;
		z-index: 2;
		margin: 0 auto;
		padding: 5px 15px 20px;
		width: 85%;
		background-color: #f4f5f7;
		.body {
			display: flex;
			justify-content: space-around;
		}
		.header {
			display: flex;
			justify-content: space-between;
			padding: 0.5rem;
		}
		.edit-btns {
			display: flex;
			flex-direction: column;
			button {
				width: 100%;
				background-color: #eaecf0;
				padding: 8px 15px;
				border-radius: 5px;
				margin-bottom: 10px;
				font-size: 0.875rem;
				transition: 0.3s;
			}
		}
		.description {
			display: flex;
			flex-direction: column;
		}
	}
}
textarea {
	resize: none;
}
</style>