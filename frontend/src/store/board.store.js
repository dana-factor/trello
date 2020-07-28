import Vue from 'vue';
import Vuex from 'vuex';
import { boardService } from '../services/board.service.js';

Vue.use(Vuex);

export const boardStore = {
  strict: true,
  state: {
    boards: [],
    currBoard: {},
    isConnected: false
  },
  getters: {
    boards(state) {
      return state.boards;
    },
    board(state) {
      return state.currBoard;
    }
  },
  mutations: {
    setBoards(state, { boards }) {
      state.boards = boards;
    },
    setCurrBoard(state, { board }) {
      state.currBoard = board;
    },
    removeBoard(state, { id }) {
      const idx = state.boards.findIndex(board => board._id === id);
      state.boards.splice(idx, 1);
    },
    addBoard(state, { board }) {
      state.boards.push(board);
      state.currBoard = board;
    },
    updateBoard(state, { board }) {
      const idx = state.boards.findIndex(t => t._id === board._id);
      state.boards.splice(idx, 1, board);
      state.currBoard = board;
    }
  },
  actions: {
    async loadBoards({ commit, state }) {
      try {
        const boards = await boardService.query(state.filterBy);
        commit({ type: 'setBoards', boards });
        return boards;
      } catch (err) {
        console.log('ERROR: cannot find boards');
        throw err;
      }
    },
    async saveBoard({ commit }, { board, activity }) {
      try {
        const isNewBoard = !board._id;
        const addedBoard = await boardService.save(board, activity);
        if (isNewBoard) {
          commit({ type: 'addBoard', board: addedBoard });
          return addedBoard;
        }
      } catch (err) {
        console.log(`ERROR: cannot save board`);
        throw err;
      }
    },
    async removeBoard({ commit }, { id }) {
      try {
        await boardService.remove(id);
        commit({ type: 'removeBoard', id });
      } catch (err) {
        console.log(`ERROR: cannot remove board`);
        throw err;
      }
    },
    async loadCurrBoard({ commit }, { id }) {
      try {
        const board = await boardService.getById(id);
        this._vm.$socket.client.emit('subscribeToBoard', board._id);
        commit({ type: 'setCurrBoard', board });
        return board;
      } catch (err) {
        console.log(`ERROR: cannot load board`);
        throw err;
      }
    },
    socket_updateBoard({ commit }, board) {
      commit({ type: 'setCurrBoard', board });
    }
  }
};
