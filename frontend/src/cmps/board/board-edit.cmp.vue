<template>
    <div class="board-edit"
			>
			<div class="board-menu-header">
				<h3>Menu</h3>
				<button @click="toggleBoardMenu">X</button>
				<hr />
			</div>
			<div class="board-menu-nav">
				<h5>Change Background</h5>
				<h5>Change Due Date</h5>
				<h5 @click="removeBoard(boardId)">Delete Board</h5>
				<hr />
			</div>
			<div>
                <color-picker />
			</div>

    
    </div>
</template>

<script>
import colorPicker from '../color-picker.cmp.vue';

export default {
    props:['boardId'],
    data(){
        return{

        }
    },
    computed: {

    },
    methods: {
        toggleBoardMenu() {
            this.$emit('toggleBoardMenu');
        },
        		removeBoard(boardId) {
			this.$emit("removeBoard", boardId);
        },

    },
    created(){

    },
    mounted(){

    },
    watch: {

    },
    components: {
        colorPicker
    }

}
</script>

<style>

</style>