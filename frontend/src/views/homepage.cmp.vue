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
        <h2>Real-time Updating</h2>
        <p>You and your team can enjoy a live workspace that syncs in real-time and allows working simultaneously.</p>
      </div>
      <div class="blue-note note">
        <h2>Control your privacy</h2>
        <p>Set lists as private to make them invisible to others and keep track of personal tasks on your shared boards.</p>
      </div>
      <div class="green-note note">
        <h2>Instant Sharing</h2>
        <p>Quickly share tasks on Whatsapp, Facebook and Email with your team and even new members.</p>
      </div>
    </div>
    <app-footer />
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
		this.$store.dispatch({ type: 'loadBoards' })
			.then(() => {
				this.boards = this.$store.getters.boards
			})

	},
	mounted() { },
	watch: {},
	components: {
		boardList,
		appFooter
	}
};
</script>

<style>
</style>