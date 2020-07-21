import httpService from './http.service';

export const userService = {
	login,
	logout,
	signup,
	getUsers,
	// getById,
	// remove,
	// update,
};

// function getById(userId) {
// 	return httpService.get(`user/${userId}`);
// }
// function remove(userId) {
// 	return httpService.delete(`user/${userId}`);
// }

// function update(user) {
// 	return httpService.put(`user/${user._id}`, user);
// }

async function login(userCred) {
	const user = await httpService.post('auth/login', userCred);
	return _handleLogin(user);
}
async function signup(userCred) {
	const user = await httpService.post('auth/signup', userCred);
	return _handleLogin(user);
}
async function logout() {
	await httpService.post('auth/logout');
	sessionStorage.clear();
}
function getUsers() {
	return httpService.get('user');
}

function _handleLogin(user) {
	if (!user) return;
	sessionStorage.setItem('user', JSON.stringify(user));
	return user;
}
