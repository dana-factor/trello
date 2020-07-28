import httpService from './http.service';

export const userService = {
	login,
	logout,
	signup,
	getUsers,
	getById,
};

function getById(userId) {
	return httpService.get(`user/${userId}`);
}

async function login(userCred) {
	const user = await httpService.post('auth/login', userCred);
	_handleLogin(user);
	return user;
}
async function signup(userCred) {
	const user = await httpService.post('auth/signup', userCred);
	_handleLogin(user);
	return user;
}
async function logout() {
	await httpService.post('auth/logout');
	sessionStorage.clear();
}
function getUsers() {
	return httpService.get('user');
}

function _handleLogin(user) {
	sessionStorage.setItem('user', JSON.stringify(user));
}
