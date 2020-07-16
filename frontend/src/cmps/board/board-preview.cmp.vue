<template>
    <section class="board-preview">
        <img class="board-img" v-if="board.style.imgUrl" :src="board.style.imgUrl" />
        <div class="board-bgc" v-if="board.style.backgroundColor" :style="{backgroundColor: board.style.backgroundColor}"></div>
        <h4 @change="saveBoardName"> {{board.name}}</h4> 
    </section>
</template>

<script>
export default {
    props:['board'],
    data(){
        return{
            boardName: ''
        }
    },
    computed: {

    },
    methods: {
        saveBoardName(ev) {
            var boardClone = JSON.parse(JSON.stringify(this.board))
            boardClone.name = ev.target.innerText;
            this.$emit('updateBoard', boardClone);
        }

    },
    created(){
        this.boardName = this.board.name;
    },
    mounted(){

    },
    watch: {

    },
    components: {

    }

}
</script>

<style scoped> 

.board-img, .board-bgc {
    width: 300px;
    height: 200px;
}




</style>