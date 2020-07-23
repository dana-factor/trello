import Vue from 'vue';
import Vuex from 'vuex';
import { boardService } from '../services/board.service.js';

Vue.use(Vuex);

export const boardStore = {
	strict: true,
	state: {
		boards: [],
		currBoard: {},
		isConnected: false,
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
		setCurrBoard(state, { board }) {
			state.currBoard = board;
		},
		// updateFilterBy(state, {filter}) {
		//     state.filterBy = filter;
		// },
		removeBoard(state, { id }) {
			const idx = state.boards.findIndex((board) => board._id === id);
			state.boards.splice(idx, 1);
		},
		addBoard(state, { board }) {
			state.boards.push(board);
			state.currBoard = board;
		},
		updateBoard(state, { board }) {
			// console.log('update board store', board)
			const idx = state.boards.findIndex((t) => t._id === board._id);
			state.boards.splice(idx, 1, board);
			state.currBoard = board;
		},
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
		// loadBoards({ commit, state }) {
		//     return boardService.query(state.filterBy)
		//         .then(boards => {
		//             commit({ type: 'setBoards', boards })
		//             return boards
		//         })
		// },
		async saveBoard({ commit }, { board, activity }) {
			try {
				const type = board._id ? 'updateBoard' : 'addBoard';
				const savedBoard = await boardService.save(board, activity);
				// this._vm.$socket.client.emit('boardChanged', board);
				commit({ type, board: savedBoard });
				return savedBoard;
			} catch (err) {
				console.log(`ERROR: cannot save board`);
				throw err;
			}
		},
		// saveBoard({ commit }, { board }) {
		//     const type = (board._id) ? 'updateBoard' : 'addBoard'
		//     return boardService.save(board)
		//         .then((savedBoard) => {
		//             // console.log('savedBoard, store', savedBoard)
		//             commit({ type, board: savedBoard })
		//             return savedBoard
		//         })
		// },
		async removeBoard({ commit }, { id }) {
			try {
				await boardService.remove(id);
				commit({ type: 'removeBoard', id });
			} catch (err) {
				console.log(`ERROR: cannot remove board`);
				throw err;
			}
		},
		// removeBoard({ commit }, { id }) {
		//     console.log('id:',id);

		//     return boardService.remove(id)
		//         .then(() => {
		//             commit({ type: 'removeBoard', id })
		//         })
		// },
		async loadCurrBoard({ commit }, { id }) {
			try {
				const board = await boardService.getById(id);
				this._vm.$socket.client.emit('setBoardId', board._id);
				commit({ type: 'setCurrBoard', board });
				return board;
			} catch (err) {
				console.log(`ERROR: cannot load board`);
				throw err;
			}
		},
		socket_updateBoard({ commit }, board) {
			// commit({ type: 'setCurrBoard' , board});
		},

		// loadCurrBoard({commit}, { id }) {
		//     // console.log(id)
		//     return boardService.getById(id)
		//         .then(board => {
		//             commit({type: 'setCurrBoard', board})
		//             return board
		//         })
		// },
	},
};
