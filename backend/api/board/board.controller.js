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
		await boardService.remove(req.params.id);
		res.end();
	} catch (err) {
		res.status(500).end();
	}
}

async function updateBoard(req, res, next) {
	try {
		const board = req.body.board;
		let activity = req.body.activity;
		let user = req.session.user;
		if (!user) user = { fullName: 'Guest' };
		else delete user.username;
		const addedBoard = await boardService.update(board, activity, user);
		// res.send(addedBoard);
		res.end();
		res.board = addedBoard;
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
	addBoard
};
