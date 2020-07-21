const dbService = require('../../services/db.service');
// const reviewService = require('../review/review.service')
const ObjectId = require('mongodb').ObjectId;

module.exports = {
	query,
	getById,
	remove,
	update,
	add,
	searchBoard,
};

async function query(text = '') {
	const collection = await dbService.getCollection('board');
	try {
		const exp = new RegExp(`.*${text}.*`, 'i');
		return await collection.find({ name: exp }).toArray();
	} catch (err) {
		console.log('ERROR: cannot find boards');
		throw err;
	}
}

async function getById(boardId) {
	const collection = await dbService.getCollection('board');
	try {
		return await collection.findOne({ _id: ObjectId(boardId) });
	} catch (err) {
		console.log(`ERROR: while finding board ${boardId}`);
		throw err;
	}
}

async function remove(boardId) {
	const collection = await dbService.getCollection('board');
	try {
		await collection.deleteOne({ _id: ObjectId(boardId) });
	} catch (err) {
		console.log(`ERROR: cannot remove board: ${boardId}`);
		throw err;
	}
}

async function update(
	board,
	activity = { text: 'Unspecified Activity', cardId: null },
	user
) {
	const collection = await dbService.getCollection('board');
	board._id = ObjectId(board._id);
	// console.log('activity', activity);
	// console.log('user', user);
	const activityToAdd = {
		text: activity.text,
		cardId: activity.cardId,
		user,
		createdAt: Date.now(),
	};
	board.activities.unshift(activityToAdd);
	try {
		await collection.replaceOne({ _id: board._id }, { $set: board });
		return board;
	} catch (err) {
		console.log(`ERROR: cannot update board ${board._id}`);
		throw err;
	}
}

async function add(board) {
	const collection = await dbService.getCollection('board');
	try {
		await collection.insertOne(board);
		return board;
	} catch (err) {
		console.log(`ERROR: cannot insert board`);
		throw err;
	}
}
async function searchBoard(boardId, text = '') {
	const collection = await dbService.getCollection('board');
	try {
		let board = await collection.findOne({ _id: ObjectId(boardId) });
		const exp = new RegExp(`.*${text}.*`, 'i');
		board.topics = board.topics.filter((topic) => {
			topic.cards = topic.cards.filter(
				(card) => card.name.match(exp) || card.description.match(exp)
			);
			return topic.cards.length;
		});
		return board.topics;
	} catch (err) {
		console.log(`ERROR: while finding board ${boardId}`);
		throw err;
	}
}
