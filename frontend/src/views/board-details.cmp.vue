<template>
    <section class="board-details">
    <h1>board-details</h1>
    <ul v-if="board">
        <li v-for="topic in board.topics" :key="topic.id">
            <board-topic :topic="topic" />
        </li>
    </ul>
    </section>
</template>

<script>

import { boardService } from '../services/board.service.js'
import boardTopic from '../cmps/board/board-topic.cmp.vue';

export default {
    props:[],
    data(){
        return{
            board: null

        }
    },
    computed: {

    },
    methods: {

    },
    created(){
         const boardId = this.$route.params.boardId;
        //  this.$store.setCurrBoard(boardId);
         boardService.getById(boardId)
            .then(board => {
                this.board = board
            })


    },
    mounted(){

    },
    watch: {

    },
    components: {
        boardTopic

    }

}
</script>

<style>

</style>