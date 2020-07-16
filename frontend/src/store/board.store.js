import Vue from 'vue';
import Vuex from 'vuex';
import { boardService } from '../services/board.service.js';

Vue.use(Vuex);

export const boardStore = {
    strict: true,
    state: {
        boards: [],
        currBoard: {},
        // filterBy: {
        //     searchStr: '',
        // },
    },
    getters: {
        boards(state) {
            return state.boards;
        },
        board(state) {
            return state.currBoard;
        },
        // boardMembers(state) {
        //     return state.currBoard.members;
        // },
        // labels(state) {
        //     return state.currBoard.labels;
        // },
        // activities(state) {
        //     return state.currBoard.activities;
        // },
        // topics(state) {
        //     return state.currBoard.topics;
        // },
        // card(state) {
        //     return state.currCard;
        // },
    },
    mutations: {
        setBoards(state, { boards }) {
            state.boards = boards;
        },
        // updateFilterBy(state, {filter}) {
        //     state.filterBy = filter;
        // },
        removeBoard(state, { id }) {
            const idx = state.boards.findIndex(board => board._id === id)
            state.boards.splice(idx, 1)
        },
        addBoard(state, { board }) {
            state.boards.push(board)
            // this.$router.push('/board/:board._id')
        },
        updateBoard(state, { board }) {
            const idx = state.boards.findIndex(t => t._id === board._id)
            state.boards.splice(idx, 1, board)
        },
        removeTopic(state, {id}){
            const idx = state.currBoard.topics.findIndex(topic => topic.id === id)
            state.boards.splice(idx, 1)
        },
        addTopic(state, {topic}) {
            state.currBoard.topics.push(topic)
        },
        updateTopic(state, {topic}) {
            const idx = state.currBoard.topics.findIndex(t => t.id === topic.id)
            state.currBoard.topics.splice(idx, 1, topic)
        },
        updateTopicName(state, {topicName, topicId}) {
            let currTopic = state.currBoard.topics.find(topic => topic.id === topicId)
            currTopic.name = topicName
        },
        addCard(state, {topicId}){
            const starterCard = boardService.getStarterCard()
            let currTopic = state.currBoard.topics.find(topic => topic.id = topicId)
            currTopic.push(starterCard)
        }
    },
    actions: {
        loadBoards({ commit, state }) {
            return boardService.query(state.filterBy)
                .then(boards => {
                    commit({ type: 'setBoards', boards })
                    return boards
                })
        },
        saveBoard({ commit }, { board }) {
            console.log(board)
            const type = (board._id) ? 'updateBoard' : 'addBoard'
            // console.log(type)
            return boardService.save(board)
                .then((savedBoard) => {
                    console.log('savedBoard, store', savedBoard)
                    commit({ type, board: savedBoard })
                })
        },
        removeBoard({ commit }, { id }) {
            return boardService.remove(id)
                .then(() => {
                    commit({ type: 'removeBoard', id })
                })
        },
    },

}