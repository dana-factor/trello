const express = require('express');
const boardController = require('./board.controller');
const router = express.Router();


var socket_io;
router.get('/', boardController.getBoards);
router.get('/:id', boardController.getBoard);
router.post('/', boardController.addBoard);
router.put('/:id', boardController.updateBoard, sendSocket);
router.delete('/:id', boardController.deleteBoard);

function sendSocket(req, res) {
	socket_io.to(res.board._id).emit('updateBoard', res.board);
}
function connectSockets(io) {
	socket_io = io;
	io.on('connection', (socket) => {
		socket.on('setBoardId', (newBoardId) => {
			if (socket.boardId) {
				socket.leave(socket.boardId);
			}
			socket.join(newBoardId);
			socket.boardId = newBoardId;
		});
	});
}
module.exports = { router, connectSockets };
