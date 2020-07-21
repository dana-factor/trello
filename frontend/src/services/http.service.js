import router from '@/router';
// import store from '@/store'

const BASE_URL =
	process.env.NODE_ENV === 'production' ? '/api/' : '//localhost:3000/api/';

import Axios from 'axios';
var axios = Axios.create({
	withCredentials: true,
});
axios.interceptors.response.use(null, (error) => {
	let path = '/error';
	switch (error.response.status) {
		case 401:
			path = '/login';
			break;
		case 404:
			path = '/404';
			break;
	}
	router.push(path);
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
		if (err.response.status === 401) {
			router.push('/');
		}
	}
}
