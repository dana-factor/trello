const boardService = require('./board.service');
const logger = require('../../services/logger.service');

async function getBoard(req, res) {
	try {
		const board = await boardService.getById(req.params.id);
		res.send(board);
	} catch (err) {
		logger.error(err.message);
		res.status(404).end();
	}
}

async function getBoards(req, res) {
	try {
		const boards = await boardService.query();
		logger.debug(boards);
		res.send(boards);
	} catch (err) {
		logger.error(err.message);
		res.status(500).end();
	}
}

async function deleteBoard(req, res) {
	try {
		const boardId = req.params.id;
		if (boardId === '5f1aefd0f30ae5001757bd46') {
			throw "Why are you trying to remove our public board? That's not nice :(";
		}
		await boardService.remove(boardId);
		res.end();
	} catch (err) {
		res.status(500).send({ error: err });
	}
}

async function updateBoard(req, res, next) {
	try {
		const board = req.body.board;
		let activity = req.body.activity;
		let user = req.session.user;
		if (!user) user = { fullName: 'Guest' };
		else delete user.username;
		const updatedBoard = await boardService.update(board, activity, user);
		res.end();
		res.updatedBoard = updatedBoard;
		next();
	} catch (err) {
		res.status(500).end();
	}
}

async function addBoard(req, res) {
	try {
		const board = req.body;
		await boardService.add(board);
		res.send(board);
	} catch (err) {
		res.status(500).end();
	}
}
module.exports = {
	getBoard,
	getBoards,
	deleteBoard,
	updateBoard,
	addBoard,
};
