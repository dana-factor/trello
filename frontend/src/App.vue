<template>
  <div
    id="app"
    :style="{backgroundColor: background.bgc, backgroundImage: `url('${background.imgUrl}')`}"
    @touchend="removeDndClasses"
  >
    <app-header :loggedInUser="loggedInUser" @logout="logout"></app-header>
    <router-view @setBgc="setBgc" @setBgImg="setBgImg" />
  </div>
</template>

<script>

import appHeader from '../src/cmps/app-header.cmp'
import { utilService } from './services/util.service.js';
export default {
	data() {
		return {
			background: {
				imgUrl: '',
				bgc: '#fceddd',
			}
		}
	},
	computed: {
		loggedInUser() {
			return this.$store.getters.loggedinUser;
		}
	},
	created() {
		if (!localStorage.getItem('id')) localStorage.setItem('id', utilService.makeId());
	},
	methods: {
		setBgc(color) {
			this.background.imgUrl = '';
			this.background.bgc = color;
		},
		setBgImg(imgUrl) {
			this.background.bgc = '#fceddd';
			this.background.imgUrl = imgUrl;
		},
		async logout() {
			const user = await this.$store.dispatch({ type: 'logout' })
		},
		removeDndClasses() {
			document.querySelector('body').classList.remove('smooth-dnd-no-user-select', 'smooth-dnd-disable-touch-action');
		}
	},
	components: {
		appHeader
	}
}
</script>

<style lang="scss">
</style>
