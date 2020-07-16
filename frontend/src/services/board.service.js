import axios from 'axios'
// axios.defaults.withCredentials = true

export const boardService = {
    query,
    getById,
    remove,
    save,
    getStarterBoard
}

const BASE_URL = ( process.env.NODE_ENV !== 'development') ? '/api/board' : '//localhost:3000/api/board' ;

function _getURL(id=''){
	return `${BASE_URL}/${id}`
}

function query(filterBy) {
    return axios.get(`${_getURL()}`)
    // return axios.get(`${_getURL()}?name=${filterBy.searchStr}`)
        .then(res => res.data)
}

function getById(id) {
    return axios.get(`${_getURL(id)}`)
        .then(res => res.data)    
}

function remove(id) {
    return axios.delete(`${_getURL(id)}`)
}

function save(board) {
    return (board._id) ? _update(board) : _add(board)
}

function getStarterBoard() {
    return {
        name: '',
        members: [],
        lables: [
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
                        lables: [],
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
                        lables: [],
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
                        lables: [],
                        backgroundColor: 'lightgrey',
                        attachments: [],
                        checklists: [],
                    },
                ]

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
                        lables: [],
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
                        lables: [],
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
                        lables: [],
                        backgroundColor: 'lightgrey',
                        attachments: [],
                        checklists: [],
                    },
                ]

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
                        lables: [],
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
                        lables: [],
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
                        lables: [],
                        backgroundColor: 'lightgrey',
                        attachments: [],
                        checklists: [],
                    },
                ]

            },

        ]
    }
}

function _update(board) {
    return axios.put(`${_getURL(board._id)}`, board)
                .then(res =>res.data)
}

function _add(board) {
    return axios.post(`${_getURL()}`, board)
        .then(res =>res.data)
}


function _makeId(length = 5) {
    var txt = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for(let i=0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return txt;
}