import Vue from 'vue';
import VueRouter from 'vue-router';
import homepage from '../views/homepage.cmp.vue';
import boardDetails from '../views/board-details.cmp.vue';
import cardDetails from '../views/card-details.cmp.vue';
import login from '../views/login.cmp.vue';
import boardListPage from '../views/board-list-page.cmp.vue';
import testPage from '../views/test-page.cmp.vue';

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
		component: login,
	}
];

const router = new VueRouter({
	routes,
});

export default router;
