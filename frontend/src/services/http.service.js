import router from '@/router';

const BASE_URL =
	process.env.NODE_ENV === 'production' ? '/api/' : '//localhost:3000/api/';

import Axios from 'axios';
var axios = Axios.create({
	withCredentials: true,
});
axios.interceptors.response.use(null, (error) => {
	let path = '';
	switch (error.response.status) {
		// case 401:
		// 	path = '/login';
		// 	break;
		case 404:
			path = '/404';
			break;
	}
	if (path) router.push(path);
	return Promise.reject(error);
});

export default {
	get(endpoint, data) {
		return ajax(endpoint, 'GET', data);
	},
	post(endpoint, data) {
		return ajax(endpoint, 'POST', data);
	},
	put(endpoint, data) {
		return ajax(endpoint, 'PUT', data);
	},
	delete(endpoint, data) {
		return ajax(endpoint, 'DELETE', data);
	},
};

async function ajax(endpoint, method = 'get', data = null) {
	try {
		const res = await axios({
			url: `${BASE_URL}${endpoint}`,
			method,
			data,
		});
		return res.data;
	} catch (err) {
		throw err.response.data.error;
	}
}
