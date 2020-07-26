<template>
	<section class="homepage">
		<!-- <h1>homepage</h1> -->
		<div class="hero-container">
			<!-- <img src="../../public/img/5545.jpg" /> -->
			<img src="../../src/assets/img/hero.png" />
			<h1>try trellA now</h1>
		</div>
		<!-- <board-list
			:boards="boards"
		/>  -->
		<div class="notes-container">
			<div class="blue-note note">
				<h2>Make it yours</h2>
				<p>Make it feel like home for you and your team. Customize the board's appearance to fit the team's flow.</p>
			</div>
			<div class="yellow-note note">
				<h2>Drag n Drop</h2>
				<p>Try our Drag n Drop technology to easily move & update your tasks with your mouse or finger.</p>
			</div>
			<div class="green-note note">
				<h2>Web Sockets</h2>
				<p>With the power of web sockets, you and your team can enjoy a workspace that updates in real-time.</p>
			</div>
		</div>
	</section>
</template>

<script>
import boardList from "../cmps/board/board-list.cmp.vue";
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
		boardList
	}
};
</script>

<style>
</style>