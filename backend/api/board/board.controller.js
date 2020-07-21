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

async function updateBoard(req, res) {
	try {
		const board = req.body.board;
		let activity = req.body.activity;
		if (activity && !activity.text) activity.text = 'Unspecified Activity';
		let user = req.session.user;
		if (!user) user = { fullName: 'Guest' };
		else delete user.username;
		const addedBoard = await boardService.update(board, activity, user);
		res.send(addedBoard);
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
async function searchBoard(req, res) {
	try {
		const topics = await boardService.searchBoard(
			req.params.id,
			req.query.text
		);
		res.send(topics);
	} catch (err) {
		logger.error(err.message);
		res.status(404).end();
	}
}
module.exports = {
	getBoard,
	getBoards,
	deleteBoard,
	updateBoard,
	addBoard,
	searchBoard,
};
