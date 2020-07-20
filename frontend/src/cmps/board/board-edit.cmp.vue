<template>
    <div class="board-edit"
			>
			<div class="board-menu-header">
				<h3>Menu</h3>
				<button class="close" @click="toggleBoardMenu"><i class="el-icon-close"></i></button>
			</div>
			<div class="board-menu-nav">
				<h5 @click="toggleColorPicker">Change Background</h5>
				<h5 @click="toggleDatePicker"> Change Due Date</h5>
				<h5 @click="toggleDeleteModal">Delete Board</h5>
			</div>
			<div>
                <board-edit-background />
                <color-picker v-if="colorPickerOpen" @changeBgc="changeBgc"/>
                <date-picker v-if="datePickerOpen"/>
			</div>
           
    </div>
</template>

<script>
import colorPicker from '../color-picker.cmp.vue';
import datePicker from '../date-picker.cmp.vue';
import boardEditBackground from '../board/board-edit-background.cmp.vue';

export default {
    props:['boardId'],
    data(){
        return{
            colorPickerOpen: false,
            datePickerOpen: false
        }
    },
    computed: {

    },
    methods: {
        toggleBoardMenu() {
            this.$emit('toggleBoardMenu');
        },
        toggleColorPicker() {
            this.colorPickerOpen = !this.colorPickerOpen;
        },
        toggleDatePicker() {
            this.datePickerOpen = !this.datePickerOpen;
        },
        toggleDeleteModal() {
           this.$emit('toggleDeleteModal');
        },
        changeBgc(color) {
            this.$emit('changeBgc', color);
        }

    },
    created(){

    },
    mounted(){

    },
    watch: {

    },
    components: {
        colorPicker,
        datePicker,
        boardEditBackground
    }

}
</script>

<style>

</style>