<template>
<div>
	<div class="board-list">
	<ul >
		<li
			v-for="board in boards"
			:key="board._id"
		>
            <router-link :to="'/board/'+board._id">
			<board-preview @updateBoard="updateBoard" :board="board" />
            </router-link>  
		</li>
		<li @click="toggleInput"><i class="el-icon-plus"></i></li>
	</ul>
	</div>
	<div :class="{hidden: isNameInputHidden}" class="add-name-modal">
		<button @click="toggleInput">X</button>
		<label>Name of your Board</label>
		<input type="text" autofocus @change="addBoard"/>
	</div>
</div>
</template>

<script>
import boardPreview from "./board-preview.cmp.vue";


export default {
	name: "board-list",
	props: ["boards"],
	data() {
		return {
			isNameInputHidden: true
		};
	},
	computed: {},
	methods: {
		toggleInput() {
			this.isNameInputHidden = !this.isNameInputHidden;
		},
		addBoard(ev) {
			const boardName = ev.target.value;
			this.$emit('addBoard', boardName);
			this.isNameInputHidden = true;
		},

       updateBoard(board) {
            this.$emit('updateBoard', board);
        },
	},
	created() {},
	mounted() {},
	watch: {},
	components: {
		boardPreview
	}
};
</script>

<style scoped>

.hidden {
	visibility: hidden;
}

</style>