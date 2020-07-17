<template>
    <section class="board-details">
    <h1>board-details</h1>
    <h2>{{board.name}}</h2>
    <button @click="toggleEditMenu">...</button>
    <div v-if="editMenuOpen">
        <p>Change Name </p>
        <p>Change Background </p>
    </div>
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
            board: null,
            editMenuOpen: false,

        }
    },
    computed: {

    },
    methods: {
           toggleEditMenu(){
            this.editMenuOpen = !this.editMenuOpen
        },

    },
    created(){
         const boardId = this.$route.params.boardId;
         console.log(boardId)
         this.$store.dispatch({type: 'getCurrBoard', id: boardId})
            .then(board => {
                this.board = board
                console.log(board)
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