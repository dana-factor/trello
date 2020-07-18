<template>
	<section class="card-details-container">
		<div class="card-details" v-if="card">
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
				<h2>Description</h2>
				<textarea v-model="card.Description" placeholder="Add a description..."></textarea>
				<button @click="updateCard(card)">Save</button>
			</div>
			<card-attachments :attachments="card.attachments"/>
			<div class="checklists" v-for="checklist in card.checklists" :key="checklist.id">
				{{checklist.name}}
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
			<div class="edit-btns">
				<button @click="editModal='card-label-edit'">Labels</button>
				<button @click="editModal='card-checklist-edit'">Checklists</button>
				<input type="file" @change="onUploadImg" />
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
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	width: 80%;
	max-width: 800px;
	height: auto;
	min-height: 600px;
	z-index: 2;
	background-color: lightblue;
	display: flex;
	.card-details {
		flex-grow: 1;
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