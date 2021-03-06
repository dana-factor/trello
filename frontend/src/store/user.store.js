import Vue from 'vue';
import Vuex from 'vuex';
import { userService } from '../services/user.service.js';

var localLoggedinUser = null;
if (sessionStorage.user) localLoggedinUser = JSON.parse(sessionStorage.user);

Vue.use(Vuex);

export const userStore = {
	state: {
		loggedinUser: localLoggedinUser,
		users: [],
	},
	getters: {
		users(state) {
			return state.users;
		},
		loggedinUser(state) {
			return state.loggedinUser;
		},
		isAdmin(state) {
			return state.loggedinUser && state.loggedinUser.isAdmin;
		},
	},
	mutations: {
		setUser(state, { user }) {
			state.loggedinUser = user;
		},
		setUsers(state, { users }) {
			state.users = users;
		},
	},
	actions: {
		async login(context, { userCred }) {
			const user = await userService.login(userCred);
			context.commit({ type: 'setUser', user });
			return user;
		},
		async signup(context, { userCred }) {
			const user = await userService.signup(userCred);
			context.commit({ type: 'setUser', user });
			return user;
		},
		async logout(context) {
			await userService.logout();
			context.commit({ type: 'setUsers', users: [] });
			context.commit({ type: 'setUser', user: null });
		},
		async loadUsers(context) {
			const users = await userService.getUsers();
			context.commit({ type: 'setUsers', users });
		},
	},
};
