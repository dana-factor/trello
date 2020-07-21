const bcrypt = require('bcrypt');
const userService = require('../user/user.service');
const logger = require('../../services/logger.service');

const saltRounds = 10;

async function login(username, password) {
	logger.debug(`auth.service - login with username: ${username} and password ${password}`);
	if (!username || !password)
		return Promise.reject('username and password are required!');

	const user = await userService.getByUsername(username);
	if (!user) return Promise.reject('Invalid username or password');
	const match = await bcrypt.compare(password, user.password);
	if (!match) return Promise.reject('Invalid username or password');

	delete user.password;

	return user;
}

async function signup({ password, username, fullName, imgUrl }) {
	logger.debug(`auth.service - signup with username: ${username}`);
	if (!password || !username || !fullName)
		return Promise.reject('Username, name and password are required!');
	if (await userService.getByUsername(username))
		return Promise.reject('Username already exists!');
	const hash = await bcrypt.hash(password, saltRounds);
	return userService.add({ password: hash, username, fullName, imgUrl });
}

module.exports = {
	signup,
	login,
};
