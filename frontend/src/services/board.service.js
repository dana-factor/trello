import httpService from './http.service';
// axios.defaults.withCredentials = true

export const boardService = {
	query,
	getById,
	remove,
	save,
	getStarterBoard,
	getCardById,
	getStarterCard,
	addLabels,
	removeLabels,
	getStarterTopic,
	// saveCardToBoard,
	getStarterChecklist,
	getStarterChecklistTask,
	updateBoardLabel,
	removeChecklist,
	removeChecklistTask,
};

function query(filterBy) {
	return (
		httpService
			.get(`board`)
			// return axios.get(`${_getURL()}?name=${filterBy.searchStr}`)
			.then((res) => {
				// res.forEach((board) => _addLabels(board));
				return res;
			})
	);
}
function getById(id) {
	return httpService.get(`board/${id}`).then((res) => res);
}

function remove(id) {
	return httpService.delete(`board/${id}`);
}

function save(board) {
	return board._id ? _update(board) : _add(board);
}
function addLabels(board) {
	//Should be in server
	board = JSON.parse(JSON.stringify(board));
	board.topics.forEach((topic) => {
		topic.cards.forEach((card) => {
			let labels = board.labels;
			labels = labels.filter((label) => card.labels.includes(label.color));
			card.labels = labels;
		});
	});
	return board;
}
function removeLabels(board) {
	//Should be in server
	board = JSON.parse(JSON.stringify(board));
	board.topics.forEach((topic) => {
		topic.cards.forEach((card) => {
			let labels = [];
			card.labels.forEach((label) => labels.push(label.color));
			card.labels = labels;
		});
	});
	return board;
}
function updateBoardLabel(board, label) {
	const idx = board.labels.findIndex(
		(findLabel) => label.color === findLabel.color
	);
	board.labels.splice(idx, 1, label);
}
function removeChecklist(card, checklistId) {
	const idx = card.checklists.findIndex(
		(findChecklist) => checklistId === findChecklist.id
	);
	card.checklists.splice(idx, 1);
}
function removeChecklistTask(tasks, taskId) {
	const idx = tasks.findIndex((findTask) => taskId === findTask.id);
	tasks.splice(idx, 1);
}
// function saveCardToBoard(board, card) {
// 	board.topics.find((topic) => {
// 		const idx = topic.cards.indexOf(getCardById(board, card.id));
// 		topic.cards.splice(idx, 1, card);
// 		return idx !== -1;
// 	});
// }
function getStarterBoard() {
	return {
		// _id: _makeId(),
		name: 'starter board',
		members: [],
		// green #519839
		// yellow #d9b51c
		// orange #ff9f1a
		// red #b04632
		// purple #c377e0
		// blue #0079bf
		labels: [
			{
				color: '#519839',
				title: '',
			},
			{
				color: '#d9b51c',
				title: '',
			},
			{
				color: '#ff9f1a',
				title: '',
			},
			{
				color: '#b04632',
				title: '',
			},
			{
				color: '#c377e0',
				title: '',
			},
			{
				color: '#0079bf',
				title: '',
			},
		],
		activities: [],
		style: {
			backgroundColor: 'lightblue',
			imgUrl: '',
		},
		creatorId: '',
		description: '',
		topics: [
			{
				id: _makeId(),
				name: 'backlog',
				cards: [
					{
						id: _makeId(),
						name: 'start project',
						description: 'wow',
						createdAt: Date.now(), //will come from server in the near future!
						members: [],
						labels: [],
						backgroundColor: 'lightcoral',
						attachments: [],
						checklists: [],
					},
					{
						id: _makeId(),
						name: 'meet madonna',
						description: 'wow',
						createdAt: Date.now(), //will come from server in the near future!
						members: [],
						labels: [],
						backgroundColor: 'lightgrey',
						attachments: [],
						checklists: [],
					},
					{
						id: _makeId(),
						name: 'kiss gandi',
						description: 'wow',
						createdAt: Date.now(), //will come from server in the near future!
						members: [],
						labels: [],
						backgroundColor: 'lightgrey',
						attachments: [],
						checklists: [],
					},
				],
			},
			{
				id: _makeId(),
				name: 'in progress',
				cards: [
					{
						id: _makeId(),
						name: 'start project',
						description: 'wow',
						createdAt: Date.now(), //will come from server in the near future!
						members: [],
						labels: [],
						backgroundColor: 'lightcoral',
						attachments: [],
						checklists: [],
					},
					{
						id: _makeId(),
						name: 'meet madonna',
						description: 'wow',
						createdAt: Date.now(), //will come from server in the near future!
						members: [],
						labels: [],
						backgroundColor: 'lightgrey',
						attachments: [],
						checklists: [],
					},
					{
						id: _makeId(),
						name: 'kiss gandi',
						description: 'wow',
						createdAt: Date.now(), //will come from server in the near future!
						members: [],
						labels: [],
						backgroundColor: 'lightgrey',
						attachments: [],
						checklists: [],
					},
				],
			},
			{
				id: _makeId(),
				name: 'Done',
				cards: [
					{
						id: _makeId(),
						name: 'start project',
						description: 'wow',
						createdAt: Date.now(), //will come from server in the near future!
						members: [],
						labels: [],
						backgroundColor: 'lightcoral',
						attachments: [],
						checklists: [],
					},
					{
						id: _makeId(),
						name: 'meet madonna',
						description: 'wow',
						createdAt: Date.now(), //will come from server in the near future!
						members: [],
						labels: [],
						backgroundColor: 'lightgrey',
						attachments: [],
						checklists: [],
					},
					{
						id: _makeId(),
						name: 'kiss gandi',
						description: 'wow',
						createdAt: Date.now(), //will come from server in the near future!
						members: [],
						labels: [],
						backgroundColor: 'lightgrey',
						attachments: [],
						checklists: [],
					},
				],
			},
		],
	};
}
function getStarterCard(cardName) {
	return {
		id: _makeId(),
		name: cardName,
		description: '',
		createdAt: Date.now(), //will come from server in the near future!
		members: [],
		labels: [],
		backgroundColor: 'lightgrey',
		attachments: [],
		checklists: [],
	};
}
function getStarterChecklist() {
	return {
		id: _makeId(),
		name: 'yay2',
		tasks: [],
	};
}
function getStarterChecklistTask() {
	return {
		id: _makeId(),
		text: '',
		isDone: false,
	};
}
function getStarterTopic(topicName) {
	return {
		id: _makeId(),
		name: topicName,
		cards: [],
	};
}
function _update(board) {
	return httpService.put(`board/${board._id}`, board).then((res) => res);
}

function _add(board) {
	return httpService.post(`board/`, board).then((board) => board);
}
function getCardById(board, id) {
	for (const topic of board.topics) {
		const card = topic.cards.find((card) => {
			return card.id === id;
		});
		if (card) return card;
	}
}
function _makeId(length = 5) {
	var txt = '';
	var possible =
		'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	for (let i = 0; i < length; i++) {
		txt += possible.charAt(Math.floor(Math.random() * possible.length));
	}
	return txt;
}
