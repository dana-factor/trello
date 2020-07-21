import Vue from 'vue';
import VueRouter from 'vue-router';
import homepage from '../views/homepage.cmp.vue';
import boardDetails from '../views/board-details.cmp.vue';
import cardDetails from '../views/card-details.cmp.vue';
import userLogin from '../views/user-login.cmp.vue';
import userSignup from '../views/user-signup.cmp.vue';
import boardListPage from '../views/board-list-page.cmp.vue';
import notFound from '../views/not-found.cmp.vue'

Vue.use(VueRouter);

const routes = [
	{
		path: '/',
		name: 'Home',
		component: homepage,
	},
	{
		path:'/board',
		name: 'Board List',
		component: boardListPage
	},
	{
		path: '/board/:boardId',
		name: 'Board Details',
		component: boardDetails,
		children: [
			{
				path: 'card/:cardId',
				name: 'Card Details',
				component: cardDetails,
			},
		],
	},
	{
		path: '/login',
		name: 'Login',
		component: userLogin,
	},
	{
		path: '/signup',
		name: 'Signup',
		component: userSignup,
	},
	{
		path: '/404',
		name: '404',
		component: notFound,
	},
];

const router = new VueRouter({
	routes,
});

export default router;
