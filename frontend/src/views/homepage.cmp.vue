<template>
	<section class="homepage">

		<div class="hero-container">
			<img src="../../src/assets/img/hero.png" />
			<router-link to="/board/5f1aefd0f30ae5001757bd46">
				<h1>try trellA now</h1>
			</router-link>
		</div>
		<div class="notes-container">
			<div class="yellow-note note">
				<h2>Drag n Drop</h2>
				<p>Try our Drag n Drop technology to easily move & update your tasks with your mouse or finger.</p>
			</div>
			<div class="blue-note note">
				<h2>Make it yours</h2>
				<p>Make it feel like home for you and your team. Customize the board's appearance to fit the team's flow.</p>
			</div>
			<div class="green-note note">
				<h2>Real-time Updating</h2>
				<p>Be always up-to-date. You and your team can enjoy a live workspace that shows you also the most recent changes.</p>
			</div>
		</div>
		<app-footer/>
	</section>
</template>

<script>
import boardList from "../cmps/board/board-list.cmp.vue";
import appFooter from "../cmps/app-footer.cmp.vue";
import { boardService } from '../services/board.service.js';

export default {
	props: [],
	data() {
		return {
			boards: []
		};
	},
	computed: {},
	methods: {
	},
	created() {
        this.$store.dispatch({type: 'loadBoards'})
        .then(() => {
             this.boards = this.$store.getters.boards
             })

    },
	mounted() {},
	watch: {},
	components: {
		boardList,
		appFooter
	}
};
</script>

<style>
</style>