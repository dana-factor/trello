import httpService from './http.service';

export const boardService = {
	query,
	getById,
	remove,
	save,
	getStarterBoard,
	getCardById,
	getStarterCard,
	getStarterTopic,
	getStarterChecklist,
	getStarterChecklistTask,
	updateBoardLabel,
	getChecklistIdxById
};
function query(filterBy) {
	return httpService.get(`board`);
}
function getById(id) {
	return httpService.get(`board/${id}`).then((res) => res);
}

function remove(id) {
	return httpService.delete(`board/${id}`);
}

function save(board, activity) {
	return board._id ? _update(board, activity) : _add(board);
}
function updateBoardLabel(board, label) {
	const idx = board.labels.findIndex(
		(findLabel) => label.color === findLabel.color
	);
	board.labels.splice(idx, 1, label);
}
function getChecklistIdxById(checklists, id) {
	return checklists.findIndex((checklist) => id === checklist.id);
}
function getStarterBoard() {
	// var board = {};
	var user = JSON.parse(sessionStorage.getItem('user'));
	var guestId = _makeId();
	if (!user) user = { fullName: 'Guest', _id: guestId };
	return {
		// _id: _makeId(),
		name: 'New Board',
		members: [user],
		// green #519839
		// yellow #d9b51c
		// orange #ff9f1a
		// red #b04632
		// purple #c377e0
		// blue #0079bf
		labels: [
			{
				color: '#61bd4f',
				title: '',
			},
			{
				color: '#f2d600',
				title: '',
			},
			{
				color: '#ff9f1a',
				title: '',
			},
			{
				color: '#eb5a46',
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
			backgroundColor: '',
			imgUrl: 'http://res.cloudinary.com/ddh9unyrw/image/upload/v1595699314/xpxjihvdbqboowhzqwer.jpg',
		},
		creatorId: user._id,
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
						backgroundColor: 'white',
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
						backgroundColor: 'white',
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
						backgroundColor: 'white',
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
						backgroundColor: 'white',
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
						backgroundColor: 'white',
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
						backgroundColor: 'white',
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
						backgroundColor: 'white',
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
						backgroundColor: 'white',
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
						backgroundColor: 'white',
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
		backgroundColor: 'white',
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
function _update(board, activity) {
	return httpService
		.put(`board/${board._id}`, { board, activity })
		.then((res) => res);
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
