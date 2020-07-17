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
function getStarterBoard() {
	return {
		// _id: _makeId(),
		name: 'starter board',
		members: [],
		labels: [
			{
				color: 'green',
				title: '',
			},
			{
				color: 'yellow',
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
function getStarterCard() {
	return {
		id: _makeId(),
		name: 'new card',
		description: '',
		createdAt: Date.now(), //will come from server in the near future!
		members: [],
		labels: [],
		backgroundColor: 'lightgrey',
		attachments: [],
		checklists: [],
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
