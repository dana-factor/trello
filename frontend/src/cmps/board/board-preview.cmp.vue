<template>
    <section class="board-preview">
        <!-- contenteditable="true" @change="saveBoardName" -->
        <h4 > {{board.name}}</h4> 
        <img class="board-img" v-if="board.style.imgUrl" :src="board.style.imgUrl" />
        <div class="board-bgc" v-if="board.style.backgroundColor" :style="{backgroundColor: board.style.backgroundColor}"></div>
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



h4 {
    margin: 0;
}


</style>